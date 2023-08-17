//로딩중;
$(function () {
	const $loading = $('.loading');
	$loading.children('p').fadeOut();
	$loading.delay(250).fadeOut(800);
});

//
$(function () {
	const $h1 = $('h1');
	const $home = $('#home');
	const $header = $home.nextAll('header');
	const $intro = $home.children('.intro');
	const $nav = $header.find('nav'); //직계자손선택 find()-확실할때만 쓰기
	const $mnus = $nav.find('a');
	const $btnGnb = $header.find('.btn-gnb');
	const $aside = $('aside');

	const headerH = $header.height();
	const arrTopVal = []; //header이후에 존재하는 section의 top값
	// let nowIdx = 0;

	$(window).on('load resize', function () {
		/*
    브라우저 화면의 크기
    1.스크롤바와 쿨바를 포함하지 않은 브라우저의 화면의 크기
      window.innerWidth
      window.innerHeight
    2.스크롤바와 툴바를 포함한 브라우저 화면의 크기
      window.outerWidth
      window.outerHeight

    */
		$home.height(window.innerHeight); //브라우저에서 스크롤바와 툴바 미포함

		if (window.innerWidth > 640) {
			//pc버전
			$h1.css({
				//선택된 요소가 body로 부터 이르는 거리(left, top)
				top: $intro.offset().top - 72,
			});
			$nav.show();
		} else {
			//mobile 버전
			$h1.css({
				//선택된 요소가 body로 부터 이르는 거리(left, top)
				top: $intro.offset().top - 100,
			});
			$btnGnb.removeClass('clse');
			$nav.hide();

			$home.css({ tranceform: 'scale(1)' });
		}

		//각section의 top값을 배열에 저장
		$('header~section').each(function (idx) {
			arrTopVal[idx] = $(this).offset().top;
		});
	}); //load resize

	$(window).on('scroll', function () {
		let scrollTop = $(this).scrollTop();
		const $aboutme = $home.nextAll('#aboutme');

		//비주얼에 재미있는 효과
		if (window.innerWidth > 640) {
			if (scrollTop > $(this).height() - 400) {
				$home.css({ tranceform: 'scale(0.9)' });
			} else {
				$home.css({ tranceform: 'scale(1)' });
			}
		}

		//header고정
		if (scrollTop > $(this).height()) {
			$header.addClass('fixed');
			$aboutme.css({ marginTop: headerH });
		} else {
			$header.removeClass('fixed');
			$aboutme.css({ marginTop: 0 });
		}

		//메뉴 활성화 표시
		for (let i = 0; i < $mnus.length; i++) {
			if (scrollYop >= arrTopVal[i] - headerH - 150) {
				$mnus.eq(i).perent().addClass('on').siblings().removeClass('on');
			} else if (scrollTop < arrTopVal[0] - headerH - 150) {
				$mnus.parent().removeClass('on');
			}
		}
		//top버튼 노출처리
		if (scroll > 120) {
			$aside.fadeIn();
		} else {
			$aside.fadeOut();
		}
	}); //scroll
	$mnus.on('click', function (evt) {
		evt.preventDefault();

		//nowIdx
		nowIdx = $mnus.index(this);

		//animate
		$('html, body')
			.stop()
			.animate({ scrollTop: arrTopVal[nowIdx] - headerH });

		if (!(window.innerWidth > 640)) {
			$btnGnb.trigger('click');
		} //클릭이벤트 강제 발생
	});

	//반응형 햄버거 버튼
	$btnGnb.on('click', function () {
		//$(this)이번에 이벤트가 일어날 대상
		$(this).toggleClass('clse');
		$nav.toggle(); //있으면 없애고 없으면 있게 만듬
	});

	$('.logo')
		.add($aside) //$aside 추가
		.on('click', function (evt) {
			evt.preventDefault();
			$('html,body').stop().animate({ scrollTop: 0 });
		});
});

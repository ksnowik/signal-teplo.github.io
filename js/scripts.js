// Accordions
$(document).on('click', '.accordion .ac-header, .accordion .opener', function(e){
	e.preventDefault();
	e.stopPropagation();
	
	$('.accordion .ac-header, .accordion .opener').not(this).closest('.accordion').removeClass('opened').find('.ac-content').stop().slideUp(300);
	
	$(this).closest('.accordion').toggleClass('opened')
			.find('.ac-content').stop().slideToggle(300);
});

$(document).on('click', '.buy-list_element .contacts-title', function(e){
	e.preventDefault();
	e.stopPropagation();
	
	$('.buy-list_element .contacts-title').not(this).closest('.buy-list_element').removeClass('active').find('.contacts-list').stop().slideUp(300);
	
	$('.buy-list_element .contacts-title').not(this).parent('.contacts-acc').removeClass('opened');
	$(this).parent('.contacts-acc').addClass('opened');
	$(this).closest('.buy-list_element').toggleClass('active')
			.find('.contacts-list').stop().slideToggle(300);
			
	$('.buy-list_left').animate({
        scrollTop: $('.buy-list_element.active').offset().top},
        'slow');
});

let tooltipElem;

function equalWidth(group) {
	var tallest = 0;
	group.each(function() {
		thisWidth = $(this).width();
		if(thisWidth > tallest) {
			tallest = thisWidth;
		}
	});
	group.width(tallest);
}

function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		thiseight = $(this).height();
		if(thiseight > tallest) {
			tallest = thiseight;
		}
	});
	group.height(tallest);
}

document.onmouseover = function(event) {
  let target = event.target;

  // если у нас есть подсказка...
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml) return;

  // ...создадим элемент для подсказки

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  // спозиционируем его сверху от аннотируемого элемента (top-center)
  let coords = target.getBoundingClientRect();

  let left = coords.left;
  if (left < 0) left = 0; // не заезжать за левый край окна

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
	top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
};

document.onmouseout = function(e) {

  if (tooltipElem) {
	tooltipElem.remove();
	tooltipElem = null;
  }

};

$( document ).ready(function() {
	
	$('.btn-calc').on('click', function() {
		$('.calculator__inner').addClass('active');
		$('body').addClass('fixed');
	});
	
	equalWidth($('.numbers .advantages-text'));
	
	$('input[type=radio][name=choose_type]').change(function() {
		let type = $(this).attr('data-type');
		$('.type-form_content').removeClass('active');
		$('#'+type).addClass('active');
	});
	
	$('input.choose_type-checkbox').change(function() {
		$(this).parents('.item').toggleClass('active');
	});
	
	$('.search-button').on('click', function() {   
        $(this).parents('.slider-top_search').addClass('active');
        return false;
    });
	
	$('.search-field .close').on('click', function() {   
        $(this).parents('.slider-top_search').removeClass('active');
    });
	
	document.addEventListener('keydown', function(e) {
		if( e.keyCode == 27 ){
			$(".mobile-fullsearch").stop().slideToggle("slow");
			$('.overlay').toggleClass('active');
			$('body').toggleClass('fixed');
		}
	});
	
	$(".top-mobile_search").click(function(){
        $(".mobile-fullsearch").stop().slideToggle("slow");
		$('.mobile-fullsearch_form input').focus();
        $(this).toggleClass("active");
		$('.overlay').toggleClass('active');
		$('body').toggleClass('fixed');
		
		 return false;
    });
	
	$('.mobile-fullsearch .close').on('click', function() {
		$(".mobile-fullsearch").stop().slideToggle("slow");
		$('.overlay').toggleClass('active');
		$('body').toggleClass('fixed');
    });
	
	$('.mobile-menu_menu li.has-child').on('click', function(event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$(this).children('.sub-menu').stop().slideToggle("slow");
		$('.mobile-menu_menu li.has-child').not(this).children('.sub-menu').stop().slideUp("slow");
		$('.mobile-menu_menu li.has-child').not(this).removeClass('active');;
	});
	
	 $('.top-mobile_burger').on('click', function(event) {
        if(!$('body').hasClass('fixed')){
            $('body').addClass('fixed');
            $('.burger-checkbox').addClass('active');
            $(this).addClass('aside-b-open');
            $('.mobile-menu').stop().slideDown(500);
        }else{
            $('.burger-checkbox').removeClass('active');
            $('body').removeClass('fixed');
            $(this).removeClass('aside-b-open');
			$('.mobile-menu').stop().slideUp(500);
        }
        return false;
	});
	
	 $('.mobile-menu .close').on('click', function(event) {
            $('.burger-checkbox').removeClass('active');
            $('body').removeClass('fixed');
            $(this).removeClass('aside-b-open');
			$('.mobile-menu').stop().slideUp(500);
        return false;
	});
});
$(window).on('load', function () {
	$('.main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		centerMode: false,
		slidesPerView:'auto',
		autoplay: false,
		autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                }
            }
        ]
	});
	
	$('.standart-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		centerMode: false,
		prevArrow:'<button type="button" class="slick-prev"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92893 41.0711C4 38.1421 4 33.4281 4 24C4 14.5719 4 9.85786 6.92893 6.92893C9.85786 4 14.5719 4 24 4C33.4281 4 38.1421 4 41.0711 6.92893C44 9.85787 44 14.5719 44 24C44 33.4281 44 38.1421 41.0711 41.0711C38.1421 44 33.4281 44 24 44C14.5719 44 9.85786 44 6.92893 41.0711Z" fill="#EE7326"/><path d="M32 22.5C32.8284 22.5 33.5 23.1716 33.5 24C33.5 24.8284 32.8284 25.5 32 25.5H19.6213L23.0607 28.9393C23.6464 29.5251 23.6464 30.4749 23.0607 31.0607C22.4749 31.6464 21.5251 31.6464 20.9393 31.0607L14.9393 25.0607C14.658 24.7794 14.5 24.3978 14.5 24C14.5 23.6022 14.658 23.2206 14.9393 22.9393L20.9393 16.9393C21.5251 16.3536 22.4749 16.3536 23.0607 16.9393C23.6464 17.5251 23.6464 18.4749 23.0607 19.0607L19.6213 22.5H32Z" fill="white"/></svg></button>',
		nextArrow:'<button type="button" class="slick-next"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.0711 41.0711C44 38.1421 44 33.4281 44 24C44 14.5719 44 9.85786 41.0711 6.92893C38.1421 4 33.4281 4 24 4C14.5719 4 9.85786 4 6.92893 6.92893C4 9.85787 4 14.5719 4 24C4 33.4281 4 38.1421 6.92893 41.0711C9.85786 44 14.5719 44 24 44C33.4281 44 38.1421 44 41.0711 41.0711Z" fill="#EE7326"/><path d="M16 22.5C15.1716 22.5 14.5 23.1716 14.5 24C14.5 24.8284 15.1716 25.5 16 25.5H28.3787L24.9393 28.9393C24.3536 29.5251 24.3536 30.4749 24.9393 31.0607C25.5251 31.6464 26.4749 31.6464 27.0607 31.0607L33.0607 25.0607C33.342 24.7794 33.5 24.3978 33.5 24C33.5 23.6022 33.342 23.2206 33.0607 22.9393L27.0607 16.9393C26.4749 16.3536 25.5251 16.3536 24.9393 16.9393C24.3536 17.5251 24.3536 18.4749 24.9393 19.0607L28.3787 22.5H16Z" fill="white"/></svg></button>',
		slidesPerView:'auto',
		autoplay: false,
		autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                }
            }
        ]
	});
	
	if($('.form-field select').length) {
		$('.form-field select').styler();
	}
	
	if($('.form-field select').length) {
		$('.service-form_block input').styler();
	}
	
	if($(window).innerWidth()<=991) {
		$('.articles-content').slick({
			slidesToShow:2,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			centerMode: false,
			slidesPerView:'auto',
			autoplay: false,
			autoplaySpeed: 4000,
			responsive: [   
				{
					breakpoint: 767,
					settings: {
						slidesToShow:2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow:1,
					}
				}
			]
		});
		
		$('.dilery-advantages__list').slick({
			slidesToShow:1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			centerMode: false,
			slidesPerView:'auto',
			autoplay: true,
			autoplaySpeed: 4000,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 9999999,
					settings: 'unslick'
				},
				{
					breakpoint: 768,
					settings: {
						dots: false,
						arrows: false,
					}
				},
			]
		});
		
		$('.numeric-blocks__list').slick({
			slidesToShow:1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			centerMode: false,
			slidesPerView:'auto',
			autoplay: true,
			autoplaySpeed: 4000,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 999999,
					settings: 'unslick'
				},{
					breakpoint: 767,
					settings: {
						dots: false,
					}
				},
			]
		});
		
		
		$('.reviews-content').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			centerMode: false,
			slidesPerView:'auto',
			autoplay: false,
			autoplaySpeed: 4000,
			responsive: [
				{
					breakpoint: 767,
					settings: {
						dots: false,
					}
				},
			]
			
		});
		
		$('.advantages_board-list').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			centerMode: false,
			slidesPerView:'auto',
			autoplay: true,
			autoplaySpeed: 4000,
			variableWidth: true,
		});
	}
	
	if($(window).innerWidth()<=576) {
		$('.partners-content').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			centerMode: false,
			slidesPerView:'auto',
			autoplay: true,
			autoplaySpeed: 4000,
			variableWidth: true,
		});
	};
});
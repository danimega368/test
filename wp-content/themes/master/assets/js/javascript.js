function goBack() {
    window.history.back();
}

jQuery(function ($) {

	$( document ).ready(function() {
		
		function blink_text() {
			$('.blink').fadeOut(700,"linear");
			$('.blink').fadeIn(700,"linear");
		}
		setInterval(blink_text, 2000);
		
		if ($(window).width() < 1072) {
		   $('.register-button').click(function(e){
			   $('#menu').removeClass('click-open');
		   });
		}
		
		$('.accordion h2').click(function(e){
			$('.accordion').removeAttr("style");
			$('.accordion span').html('+');
			$(this).parent().find( "span" ).html('-');
			$(this).parent().css("height", "auto");
			$('.accordion-content').hide();
			$(this).parent().find( ".accordion-content" ).show();
		});
		
		$('#menu #menu-main-menu > li').click(function(e){
			$('#menu #menu-main-menu > li').removeClass('click-open');
			$(this).addClass('click-open');
		});
		
		$('.mobile-menu').click(function(e){
			$('#menu').addClass('click-open');
		});
		
		$('.close-menu').click(function(e){
			$('#menu #menu-main-menu > li').removeClass('click-open');
			$('#menu').removeClass('click-open');
		});
		
		
		
		
		
		$( ".menubutton" ).click(function() {
			$( "#submenu" ).slideToggle( "fast", function() {
					// Animation complete.
			});
		});
		$( ".menubutton" ).click(function() {
			$( ".menubutton" ).toggleClass( "active" );
		});
		
			var mySwiper = new Swiper('.swiper-container',{
			loop:true,
			grabCursor: true,
			paginationClickable: true,
			slidesPerView: 1,
			autoplay: 2500,
			loop: true
		  })
			
			var mySwiper = new Swiper('.slide',{
			loop:true,
			grabCursor: true,
			paginationClickable: true,
			slidesPerView: 1,
			autoplay: 2500,
			loop: true
		  })
		  
		  	var mySwiper = new Swiper('.license-list',{
			loop:true,
			grabCursor: true,
			paginationClickable: true,
			slidesPerView: 1,
			autoplay: 3000,
			loop: true
		  })
			
			var mySwiper = new Swiper('.game-list',{
			loop:true,
			paginationClickable: true,
			slidesPerView: 3,
			autoplay: 1000,
			breakpoints: {
			// when window width is >= 320px
			320: {
			  slidesPerView: 2
			},
			// when window width is >= 480px
			480: {
			  slidesPerView: 2
			},
			// when window width is >= 640px
			640: {
			  slidesPerView: 2
			}
		  }
		  })
			
			var mySwiper = new Swiper('.screenshot-container',{
			loop:true,
			grabCursor: true,
			paginationClickable: true,
			slidesPerView: 'auto',
			autoplay: 2500,
			loop: true,
				nextButton: '.screenshot-button-next',
			prevButton: '.screenshot-button-prev',
		  })
		  
		  
		  
			$(".game-page header.entry-header").prependTo(".top-content .col-2");
			$(".game-page .yasr-visitor-votes").prependTo(".top-content .col-2");
			$('.desc').readmore({
				moreLink: '<a href="#" class="more">Read More</a>',
				lessLink: '<a href="#" class="more">Close</a>',
				speed: 500
			});
		
	});
});


function goBack() {
    window.history.back();
}

jQuery( document ).ready(function() {
	jQuery( ".menubutton" ).click(function() {
		jQuery( "#submenu" ).slideToggle( "fast", function() {
		// Animation complete.
		});
	});
	jQuery( ".menubutton" ).click(function() {
		jQuery( ".menubutton" ).toggleClass( "active" );
	});
	jQuery("body").css({
		minHeight: screen.height
	});
});

jQuery(window).load(function() { // makes sure the whole site is loaded
	jQuery('#status').fadeOut(); // will first fade out the loading animation
	jQuery('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	jQuery('body').delay(350).css({'overflow':'visible'});
})

jQuery(document).ready(function () {
	
  var mySwiper = new Swiper('.swiper-container',{
    loop:true,
    grabCursor: true,
    paginationClickable: true,
    slidesPerView: 1,
    autoplay: 2500,
    loop: true,
		effect: 'cube',
		cube: {
			shadow: false,
			slideShadows: false,
			shadowOffset: 20,
			shadowScale: 1
		}
  })
	
	var mySwiper = new Swiper('.games',{
    loop:true,
    paginationClickable: true,
    slidesPerView: 1,
    autoplay: 4000,
		prevButton: '.games-prev',
		nextButton: '.games-next',
		effect: 'cube',
		cube: {
			shadow: false,
			slideShadows: false,
			shadowOffset: 20,
			shadowScale: 1
		}
  })
	
	var mySwiper = new Swiper('.game-list',{
    loop:true,
    paginationClickable: true,
    slidesPerView: 1,
    autoplay: 4000
  })
	
});

		jQuery( document ).ready(function() {
				jQuery('nav#mobile-menu').mmenu({
					extensions	: [ 'effect-menu-slide', "effect-listitems-slide", 'pageshadow'],
					slidingSubmenus : true,
					iconPanels: true,
					searchfield	: true,
					counters	: true,
					navbar 		: {
						title		: 'Main Menu'
					},
					navbars		: [
						{
							position	: 'top',
							content		: [ 'searchfield' ]
						}, {
							position	: 'top',
							content		: [
								'prev',
								'title',
								'close'
							]
						}, {
							position	: 'bottom',
							content		: [
								'Midas303â„¢ Mobile'
							]
						}
					]
				});
			});
			
			
			jQuery( document ).ready(function() {		
				jQuery(".main-banner").prependTo(".entry-content");
				jQuery('.desc').readmore({
					moreLink: '<a href="#" class="more">Read More</a>',
					lessLink: '<a href="#" class="more">Close</a>',
					speed: 500});
			});

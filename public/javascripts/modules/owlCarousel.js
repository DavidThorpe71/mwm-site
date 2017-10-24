$(document).ready(function(){
	const owl = $(".owl-carousel");
	owl.owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		//Below commented out for auto play
		// item: 7,
		// autoplay: true,
		// autoplayTimeout:3000,
		// autoplayHoverPause: true,
		responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	        },
	        450:{
	            items:3,
	        },
	        800:{
	            items:5,
	        }
	    }
	});
})
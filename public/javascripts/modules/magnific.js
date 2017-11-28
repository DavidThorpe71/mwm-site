$(document).ready(function() {
  $('.img__container').magnificPopup({
  	delegate: 'img',
  	type:'image',
  	gallery:{enabled:true},
  	callbacks: {
        elementParse: item => {
            let $el = $(item.el)
            item.src = $el.attr('src')
        }
    }
  });
});

$(document).ready(function() {
  $('.mig__container').magnificPopup({
    items: [
      {
        src: "/images/TIG WELDING.jpg"
      },
      {
        src: "/images/TIG WELDING 1.jpg"
      },
      {
        src: "/images/MIG WELDING.jpg"
      },
    ],
    type:'image',
    gallery:{enabled:true},
    // callbacks: {
    //     elementParse: item => {
    //         let $el = $(item.el)
    //         item.src = $el.attr('src')
    //     }
    // }
  });
});
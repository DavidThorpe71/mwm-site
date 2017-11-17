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
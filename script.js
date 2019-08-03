jQuery(function($){
    var active;
    var boxes = $('.accordion-slider .box').length;
    var singleBoxWidth = (100 / boxes);
    var collapsedWidth = singleBoxWidth - ( singleBoxWidth / ( boxes - 1 ) );
    var openWidth = 100 - (collapsedWidth * ( boxes - 1 ) );

    function accordionSlider() {
        $('.accordion-slider .box').css('width', 100/boxes + '%' )
        $('.accordion-slider .box').on('mouseenter', function(){
            if ( !$(this).hasClass('active') && $(window).width() >= 550 ){
                //hide active elements
                if( active ){ 
                    TweenLite.to(active.find('.accordion-slider-title'), 0.3, {opacity:0, x:0, overwrite:'all'});
                    TweenLite.to(active.find('.accordion-slider-content'), 0.3, {opacity:0, x:0, overwrite:'all'});
                }
                    
                //introduce new active elements
                var others = $('.accordion-slider .box').not(this);
                active = $(this);
                $(this).addClass('active');
                others.removeClass('active');
                var tl = new TimelineLite();
                tl.to(others, 0.8, {ease: Back.easeOut.config(1.1),width:collapsedWidth + '%'}, 0)
                .to(active, 0.8, {ease: Back.easeOut.config(1.1),width:openWidth + '%'}, 0)
                .to(active.find('.accordion-slider-title'), 0.6, {ease: Back.easeOut.config(1.2),opacity:1, x:100}, 0.3)
                .to(active.find('.accordion-slider-content'), 0.6, {ease: Back.easeOut.config(1.2),x:100, opacity:1}, 0.4);
            }

        });
        $('.accordion-slider .box').on('mouseleave', function(){
            if ( $(window).width() >= 550 ){
                var all = $('.accordion-slider .box');
                var tl = new TimelineLite();
                tl.to(all, 0.8, {ease: Back.easeOut.config(1.1),width: 100/boxes + '%'}, 0)
                .to(active.find('.accordion-slider-title'), 0.3, {opacity:0, x:0, overwrite:'all'}, 0)
                .to(active.find('.accordion-slider-content'), 0.3, {opacity:0, x:0, overwrite:'all'}, 0)
                $(this).removeClass('active');
            }
        });
        if( $(window).width() < 550 ) {
            $('.accordion-slider-title, .accordion-slider-content').removeAttr('style');
            $('.accordion-slider .box').removeClass('active').css('width', '100%');
        }
            
    }

  accordionSlider()

  $(window).resize(function(){accordionSlider()});


});
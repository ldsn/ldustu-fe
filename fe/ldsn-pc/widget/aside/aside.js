$(document).ready(function () {
    $(window).on('scroll',function () {
        var bottom  = $(document).height() - $('.module-share').offset().top;
        if (bottom <= 185) {
            if (parseInt($('.module-share').css('bottom')) == 100)
                return;
            $('.module-share').css('bottom', 100)
        } else if(bottom >= 400){
            if (parseInt($('.module-share').css('bottom')) == 0)
                return;
            $('.module-share').css('bottom', 0)
        }
    });
    $(window).trigger('scroll');
});
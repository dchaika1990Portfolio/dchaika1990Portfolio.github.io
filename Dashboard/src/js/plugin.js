;(function () {
    // Sidebar mobile
    var menuBtn = $('.menu-btn');
    var body = $('body');
    var mobileSidebarClass =  '_mobileSidebar';
    var mobileBreakPoint = 1280;
    var openInMobileClass = '_openInmobile';

    menuBtn.on('click', function (e) {
        var width = $(window).width();
        body.toggleClass(mobileSidebarClass);

        if( width < mobileBreakPoint ){
            body.addClass(openInMobileClass);
        }
    });

    $(window).on('resize load', function (e) {
        var width = $(this).width();

        if( width < mobileBreakPoint && !body.hasClass(openInMobileClass) ){
            body.addClass(mobileSidebarClass);
        } else if( width > mobileBreakPoint ){
            body.removeClass(mobileSidebarClass);
            body.removeClass(openInMobileClass);
        }
    });

    // Loader hide
    var loader = $('#loading');

    $(window).on('load', function (e) {
        loader.addClass('hide');
    });

    // dropdown menu
    var dropdownWrap = $('.dropdown-wrap');

    dropdownWrap.on('click', function (e) {
        e.preventDefault();

        var dropdown = $(this).find('.dropdown-menu');
        dropdown.slideToggle();
    });


})();
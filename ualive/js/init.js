$(function(){

    //Navbar

    //Navbar-mobile search-icon
    $('.navbar-mobile .fa-search').on('click',function(e){
        e.preventDefault();

        $('.head .navbar-mobile .search').addClass('show');
        $('.navbar-mobile .search').show();
        $('.navbar-mobile .fa-times').show();
        $(this).parent().prev().hide();
        $(this).hide();

        $('.navbar-mobile .social-nav').addClass('search-open');

        if ( $('.navbar-mobile .search').is(':visible') ) {
            $('.navbar-mobile .logo a').css('background-color', 'transparent');
        } else {
            $('.navbar-mobile .logo a').css('background-color', '');
        }
    });

    //Navbar-mobile close-icon
    $('.navbar-mobile .fa-times').on('click',function(e){
        e.preventDefault();

        $('.head .navbar-mobile .search').removeClass('show');
        $('.navbar-mobile .search').hide();
        $(this).parent().next().show();
        $('.navbar-mobile .fa-search').show();
        $(this).hide();

        $('.navbar-mobile .social-nav').addClass('search-open');

        if ( $('.navbar-mobile .search').is(':visible') ) {
            $('.navbar-mobile .logo a').css('background-color', 'transparent');
        } else {
            $('.navbar-mobile .logo a').css('background-color', '');
        }
    });

    // Mobile nav-burger
    $('.burger').on('click', function (e) {
        e.stopPropagation();
        $('.navbar-mobile').css('display', 'none');
        $('.navbar-mobile-burger').show();
    });


    $('.navbar-mobile-burger .social-nav a').on('click',function (e) {
        e.preventDefault();

        $('.navbar-mobile').css('display', '');
        $('.navbar-mobile-burger').hide();
    });

    $(window).on('resize',function() {
        if ( $(this).width() > 1200 ) {
            $('.navbar-mobile').css('display', 'none');
            $('.navbar-mobile-burger').hide();
        } else if( $('.navbar-mobile-burger').is(':visible') ){
            $('.navbar-mobile').hide();
        } else {
            $('.navbar-mobile').css('display', '');
        }
    });


    //All-news-nav
    $('.btn-dropdown').on('click',function () {
        if ($('.all-news-another').is(':hidden')) {
            $('.btn-dropdown .fa').addClass('fa-angle-up').removeClass('fa-angle-down');
            $('.all-news-another').addClass('show');
        } else {
            $('.btn-dropdown .fa').addClass('fa-angle-down').removeClass('fa-angle-up');
            $('.all-news-another').removeClass('show');
        }

    });


    // Slick slider init
    $('.photo-carousel').slick({
        dots: true
    });


    // news toggle
    $('.news-item .news-text span.toggle').on('click',function(e){
        var self = this;

        $(this).parents('.news-item').next('.news-box').slideToggle('fast', function(){
            $(self).parents('.news-item').toggleClass('open');
        });

    });

    //weather-form
    $('.weather .settings').on('click',function (e) {
        $('.weather .weather-form').show();
    });

    $('.weather .weather-form .fa').on('click',function (e) {
        $('.weather .weather-form').hide();
    });



    //Aside blocks

    //btn-media
    $('.main .buttons .btn-media').on('click touchstart touchend touchmove',function(e){
        $('.main .aside-right').removeClass('show');
        $('.main .aside-left').toggleClass('show');
    });

    //btn-info
    $('.main .buttons .btn-info').on('click',function(e){
        $('.main .aside-left').removeClass('show');
        $('.main .aside-right').toggleClass('show');
    });

    //btn-close all
    $('.main .buttons a').on('click touchstart touchend touchmove',function(e){
        $('.main .aside-left, .main .aside-right').removeClass('show');
    });

    //Aside blocks display:block if $(window).width() >= 1201
    // $(window).on('resize',function() {
    //     if ( $(this).width() > 1200 ) {
    //         $('.main .aside-left, .main .aside-right').show();
    //     } else if ( $(this).width() <= 1200 ) {
    //         $('.main .aside-left, .main .aside-right').removeClass('show');
    //     }
    // });


    //Footer

    //Footer-mobile nav-btn
    $('.footer .footer-mobile .nav-btn').on('click',function(){
        $('.footer .footer-big').addClass('mobile-show show');
        $('.footer .container > .footer-mobile').addClass('hide').removeClass('show');
    });

    //Footer-mobile close-button
    $('.footer .footer-mobile .social-nav.close').on('click',function (e) {
        e.preventDefault();
        $('.footer .footer-big').removeClass('mobile-show show');
        $('.footer .container > .footer-mobile').removeClass('hide').addClass('show');
    });

    //Footer if $(window).width() >= 1201
    $(window).on('resize',function() {
        if ( $(this).width() > 1200 ) {
            $('.footer-mobile').addClass('hide').removeClass('show');
            $('.footer-big').addClass('show');
        } else if ( $(this).width() <= 1200 ) {
            $('.footer-big').removeClass('show');
            $('.footer-mobile').removeClass('hide').addClass('show');
        }
    });


    //Modal

    //modal window open
    $('.social-nav .fa-user-o').on('click',function (e) {
        e.preventDefault();

        $('.modal, .overlay').addClass('show');
    });

    //modal window close
    $('.overlay .close-modal').on('click',function () {
        $('.modal, .overlay').removeClass('show');
    });



});
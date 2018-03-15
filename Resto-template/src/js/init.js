$(document).ready(function () {

    //Navbar
    $(window).scroll(function () {
       if ($(this).scrollTop() > 10 ) {
           $('.header').addClass('scrolled');
       } else {
           $('.header').removeClass('scrolled');
       }
    });
    $(window).change(function () {
       console.log($(this).width())
    });

    // Navbar btn
    $('.mobile-btn').on('click', function () {
        if ( $('.mobile-nav').is(':hidden') ){
            $('.mobile-nav').slideDown(500).css('display','flex');
            $(this).css('justify-content', 'center');
            $('.mobile-btn span:first').css('transform', 'rotate(-45deg) translateX(-3px) translateY(2px)');
            $('.mobile-btn span:eq(1)').css('opacity', 0);
            $('.mobile-btn span:last').css('transform', 'rotate(45deg)');
        } else {
            $('.mobile-nav').slideUp(500);
            $(this).css('justify-content', 'space-around');
            $('.mobile-btn span:first').css({'transform': ''});
            $('.mobile-btn span:eq(1)').css('opacity', 1);
            $('.mobile-btn span:last').css({'transform': ''});
        }
    });

    if ( $(window).width() > 767 ) $('.mobile-nav').css('display','none');

    //Navbar active link
    $(function () {
        $(".header-nav, .mobile-nav").changeActiveNav();
    });

    //Slider
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    $('.slick-arrow').hide();
    $('.slider').hover(
        function () {
            $('.slick-arrow').stop().fadeIn();
        },
        function () {
            $('.slick-arrow').stop().fadeOut();
        }
    );


    //Datepicker
    $('#date').datepicker({
        'format': 'yyyy-m-d',
        'autoclose': true
    });

    //Timepicker
    $('#time').timepicker({
        'showDuration': true,
        'timeFormat': 'g:ia'
    });

    //Loader
    $(window).load(function() {
        $("#loading").delay(2000).fadeOut(500);
        $("#loading-center").click(function() {
            $("#loading").fadeOut(500);
        })
    });

    //Validate
    $("#form-reservation").validate({
        rules: {
            people: 'required',
            date: {
                required: true,
            },
            time: {
                required: true,
            },
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            }
        },
        messages: {
            people: {
                required: 'This is required field'
            },
            date: {
                required: 'This is required field',
            },
            time: {
                required: 'This is required field',
            },
            name: {
                required: 'This is required field',
            },
            email: {
                required: 'This is required field',
                email: 'The example is test@test.com'
            },
            phone: {
                required: 'This is required field'
            }
        }
    });

    $('#form-contact').validate({
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 50
            }
        },
        messages: {
            name: {
                required: 'This is required field',
            },
            email: {
                required: 'This is required field',
                email: 'The example is test@test.com'
            },
            message: {
                required: 'This is required field',
                minlength: 'It must be min 50 letters'
            }
        }
    });

    //btn-up
    var $btnUp = $('.btn-up');
    $(window).on('scroll', function () {

        if ( $(this).scrollTop() >= 200 ) {
            $btnUp.css({
                'opacity': 1,
                'right': '15px'
            })
        } else {
            $btnUp.css({
                'opacity': '',
                'right': ''
            })
        }

    });

    $btnUp.click(function () {
        $('html, body').animate({scrollTop: 0}, 900)
    });

});
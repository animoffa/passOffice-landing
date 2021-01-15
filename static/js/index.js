$(document).ready(function () {
    jQuery(window).scroll(function () {
        const $sections = $('.block');
        $sections.each(function (i, el) {
            const top = $(el).offset().top - 150;
            const bottom = top + $(el).height();
            const scroll = $(window).scrollTop();
            const id = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                $('a').removeClass('active');
                $('a[href="#' + id + '"]').addClass('active');

            }
        })
    });

    $('#formButton').click(function () {
        $('form input').each(function (i, el) {
            let val = $(el).val();
            if (val.length >= 1) {
                $(el).removeClass('input-error');
            } else {
                $(el).addClass('input-error');
                if ($(el).hasClass('comment')) {
                    $(this).removeClass('input-error');
                }
            }
        })
    });
    $('.functional').click(function () {
        const $funs = $('.functional');
        const $id = $(this).attr('id');
        $funs.each(function (i, el) {
            $('.description').removeClass('visible');
            $(el).removeClass('active-functional')
        });
        $('div[id="' + $id + '"]').addClass('active-functional');
        $('div[id="' + $id + 'Description"]').addClass('visible');
    })
    const overlay = document.getElementById('overlay');


    $(overlay).click(function () {
        $(overlay).addClass('hidden');
        if($(window).width()>479){
            $("video").get(0).play();
            $("video").addClass('controls');
        }else{
            $(".video-mob").get(0).play();
            $(".video-mob").addClass('controls');
        }
    })

    $(function () {
        $('a[href^="#"]').click(function () {
            const target = $(this).attr('href');
            let scrollTo = $(target).offset().top - 60;
            $('html, body').animate({scrollTop: scrollTo}, 1000);
            return false;
        });
    });

    $('#menu').click(function () {
        $('.overlay').css('display', 'block')
        $('#nav').css('display', 'flex');
        $(this).css('display', 'none');
        $("#menuClose").css('display', 'flex');
    })

    $('#menuClose').click(function () {
        $('.overlay').css('display', 'none')
        $('#nav').css('display', 'none');
        $(this).css('display', 'none');
        $("#menu").css('display', 'flex');
    })

    $('form').on('submit', function (e) {
        e.preventDefault();
        const nameInput = $('form .name');
        const name = nameInput.val().trim();
        const companyInput = $('form .company');
        const company = companyInput.val().trim();
        const emailInput = $('form .email');
        const email = emailInput.val().trim();
        const phoneInput = $('form .phone');
        const phone = phoneInput.val().trim();
        const commentInput = $('form .comment');
        const comment = commentInput.val().trim();
        if (grecaptcha.getResponse() === "") {
            $("#captcha-error").css("display", "block");
        } else {
            $('#captcha-error').text('');
            if (name && company && email && phone) {
                $('#captcha-error').text('');
                $.ajax({
                    type: 'POST',
                    url: '/api/sendEmail',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    data: JSON.stringify({name, company, email, phone, comment}),
                    success: () => {
                        $(".modal-done").css("display", "flex").delay(2000).fadeOut(400);
                        if ($(window).width() <= 479) {
                            $('.overlay').css('display', 'block').delay(2000).fadeOut(400);
                        }
                        nameInput.val('');
                        companyInput.val('');
                        emailInput.val('');
                        phoneInput.val('');
                        commentInput.val('');
                        grecaptcha.reset();
                    },
                    error: (xhr) => {
                        $('#captcha-error').css("display", "block").text(xhr.responseText);
                    }
                });
            }
        }
    });
});
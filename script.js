$(function() {

    var settings = {
        mainClosedWith: 20,
        mainOpenWidth: 70,
        animationDuration: 500
    };

    function showChapterContainer($main, callback) {
        $main.addClass('sesam').animate({
            'width': settings.mainOpenWidth + 'vw',
            'margin-left': '-' + settings.mainOpenWidth / 2 + 'vw'
        }, function() {
            if (callback) {
                callback();
            }
        });
    }

    function hideChapterContainer($main, callback) {
        $main.removeClass('sesam').animate({
            'width': settings.mainClosedWith + 'px',
            'margin-left': '-' + settings.mainClosedWith / 2 + 'px'
        }, function() {
            if (callback) {
                callback();
            }
        });
    }

    function showChapter($chapter) {
        $chapter.css({'display': 'block'}).addClass('active');
    }

    function hideChapter() {
        $('.active').css({'display': 'none'}).removeClass('active');
    }

    function scrollToTerm(sTermName) {
        $('.main_inner').scrollTo('#' + sTermName, settings.animationDuration, showTerm(sTermName));
    }

    function showTerm(sTermName) {
        $('#' + sTermName).find('.term_content').addClass('active_term').slideDown();
    }

    function hideTerm() {
        $('.active_term').removeClass('active_term').slideUp();
    }

    $('.c_link').on('click', function() {
        var $main = $('main'),
            iChapterId = $(this).attr('data-chapter-id'),
            iActiveId =  $('.active').attr('id');


        if ($main.hasClass('sesam')) {
            hideChapterContainer($main, function() {

                // hide visible terms
                hideTerm();
                hideChapter();

                if (iChapterId !== iActiveId) {
                    showChapterContainer($main);
                    showChapter($('#' + iChapterId));
                }

            });
        }
        else {
            showChapterContainer($main);
            showChapter($('#' + iChapterId));
        }
    });

    $('.t_link').on('click', function() {
        var $main = $('main'),
            iChapterId = $(this).attr('data-chapter-id'),
            iActiveId =  $('.active').attr('id'),
            sTermId = $(this).attr('data-term-id');

        if ($main.hasClass('sesam')) {
            hideChapterContainer($main, function() {

                // hide visible terms
                hideTerm();
                hideChapter();

                if (iChapterId !== iActiveId) {
                    showChapter($('#' + iChapterId));
                    showChapterContainer($main);
                }

            });
        }
        else {
            // THE ONLY DIFFERENCE WITH THE CHAPTER LINK
            showChapterContainer($main, function() {
                scrollToTerm(sTermId);
            });

            showChapter($('#' + iChapterId));
        }
    });

    $('.term_title').on('click', function() {
        var $termContent = $(this).siblings('.term_content');

        if ($termContent.hasClass('active_term')) {
            hideTerm();
        }
        else {
            showTerm($(this).parent().parent().attr('id'));
        }
    });

    $('.c_link').hover(function() {
        $(this).animate({'margin-left': '-2em'});
    }, function() {
        $(this).animate({'margin-left': '0'});
    });

    $('.t_link').hover(function() {
        $(this).animate({'margin-right': '-2em'});
    }, function() {
        $(this).animate({'margin-right': '0'});
    });
});

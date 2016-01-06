var firstTry = true;

function getRandomRange(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.max = function(array)
{
    return Math.max.apply(Math, array);
}

$(function()
{
    $('.nav_bar').on('click', function() {
        if ($(this).hasClass('open')) {
            $(this).animate({'width': '15px'}).removeClass('open');
        }
        else {
            $(this).animate({'width': '50%'}).addClass('open');
        }
    });

    $(".draagbaar").draggable({ stack: ".draagbaar" });

    $('.sesam').on('click', function() {
        $('.essay_complete').slideToggle(10000, function() {
            $('.draagbaar').toggle();
            $('#frame_wrapper').fadeIn("slow");
            snapToAnker();
        });
    });
});

/*
    draggable frame functions
*/

function selectFrame(element, stack)
{
    var a = [];

    $(stack).each(function ()
    {
        a.push( $(this).css( "z-index") )
    });

    // console.log(a[0], a[1], a[2]);

    var z = Array.max(a);
    console.log(maxZ);

    $(element).css({ "z-index": z + 1 })
};


/*
    snap elke frame aan een anker om de positie te bepalen
*/
function snapToAnker()
{
    var ankers = []; // array om de positie van elk anker in op te slaan
    var frames = []; // array om de oorspronkelijk positie van elk frame in op te slaan
    var nummer = 0;  // variable (om elk frame te kunnen selecteren in een loop)

    $(".anker").each(function ()
    {
        ankers.push( $(this).offset() );
    });


    $(".draagbaar").each(function ()
    {
        frames.push( $(this).offset() );
    });

    if (ankers.length == frames.length)
    {
        for (var i = 0; i < ankers.length; i++)
        {
            nummer = i + 1;

            // console.log( ankers[i].top + ", " + ankers[i].left );
            // console.log( frames[i].top + ", " + frames[i].left );

           $("#frame" + nummer).css(
           {
                "top": ankers[i].top + frames[i].top + "px",
                "left": ankers[i].left + frames[i].left + "px"
                // "background-color": "rgb(" + getRandomRange(0, 255) + "," + getRandomRange(0, 255) + "," + getRandomRange(0, 255) + ")"
           });
        }
    }
    else
    {
        alert("Er zijn niet een gelijk aantal ankers en frames..")
    }

    console.log("ankers: " +ankers.length+ ", frames: " +frames.length)

}
/*
    smoooth scroll function
*/

$(function()
{
    $('a[href*=#]:not([href=#])').click(function()
    {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
        {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice1 +']');

            if (target.length)
            {
                $('html,body').animate(
                {
                    scrollTop: target.offset().top
                }, 1500);

                return false;
            }
        }
    });
});

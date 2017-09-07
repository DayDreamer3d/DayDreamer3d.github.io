function draw_pie() {

}


function draw_exp_pie() {
    
}


function card_expand() {

    $(this).children('.contract').hide();
    $(this).children('.expand').css('display', 'flex');

    var w = $('#main-container').width() - 22;
    var expand = $(this).children('.expand')[0];
    var h = $(expand).height() + 11;  // TODO : not exact why ?

    $(this).animate({width: w}, 150);
    $(this).animate({height: h}, 150);
    
    var current_element = this;
    $('.card').each( function () {
            if (this !== current_element) {
                $(this).parent().hide();
            }
        }
    );

    $(this).one('click', card_contract);
    $(this).off('mouseenter');
    $(this).off('mouseleave');
    $(this).removeClass('hover');
}


function card_contract() {

    $(this).children('.expand').hide();
    $(this).animate({width: 479.21}, 150);
    $(this).animate({height: 243}, 150);
    $(this).children('.contract').css('display', 'flex');


    var current_element = this;

    $('.card').each( function () {
            if (this !== current_element) {
                $(this).parent().show();
            }
        }
    );

    $(this).one('click', card_expand);
    $(this).mouseenter(function () { $(this).addClass('hover'); });
    $(this).mouseleave(function () { $(this).removeClass('hover'); });
}


function attach_card_events() {
    $('.card').each(function() {
        $(this).one('click', card_expand);
        $(this).mouseenter(function () { $(this).addClass('hover'); });
        $(this).mouseleave(function () { $(this).removeClass('hover'); });
    });
}

$(document).ready(
    function() {
        draw_exp_pie();
        attach_card_events();
    }
);
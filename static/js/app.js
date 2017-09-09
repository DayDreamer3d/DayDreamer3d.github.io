var pie_info = {
    'exp_pie': [[2/6, 1/6, 3/6], '6'],
    'tut_pie': [[2/4, 1/4, 1/4], '4'],
    'acc_pie': [[1/4, 1/4, 2/4], '3'],
    'rec_pie': [[1/6, 4/6, 1/6], '4']
}


function draw_pie(element_name, fractions, inner_text, colour) {
    // jQuery doesn't supports canvas so this is in js.
    var canvas = document.getElementById(element_name);
    var context = canvas.getContext('2d');

    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    var lineWidth = 4;
    var padding = 8;
    var radius = Math.min(canvas.width, canvas.height) * 0.5 - lineWidth - padding;
    var x = canvas.width * 0.5;
    var y = canvas.height * 0.5;

    var reduce = 2 * Math.PI * .02;

    context.lineWidth = lineWidth;
    context.lineCap= 'round';
    context.strokeStyle = colour;

    var start = 0;
    var end = 0;
    for (var i = 0; i < fractions.length; i ++) {
        end = 2 * Math.PI * fractions[i] + start;
        
        context.beginPath();
        context.arc(x, y, radius, start, end - reduce);
        context.stroke();

        start = end;
    }

    context.font = 'normal normal 300 4em Roboto';
    context.textBaseline = 'middle'; 
    context.fillStyle = colour;

    x -= 64 * inner_text.length * 0.5 - 5; 
    context.fillText(inner_text, x, y);
}


function draw_summary_pies() {
    var colour = '#bac5ca';

    var name = 'exp_pie';
    var info = pie_info[name];
    var fractions = info[0];
    var inner_text = info[1];
    draw_pie(name, fractions, inner_text, colour);

    var name = 'tut_pie';
    var info = pie_info[name];
    var fractions = info[0];
    var inner_text = info[1];
    draw_pie(name, fractions, inner_text, colour);

    var name = 'acc_pie';
    var info = pie_info[name];
    var fractions = info[0];
    var inner_text = info[1];
    draw_pie(name, fractions, inner_text, colour);

    var name = 'rec_pie';
    var info = pie_info[name];
    var fractions = info[0];
    var inner_text = info[1];
    draw_pie(name, fractions, inner_text, colour);

}


function card_expand() {

    $(this).children('.contract').hide();
    var expand = $(this).children('.expand')[0];
    $(expand).css('display', 'flex');

    var w = $('#main-container').width() - 22;
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
        $(this).mouseenter(function () { 
            $(this).addClass('hover');
            // var pie = $(this).children('canvas');
            // console.log(pie);
            // var info = pie_info[$(pie).attr('id')];
            // var fractions = info[0];
            // var inner_text = info[1];
            // draw_pie(null, $(pie).attr('id'), fractions, inner_text, '#fff');
        });
        $(this).mouseleave(function () {
            $(this).removeClass('hover');
        });
    });
}


function attach_canvas_events() {
    $('canvas').each(function () {
        $(this).mouseover(function (e) {
            var info = pie_info[$(this).attr('id')];
            var fractions = info[0];
            var inner_text = info[1];
            draw_pie(e, $(this).attr('id'), fractions, inner_text, '#bac5ca');
        });
        var current_card = $(this).closest('.card');
        $(this).mouseenter(function () {
            current_card.off('mouseenter');
            current_card.removeClass('hover');
        });
        $(this).mouseleave(function () {
            current_card.on('mouseenter');
            current_card.addClass('hover');
        });
    });
}


$(document).ready(
    function() {
        draw_summary_pies();
        attach_card_events();
        // attach_canvas_events();
    }
);

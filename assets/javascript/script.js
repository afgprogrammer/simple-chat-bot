/**
 * Created by Mohammad on 11/1/2017.
 */

$(function () {

    var you = 'You';
    var robot = 'Mamad';

    var delayStart = 400;
    var delayEnd = 800;

    var waiting = 0;

    var chatBox = $('#response');
    var bot = new chatBot();

    var submitChat = function () {
        var input  = $('input').val();

        if (input == '') return;
        $('input').val('');

        updateChat(you, input);
        var reply = bot.response(input);

        var latency = Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart);
        $('.busy').css('display', 'block');
        waiting++;
        setTimeout( function() {
            if(typeof reply === 'string') {
                updateChat(robot, reply);
            } else {
                for(var r in reply) {
                    updateChat(robot, reply[r]);
                }
            }
            if(--waiting == 0) $('.busy').css('display', 'none');
        }, latency);

    };

    var updateChat = function(party, text) {

        var style = 'you';
        if(party != you) {
            style = 'other';
        }

        var line = $('<div><span class="party"></span> <span class="text"></span></div>');
        line.find('.party').addClass(style).text(party + ':');
        line.find('.text').text(text);

        chatBox.append(line);

        chatBox.stop().animate({ scrollTop: chatBox.prop("scrollHeight")});

    };

    $('input').bind('keydown', function(e) {
        if(e.keyCode == 13) {
            submitChat();
        }
    });

    updateChat(robot, 'Hi there. Try typing something!');

});

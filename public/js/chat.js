/**
 * Created by vinhdv on 8/26/16.
 */
var socket = io();


$(function () {

    //get message chat
    socket.on('messages', function (data) {
        $('#content ul').append($('<li>').text(data.msg));
    });
    //push message
    $('#input').keydown(function (e) {
        if (e.keyCode == 13) {
            socket.emit('on message', $(this).val());
            $(this).val('');
            return false;
        }
    });

    $('#send').click(function (e) {
        e.preventDefault();
        socket.emit('on message', $('#input').val());
        $('#input').val('');
    });

    //get list user

    socket.on('users', function (users) {
        var html = '';
        $.each(users, function (k, v) {
            html += '<div class="mdl-list__item">';
            html += '<a href="" class="mdl-list__item-primary-content">';
            html += '<i class="material-icons mdl-list__item-avatar">peson</i>';
            html += '<span>'+ v.username+'</span>';
            html += '</a>';
            html += '<span class="mdl-list__item-secondary-content">';
            html += '<a class="mdl-list__item-secondary-action" href=""><i class="material-icons">start</i></a>';
            html += '</span>';
            html += '</div>';
        });

        $('#list-user').html(html);
    });
});


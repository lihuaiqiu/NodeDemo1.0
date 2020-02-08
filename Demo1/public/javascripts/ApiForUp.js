$(function () {
    $("#inputfile").click(function () {
        $.ajax({
            url: '/upload',
            type: 'POST',
            cache: false,
            data: new FormData($("#picform")[0]),
            processsData: false,
            contentType: false
        }).done(function (res) {

        }).fail(function (res) {
        });

    });
});
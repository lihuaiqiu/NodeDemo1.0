$(function(){
    $("#SubFortxt").click(function () {
        $.ajax({
            url : "/users/addcomments",
            type: "POST",
            data: {
                comment:$('#input').val()
            },
            success: function (data) {
                data=$.parseJSON(data);
                if(data.add){
                    alert("添加成功");
                }
                location.href='/users';

            },
            error: function (){
                alert("添加失败");

            }
        });


    });
});
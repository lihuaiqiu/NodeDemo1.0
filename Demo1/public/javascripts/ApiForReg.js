$(function(){
    $("#register").click(function () {
        const username = $("#username").val();
        const password = $("#password").val();

        if(username==''||password==''){
            alert('用户名或密码不为空');
            return false;   //需要return false 来终止程序的运行，否则会进入下面的运行代码，造成安全隐患
        }
        if(password.length<8){
            alert('密码不能小于8位');
            return false;
        }
        $.ajax({
            url: "/register",
            type: "POST",
            data:{
                username: username,
                password: password
            },
            success: function(data){
                data=$.parseJSON(data);
                if(data.register==true){
                    alert("Register Successfully");
                }

            },
            error: function () {
                alert("Something Wrong")
            }
        });

    });
});
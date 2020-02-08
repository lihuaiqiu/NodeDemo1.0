$(function(){
    $("#login").click(function () {
        const username = $("#username").val();
        const password = $("#password").val();
        $.ajax({
            url: "/login",
            type: "POST",
            data:{
                username: username,
                password: password
            },
            success: function(data){
                data=$.parseJSON(data);
                console.log(data);
                if(data.login==true){
                    alert("Login Successfully");
                    location.href="/users";
                }
                else{
                    alert("Username or password Wrong!");
                }

            },
            error: function () {
                alert("Something Wrong")
            }
        });

    });
});
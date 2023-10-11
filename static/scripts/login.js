//login
var logged_in = false;
var log_open = false;

var email = "";
var FullName = "";


function hideText(){
    document.querySelector('.loginError').style.removeProperty("opacity")
}
function loginClicked(){

    if(log_open){
        deleteOptions();
    }
    else{
        confirmLogin(function(){
            let welcome = document.querySelector('.welcome');
            let name = document.querySelector('.name')
            let button = document.querySelector('.logout');
            if(email===""){
                showOptions()
                welcome.hidden = true;
                name.hidden = true;
                button.hidden = true;
            }
            else{
                log_open = true;
                let main = document.querySelector('.loginUI');

                main.style.width = "350px";
                main.style.height = "500px";

                document.getElementById("chk").checked = false;

                let nametext = document.querySelector('.nametext')

                nametext.innerText = FullName.split(' ')[0]

                welcome.hidden = false;
                name.hidden = false;
                button.hidden = false;

                welcome.style.opacity = 1;
                name.style.opacity = 1;
                button.style.opacity = 1;

                const items = document.querySelectorAll('.inps')

                items.forEach((item) => {
                    item.hidden = true;
                })




            }
        })
    }
}

function showInfo(){

}

function showOptions(){

    log_open = true;

    let main = document.querySelector('.loginUI');

    main.style.width = "350px";
    main.style.height = "500px";
    

    const items = document.querySelectorAll('.inps')

    items.forEach((item) => {
        item.hidden = false;
        item.style.opacity = 1;
    })
    
    
}

function deleteOptions(){
    log_open = false;
    let main = document.querySelector('.loginUI');

    main.style.removeProperty('width');
    main.style.removeProperty('height');
    hideText()

    const items = document.querySelectorAll('.inps')

    items.forEach((item) => {
        item.style.opacity = 0;
    })
}


//when it is clicked
$("#loginform").submit(function(e) {
    e.preventDefault();
    console.log("Logging in")

    data = [$('.userlogemail').val(), $('.userlogpassword').val()]
    $.post('/login', {data: JSON.stringify(data)}, function(response) {
        console.log(response.message)
        $('.loginError').text(response.message)
        if (response.message === "Success"){
            //save the keys here
            localStorage.setItem('loginkey', response.key);
            localStorage.setItem('logintoken', response.token)

            $('.loginError').css("color","#0f0");

            setTimeout(deleteOptions, 1000)

        }
        else{
            $('.loginError').css("color","#f00");
        }
        $('.loginError').css("opacity","1");

    });
});

$("#signupform").submit(function(e) {
    e.preventDefault();
    console.log("Signing up")

    console.log($('.usersignname'))

    data = [$('.usersignname').val(), $('.usersignemail').val(), $('.usersignpassword').val()]
    console.log(data)
    $.post('/signup', {data: JSON.stringify(data)}, function(response) {
        console.log(response.message)
        $('.loginError').text(response.message)

        if (response.message === "Success"){
            //save the keys here
            localStorage.setItem('loginkey', response.key);
            localStorage.setItem('logintoken', response.token)

            $('.loginError').css("color","#0f0");

            setTimeout(deleteOptions, 1000)
        }
        else{
            $('.loginError').css("color","#f00");
        }
        $('.loginError').css("opacity","1");
        
    });
})


function confirmLogin(_callback){
    keys = [localStorage.getItem('loginkey'), localStorage.getItem('logintoken')]
    $.post('/confirmUser', {keys: JSON.stringify(keys)}, function(response) {
        if(response.message === "Success"){
            FullName = response.name;
            email = response.email;

            
        }
        else{
            console.log("Error");
            FullName = "";
            email = "";
        }
        _callback()

    });
    
}

function logout(){
    FullName = "";
    email = "";
    localStorage.removeItem("loginkey");
    localStorage.removeItem("logintoken");

    let welcome = document.querySelector('.welcome');
    let name = document.querySelector('.name')
    let button = document.querySelector('.logout');

    welcome.style.opacity = 0;
    name.style.opacity = 0;
    button.style.opacity = 0;

    welcome.hidden = true;
    name.hidden = true;
    button.hidden = true;

    console.log("logged out")

    deleteOptions()
}
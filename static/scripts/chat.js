var button = document.getElementById('chat');
var button_active = false;

var chatId = Math.floor(Math.random() * 65535);

var banned_messages = ["", " ", "Moodbot is typing...", "MoodBot is typing..."]

var messages = JSON.parse(sessionStorage.getItem('messages'));
if (messages == null){
    messages = []
}

var chatInfo = JSON.parse(sessionStorage.getItem('chatInfo'));
if (chatInfo == null){
    chatInfo = [false, false] //opened, message being received
}
else if (chatInfo[0]){
    $(".chat").click();
}




function addMessage(text){
    messages.push(text);
    sessionStorage.setItem('messages', JSON.stringify(messages));
}

function toggleChat(){

    button.classList.toggle('active');
    if (button_active){
        button_active=false
        deleteChatUI();


        
    }
    else{
        button_active=true
        createChatUI()

    }

    chatInfo[0] = button_active
    sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));

}

var enlarged = false;

function enlargeChat(){
    var sendButton = document.getElementById('sendMessage');
    var maximize = document.getElementById('maximize')

    if (enlarged){
        enlarged = false;
        

        button.style.removeProperty('width');
        button.style.removeProperty('height');
        button.style.removeProperty('bottom');
        button.style.removeProperty('right');
        button.style.removeProperty('border-radius')
        sendButton.style.width = "10%"

        var sweep = document.getElementById('sweep');
        sweep.style.padding = "50px";

        maximize.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 10L20 4M20 4H15.5M20 4V8.5M4 4L10 10M4 4V8.5M4 4H8.5M14 14L20 20M20 20V15.5M20 20H15.5M10 14L4 20M4 20H8.5M4 20L4 15.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

        
        console.log("Delarged");
    }
    else{
        enlarged = true;
        var sweep = document.getElementById('sweep');
        
        button.style.width = "100%";
        button.style.height = "100%";
        sendButton.style.width = "7%";

        button.style.borderRadius = "0";

        button.style.bottom = "0px";
        button.style.right = "0px";
        sweep.style.padding = "5%";

        maximize.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 10L20 4M14 10H18.5M14 10V5.5M4 4L10 10M10 10V5.5M10 10H5.5M14 14L20 20M14 14V18.5M14 14H18.5M10 14L4 20M10 14H5.5M10 14V18.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
        
        

        console.log("Enlarged");
    }
}


function createChatUI() {
    const initial_msg = "Hello, this is MoodBot, your friendly assistant for Mood Master! 😃 Mood Master is a free website that helps people with mental disorders learn about emotions through a multimodal machine learning model that can classify emotions from videos, images, and text messages. Whether you want to understand your own feelings better, or learn how to empathize with others, Mood Master can help you. Try Mood Master for free today! 🌟"

    var top_bar = document.createElement('div');
    top_bar.id = "chat_top"
    top_bar.style.marginBottom = "2%";
    top_bar.style.color = "white";
    top_bar.style.height = "1.5rem";
    button.appendChild(top_bar);
    
    var status_circle = document.createElement('div');
    status_circle.style.position = "absolute";
    status_circle.style.left = "37%";
    status_circle.style.width = "25px";
    status_circle.style.height = "25px";
    status_circle.style.borderRadius = "25px";
    status_circle.style.backgroundColor = "#3FA95B";
    status_circle.style.top = "1%";

    top_bar.appendChild(status_circle)

    var mood_text = document.createElement('p');
    mood_text.style.position = "absolute";
    mood_text.style.left = "43%";
    mood_text.style.top = "1%";
    mood_text.style.fontSize = "20px";
    mood_text.innerText = "MoodBot";
    mood_text.style.userSelect = "none";

    top_bar.appendChild(mood_text)
    

    var maximize = document.createElement('button')

    //maximize.onclick = enlargeChat(this);

    maximize.style.position = "absolute";
    maximize.style.left = "85%";
    maximize.style.top= "0.5%";
    maximize.id = "maximize"

    maximize.style.width = "31px";
    maximize.style.height = "31px";
    maximize.style.backgroundColor = "transparent";
    maximize.style.backgroundSize = "cover";
    maximize.style.backgroundRepeat = "no-repeat";
    maximize.style.transition = "transform 0.5s ease";

    // maximize.style.backgroundImage = "url('/static/logos/maximize.png')";
    maximize.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 10L20 4M20 4H15.5M20 4V8.5M4 4L10 10M4 4V8.5M4 4H8.5M14 14L20 20M20 20V15.5M20 20H15.5M10 14L4 20M4 20H8.5M4 20L4 15.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'

    maximize.style.border = "none";
    maximize.style.cursor = "pointer"

    maximize.addEventListener('click', function(event) {
        event.stopPropagation();
        enlargeChat();
    });
    

    top_bar.appendChild(maximize);

    var close_button = document.createElement('p')
    close_button.style.position = "absolute";
    close_button.style.left = "92%";
    close_button.style.top = "0%";
    close_button.style.fontSize = "30px";
    close_button.innerText = "✕";
    close_button.style.userSelect = "none";
    close_button.style.cursor = "pointer";
    close_button.style.transition = "transform 0.5s ease";

    close_button.addEventListener('mouseover', function() {
        close_button.style.transform = "scale(1.15)";
    });
    close_button.addEventListener('mouseleave', function() {
        close_button.style.transform = "scale(1)";
    });

    top_bar.appendChild(close_button);



    var chatContainer = document.createElement("div");
    chatContainer.id = "chatContainer";
    chatContainer.style.width = "95%";
    chatContainer.style.height = "90%";
    chatContainer.style.color = "white";
    chatContainer.style.backgroundColor = "#b8cfff";
    chatContainer.style.borderRadius = "5px";
    chatContainer.style.overflow = "auto";
    chatContainer.onclick = stopPropagation;

    chatContainer.style.marginLeft = "2.5%";
    button.appendChild(chatContainer);
    
    var chatContent = document.createElement("div");
    chatContent.id = "chatContent";
    chatContent.style.width = "95%";
    chatContent.style.height = "75%";

    chatContent.style.marginTop = "2%";
    chatContent.style.marginLeft = "2.5%";

    chatContent.style.overflow = "auto";
    chatContainer.appendChild(chatContent);


    //getting the messages
    if (messages.length > 0){
        createBotMessage(initial_msg, false);
        for(i=0; i<messages.length; i++){

            if(i%2==0){
                createUserMessage(messages[i]);
            }
            else{
                createBotMessage(messages[i], false)
            }
        }
    }
    else{
        createBotMessage(initial_msg);
    }

  
    var chatInput = document.createElement("textarea");

    chatInput.style.position = "absolute";

    chatInput.id = "chatInput";
    chatInput.placeholder = "Send a message";
    chatInput.style.border = "none";
    chatInput.type = "submit"
    chatInput.style.borderRadius = "5px";
    chatInput.style.padding = "5px";
    chatInput.style.boxSizing = "border-box";
    chatInput.style.width = "70%";
    chatInput.style.height = "13%";
    chatInput.style.fontSize = "20px";
    chatInput.style.resize = "none";
    chatInput.style.top = "80%";
    chatInput.style.fontFamily = "'Noto Sans', sans-serif";

    chatInput.style.left = "15%";

    chatInput.style.zIndex = "97";

    chatInput.style.transition = "all 1s";

    chatContainer.appendChild(chatInput);

    var sendButton = document.createElement('button')

    sendButton.id = "sendMessage"
    sendButton.style.position = "absolute";
    sendButton.style.backgroundColor = "transparent";
    sendButton.style.width = "10%";
    sendButton.style.height = "13%";

    sendButton.style.left = "86%";
    sendButton.style.top = "80%";

    // sendButton.style.backgroundImage = "url('/static/logos/send.png')";
    sendButton.style.backgroundPosition = "center center";
    sendButton.style.backgroundSize = "100%";
    sendButton.style.backgroundRepeat = "no-repeat";
    sendButton.style.cursor = "pointer"
    sendButton.style.border = "none"

    sendButton.style.transition = "all 0.3s ease"

    var sendButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    sendButtonSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    sendButtonSVG.setAttribute("fill", "none");
    sendButtonSVG.setAttribute("viewBox", "0 0 24 24");
    sendButtonSVG.setAttribute("stroke-width", "1.5");
    sendButtonSVG.setAttribute("stroke", "#6b7280");
    sendButtonSVG.setAttribute("class", "w-8 h-8");
    sendButtonSVG.style.transition = "all 500ms ease";
    sendButtonSVG.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>';

    sendButton.appendChild(sendButtonSVG);

    sendButton.onclick = function(){
        $(this.form).submit()
            if (banned_messages.indexOf($('#chatInput').val()) == -1){
                console.log($('#chatInput').val())
                sendMessage()
            }
    }

    sendButton.onmousedown = function(){ sendButton.style.transform = "scale(0.8)";}

    sendButton.onmouseup = function(){ sendButton.style.removeProperty('transform');}

    chatContainer.appendChild(sendButton)


    sendButton.addEventListener('mouseover', function() {
        sendButtonSVG.setAttribute('stroke', '#4c88ef');
    });
    sendButton.addEventListener('mouseleave', function() {
        sendButtonSVG.setAttribute('stroke', '#6b7280');
    });

    

    

    
    if (chatInfo[1]){
        prev_id = chatId
        console.log("BOOMED")
        $('#chatInput').css('text-align', 'center');
        $('#chatInput').val('MoodBot is typing...');
        $('#chatInput').prop('disabled', true);

        $('#chatInput').addClass('typing-animation');

        $.post('/chat', { message: JSON.stringify(messages) }, function(response) {
            // Handle the bot response here
            var botResponse = response;
            chatInfo[1] = false;
            sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));
    
            if (chatId == prev_id){
                addMessage(botResponse)
                createBotMessage(botResponse);
                audio = new Audio('static/logos/notification.wav');
                audio.play();
            }
            // Enable input and reset attributes
            
            $('#chatInput').val('');
            $('#chatInput').prop('disabled', false);
            $('#chatInput').css('text-align', 'left');
            $('#chatInput').removeClass('typing-animation');
            $('#chatInput').focus();
            
        });
    }


    

    var chatReset = document.createElement("button");

    chatReset.style.position = "absolute";
    chatReset.id = "sweep"

    chatReset.style.width = "10%";
    chatReset.style.height = "14%";
    chatReset.style.top = "80%";
    chatReset.style.left = "0%";
    chatReset.style.backgroundColor = "transparent";
    chatReset.style.backgroundImage = "url('/static/logos/broom.png')";
    chatReset.style.display = "flex";
    chatReset.style.justifyContent = "center";
    chatReset.style.alignItems = "center";
    chatReset.style.backgroundSize = "cover";
    chatReset.style.padding = "50px"
    chatReset.style.border = "none";
    chatReset.style.scale = "0.6"
    chatReset.style.transition = "all 0.5s";
    chatReset.style.objectFit = "cover";
    
    chatReset.style.transform = "rotateZ(-45deg)";

    chatReset.addEventListener("mouseenter", function(){ chatReset.style.transform = "rotateZ(0deg)" });
    chatReset.addEventListener("mouseleave", function(){ chatReset.style.transform = "rotateZ(-45deg)" });

    setInterval(chatFormSubmit(), 500);

    chatReset.onclick = function(){
        
        setTimeout( function(){ chatReset.style.transform = "rotateZ(10deg)" }, 1);
        setTimeout( function(){ chatReset.style.transform = "rotateZ(-55deg)" }, 500);
        setTimeout( function(){ chatReset.style.transform = "rotateZ(10deg)" }, 1100);
        setTimeout( function(){ chatReset.style.transform = "rotateZ(-55deg)" }, 1650);
        setTimeout( function(){ chatReset.style.transform = "rotateZ(-45deg)" }, 2000);

        var msgs = document.getElementsByClassName('msg');
        while (msgs.length > 0) {
            chatContent.removeChild(msgs[0]);
        }
        //delchat
        messages = []
        sessionStorage.setItem('messages', JSON.stringify(messages));

        chatInfo[1] = false;
        sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));

        $('#chatInput').val('');
        $('#chatInput').prop('disabled', false);
        $('#chatInput').css('text-align', 'left');
        $('#chatInput').removeClass('typing-animation');
        $('#chatInput').focus();
        chatId = Math.floor(Math.random() * 65535);
        var audio1 = new Audio('static/logos/sweep.wav');
        audio1.play();

        createBotMessage(initial_msg);
    }

    chatContainer.appendChild(chatReset);


    


    
    
  
}
  
function deleteChatUI() {

    if (enlarged){
        enlarged = false;
        button.style.removeProperty('width');
        button.style.removeProperty('height');
        button.style.removeProperty('bottom');
        button.style.removeProperty('right');
        button.style.removeProperty('border-radius')
    }

    var chatContainer = document.getElementById("chatContainer");
    chatContainer.parentNode.removeChild(chatContainer);


    var top_bar = document.getElementById('chat_top');
    top_bar.parentNode.removeChild(top_bar);

}
  

function stopPropagation(event) {
    event.stopPropagation();
}


function chatFormSubmit(){
    $('#chatInput').focus();
    $('#chatInput').keydown(function(event) {
        if (event.keyCode == 13) {
            $(this.form).submit()
            if (banned_messages.indexOf($('#chatInput').val()) == -1){
                sendMessage()
            }

            return false;
         }});
}

function sendMessage(){
    var prev_id = chatId
    message = $('#chatInput').val();

    chatInfo[1] = true;
    sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));

    $('#chatInput').css('text-align', 'center');
    $('#chatInput').val('MoodBot is typing...');
    $('#chatInput').prop('disabled', true);

    $('#chatInput').addClass('typing-animation');

    var audio = new Audio('static/logos/send.wav');
    audio.play();
    
    addMessage(message)
    createUserMessage(message)

    // Make an AJAX POST request to the Flask route to send the chat message
    // sends all of the messages
    $.post('/chat', { message: JSON.stringify(messages) }, function(response) {
        // Handle the bot response here
        var botResponse = response;
        chatInfo[1] = false;
        sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));

        if (chatId == prev_id){
            addMessage(botResponse)
            createBotMessage(botResponse);
            audio = new Audio('static/logos/notification.wav');
            audio.play();
        }
        // Enable input and reset attributes
        
        $('#chatInput').val('');
        $('#chatInput').prop('disabled', false);
        $('#chatInput').css('text-align', 'left');
        $('#chatInput').removeClass('typing-animation');
        $('#chatInput').focus();
        
    });
}


function createUserMessage(text){
    var usrmessage = document.createElement('div')
    usrmessage.style.position = "relative"
    usrmessage.style.backgroundColor = "#3FA95B";

    usrmessage.style.fontFamily = "'Noto Sans', sans-serif";

    usrmessage.style.width = "75%";
    usrmessage.style.minHeight = "50px";
    usrmessage.style.height = "fit-content";
    usrmessage.style.left = "20%";
    usrmessage.style.marginTop = "2%";

    usrmessage.style.borderRadius = "20px";
    usrmessage.style.padding = "10px";
    usrmessage.style.boxSizing = "border-box";
    

    usrmessage.style.overflow = "hidden";

    usrmessage.innerText = text;

    usrmessage.classList.add('msg');

    chatContent.appendChild(usrmessage);

    chatContent.scrollTop = chatContent.scrollHeight;
}

function createBotMessage(text, effect = true){
    var botmessage = document.createElement('div')
    botmessage.style.position = "relative"
    botmessage.style.backgroundColor = "#4895D8";

    botmessage.style.fontFamily = "'Noto Sans', sans-serif";

    botmessage.style.width = "75%";
    botmessage.style.minHeight = "50px";
    botmessage.style.height = "fit-content";
    botmessage.style.left = "5%";
    botmessage.style.marginTop = "2%";

    botmessage.style.borderRadius = "20px";
    botmessage.style.padding = "10px";
    botmessage.style.boxSizing = "border-box";    

    botmessage.classList.add('msg');

    chatContent.appendChild(botmessage);

    if (effect){
        typewriter(0, 7, text, botmessage);
    }
    else{
        botmessage.innerHTML = formatText(text);
        
    }
    
    
    
    

}

let codeSnippet = `def count_post_arrangements(fence_length):
    arrangements = 0
    for interval in range(1, fence_length + 1):
        if fence_length % interval == 0:
            arrangements += 1
    return arrangements

print(count_post_arrangements(6))  # Output: 4`;

let formattedCode = formatText(codeSnippet);

function formatText(text) {
    let newText = text;

    //preserve exceptions/tabs
    const exceptionPlaceholder = "#EXCEPTION#";
    newText = newText.replace(/A\*/g, exceptionPlaceholder);
  
    // Bold formatting: **text**
    let boldPattern = /\*\*(.*?)\*\*/g;
    newText = newText.replace(boldPattern, "<strong>$1</strong>");
  
    // Italic formatting: *text*
    let italicPattern = /\*(.*?)\*/g;
    newText = newText.replace(italicPattern, function(match, p1) {
        if (p1.length > 0) {
          return "<em>" + p1 + "</em>";
        } else {
          return match;
        }
      });

    // more bold formatting `text`
    let boldPattern2 = /`(.*?)`/g;
    newText = newText.replace(boldPattern2, function(match, p1) {
        if (p1.length > 0) {
          return "<strong>" + p1 + "</strong>";
        } else {
          return match;
        }
      });
  
    // Underline formatting: __text__
    let underlinePattern = /__(.*?)__/g;
    newText = newText.replace(underlinePattern, "<u>$1</u>");
  
    // New line formatting: \n
    let newLinePattern = /\n/g;
    newText = newText.replace(newLinePattern, "<br>");
  
    // Link formatting: [link](URL)
    let linkPattern = /\[(.*?)\]\((.*?)\)/g;
    newText = newText.replace(linkPattern, '<a href="$2" style="color: #F9BE15; text-decoration: none;">$1</a>');

    //tab formatting
    newText = newText.replace(/ {4,}/g, m => '&nbsp;'.repeat(m.length));
  
    // Code formatting: ```code```
    let codePattern = /```(.*?)```/g;
    newText = newText.replace(codePattern, "<div style='background-color: #3572a7;'>$1</div>");
  
    return newText;
  }


function typewriter(i, speed, text, element) {
  if (i < text.length) {
    var character = text.charAt(i);

    element.innerHTML = formatText(element.innerHTML);
    element.insertAdjacentHTML('beforeend', character);
    element.innerHTML = formatText(element.innerHTML);
    i++;

    try{
        chatContent.scrollTop = chatContent.scrollHeight;
    }
    catch{
        
    }

    setTimeout(function () {
      typewriter(i, speed, text, element);
    }, speed);
  }
  else{
    element.innerHTML = formatText(text);
    chatContent.scrollTop = chatContent.scrollHeight;
    
    
  }
}

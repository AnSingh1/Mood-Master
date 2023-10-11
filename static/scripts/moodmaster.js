//version 3: sockets, works well

var webcam_on = false;
const FPS = 10;
const BUFFER_SIZE = 5;


var socket = io.connect('http://' + location.hostname + ':' + location.port);

function stopCamera(opacity){
  if(webcam_on){
    const videoElement = document.getElementById('processed');
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();
    document.getElementById('videobutton').innerText = "Click here to start live detection";
  
    tracks.forEach((track) => track.stop());
    videoElement.srcObject = null;
  
    webcam_on = false;
  
    var loading = document.getElementById('loadbar');
    loading.style.removeProperty('width');
  }

  var live_video = document.getElementById('live_video');
  live_video.style.opacity = `${opacity}`;

  try{
    //socket.disconnect()
  }
  catch(err){
    
  }

      
}

$(".videobutton").click(function(){

    if (webcam_on){

      //stopping the video stream
      stopCamera(1)
    }
    else{

        socket = io.connect('http://' + location.hostname + ':' + location.port);
        

        var vid = document.getElementById('processed');
        vid.controls = false;
        vid.autoplay = true;
        vid.hidden = true;

        var canvas = document.getElementById('canvas')
        canvas.style.backgroundColor = "#fff"

        frames = []
        var playing = false;
        

        
        var img = document.querySelector('.outp')
        img.style.opacity = 1;
        img.style.backgroundImage = "none";

        function displayFrames(){
          const display_img = document.getElementById('live_video');
          

          if(frames.length > BUFFER_SIZE || playing){
            playing = true;

            const frameData = frames.shift()
            if(!frameData){
              return;
            }

            const frame = `data:image/jpeg;base64,${frameData}`
            const load_image = new Image()
            load_image.onload = function(){
              display_img.src = frame
              display_img.style.left = `calc((50% - (${display_img.clientWidth}px / 2))`
            }
            load_image.onerror = function(event){
              console.log(event)
            }
            
            load_image.src = frame
          }
            
          
          if(frames.length == 0){
            playing = false;
          }
        }
          
      

        function handleReceivedFrames(data){
            frames.push(data.frame);
        }

        function sendWebcamFrame(frame){
          socket.emit('webcam_frame', {frame: frame})
        }

        //getting user permissions
        getMedia(function(){
          var loading = document.getElementById('loadbar');
          loading.style.width = "100%";
          webcam_on = true;
          var frame = null;
          document.getElementById('videobutton').innerText = "Click here to stop live detection";
          document.getElementById('live_video').style.zIndex = "0";

          const canvasContext = canvas.getContext("2d")

          function step(){
            
            if(webcam_on){
              canvasContext.drawImage(vid, 0, 0, 640, 480);

              //getting the frame
              frame = canvas.toDataURL('image/jpeg');

              sendWebcamFrame(frame);
              displayFrames();
              setTimeout(step, 1000/FPS)

            }

          }
          requestAnimationFrame(step)
        })
        socket.on('processed_frame', handleReceivedFrames);
    }
    
})



//getting the users webcam
async function getMedia(_callback){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.getElementById('processed');
    videoElement.srcObject = stream;
    const videoTrack = stream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();

    var canvas = document.getElementById('canvas');
    canvas.width = settings.width;
    canvas.height = settings.height;

    var live_video = document.getElementById('live_video');
    live_video.style.opacity = "1"; 

    var file_info = document.getElementById('file-info')
    file_info.innerHTML = `<div id='loadbar'></div>`
    var text = document.createElement('p')
    text.innerText = `Success`
    text.style.color = "#0f0";
    text.style.opacity = "1";
    file_info.appendChild(text);


    
    _callback()
  } catch(err){
    var file_info = document.getElementById('file-info')
    file_info.innerHTML = `<div id='loadbar'></div>`
    var text = document.createElement('p')
    text.innerText = `${err}`
    text.style.color = "red";
    text.style.opacity = "1";
    file_info.appendChild(text);
  }

  
}


// button system


// making the button control the input
$(".uploadbutton").click(function(){
    $(".uploadinp").click();
});

$(".uploadinp").change(function(e) {
    var files = e.target.files;

    handleFiles(files);
});

//drag drop system


['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.getElementById('drop-area').addEventListener(eventName, preventDefaults, false)
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Add visual cues for drag and drop events

area = document.getElementById('drop-area');
effect = document.getElementById('rarea');

['dragenter', 'dragover'].forEach(eventName => {
    area.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    area.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    effect.classList.add('highlight');
}

function unhighlight(e) {
    effect.classList.remove('highlight');
}

// Handle the dropped file
area.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
}

// Display file information
function handleFiles(files) {

    var file = files[0];


    var file_info = document.getElementById('file-info');

    file_info.innerHTML = `<p>File Name: ${file.name}</p> <p>File Size: ${file.size} bytes</p><div id="loadbar"></div>`;

    var img = document.querySelector('.outp')

    img.style.transition = "none"
    img.style.backgroundImage = "none"
    img.style.opacity = "0";

    stopCamera(0)

    var vid = document.getElementById('processed');
    vid.controls = false;
    vid.autoplay = false;
    vid.hidden = true;
    var loading = document.getElementById('loadbar');
    loading.style.removeProperty('width');

    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        cache: false,
        contentType: false,
        success: function(data) {
            
            webcam_on = false;
            if (data.result === "P"){
                img.style.backgroundImage = `url('${data.image_url}')`;

                img.style.transition = "all 3s ease";
                img.style.opacity = "1";
                loading.style.width = '100%';

            }
            else if (data.result === "V")
            {
                vid.src = data.image_url;

                vid.controls = true;
                vid.muted = true;
                vid.autoplay = true;
                vid.hidden = false;
                vid.style.borderRadius = "2.5em";

                img.style.transition = "all 3s ease";
                img.style.opacity = "1";
                loading.style.width = '100%';
                
            }
            else if (data.result === "E"){
                var text = document.createElement('p')
                text.innerText = `An error has occured trying to upload ${file.name}, it is not a video or image file.`
                text.style.color = "red";
                text.style.opacity = "1";
                file_info.appendChild(text);
            }
            else{
                var text = document.createElement('p')
                text.innerText = `Something went wrong trying to upload ${file.name}`
                text.style.color = "red";
                text.style.opacity = "1";
                file_info.appendChild(text);
            } 

        },
        error: function(error) {
            console.error('Error:', error);
        }
    });


}
function del_media(){
    $.ajax({
        url: '/mediareceived',
        type: 'POST',
        success: function() {
        },
        error: function() {
        }
      });
}

//chart
const ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Joy', 'Surprise', 'Neutral', 'Sadness', 'Fear', 'Anger', 'Disgust'],
    datasets: [{
      label: 'Confidence',
      data: [100, 100, 100, 100, 100, 100, 100],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(169, 169, 169, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(0, 153, 255, 0.2)',
        'rgba(255, 99, 132 , 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(169, 169, 169, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(0, 153, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
      borderRadius: 15,
      
    }]
  },
  options: {
    responsive:true,
    maintainAspectRatio: false,
    plugins: {
        legend:{
            display: false,
        },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
        display: false,
        // grid: {display: false},
        ticks: {
            stepSize: 10,
            callback: function(value, index, ticks){
                return value + "%";
            },
        },
        
      },

      x:{
        grid:{
          display: false
        },
        ticks:{
          color: 'black',
          font:{
            size: 20,
            color: 'red',
            family: "system-ui",
          },
        },
      },
    }
  }
});

//text submit
var prev_text = "`"
$('.textinp').keydown(function(event) {
  if (event.keyCode == 13) {
    
    event.preventDefault();
    $(".textsubmit").click();

   }});

$(".textsubmit").click(function(){

  text = $('.textinp').val();

  if(prev_text !== text){
    $.ajax({
      url: '/text',
      type: 'POST',
      data: { text: text },
      success: function(response) {
  
        
        myChart.data.datasets[0].data = response;
        myChart.update()
        prev_text = text;
      },
      error: function() {
        console.log('Failed to update chart');
      }
    });
  }

  
  


})


//previous code

// old video system

// var webcam_on = false;

// $(".videobutton").click(function(){
//     console.log("CLICKED")
//     console.log(webcam_on)

//     var loading = document.getElementById('loadbar');
//     loading.style.removeProperty('width');

//     if (webcam_on){
        
//         $.ajax({
//             url: '/stopcam',
//             type: 'GET',
//             success: function(response) {
//               console.log('Webcam stopped');
//               webcam_on = false;
              
//             },
//             error: function() {
//               console.log('Request failed');
//             }
//         });
//     }
//     else{
        

//         var vid = document.getElementById('processed');
//         vid.controls = false;
//         vid.autoplay = false;
//         vid.hidden = true;

//         var img = document.querySelector('.outp')
//         img.style.opacity = 1;

//         var timestamp = Date.now();
//         img.style.backgroundImage = `url('/webcam?${timestamp}')`;

//         loading.style.width = "100%";        
        
//         webcam_on = true;

//     }
    
// })




//version 2: a bunch of https requests, very laggy
// var webcam_on = false;
// buffer_frames = []
// const BUFFER_SIZE = 100;
// const socket = io.connect('http://' + location.hostname + ':' + location.port);

// $(".videobutton").click(function(){
//     console.log("CLICKED")
//     console.log(webcam_on)

//     var loading = document.getElementById('loadbar');
//     loading.style.removeProperty('width');

//     if (webcam_on){

//       //stopping the video stream
//       const videoElement = document.getElementById('processed');
//       const stream = videoElement.srcObject;
//       const tracks = stream.getTracks();
      
    
//       tracks.forEach((track) => track.stop());
//       videoElement.srcObject = null;

//       webcam_on = false;
//     }
//     else{
        

//         var vid = document.getElementById('processed');
//         vid.controls = false;
//         vid.autoplay = true;
//         vid.hidden = true;

//         var canvas = document.getElementById('canvas')
//         canvas.style.backgroundColor = "#fff"
        

        
//         var img = document.querySelector('.outp')
//         img.style.opacity = 1;

//         //getting user permissions
//         getMedia(function(){
//           loading.style.width = "100%";
//           webcam_on = true;
//           var frame = null;
//           var img = document.getElementById('output')

//           const canvasContext = canvas.getContext("2d")

//           function step(){
            
//             if(webcam_on){
//               canvasContext.drawImage(vid, 0, 0, 640, 480);

//               //getting the frame
//               frame = canvas.toDataURL('image/jpeg');

              
  
//               $.ajax({
//                 type: 'POST',
//                 url: '/newwebcam',
//                 data: JSON.stringify({frame: frame}),
//                 contentType: 'application/json',
  
//                 success: function(response){
//                   console.log(response.message);

//                   img.style.backgroundImage = `url("${response.image}")`
                  
//                   requestAnimationFrame(step)
//                 },
//                 error: function(error){
//                   console.log(error)
//                 },
  
//               })
//             }

            

//           }
//           requestAnimationFrame(step)
//         })
//     }
    
// })
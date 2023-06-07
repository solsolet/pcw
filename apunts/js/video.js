function play(){
    let video = document.querySelector('video');

    video.play();
}
function pausar(){
    let video = document.querySelector('video');

    video.pause();
}

//en el canvas
const video = document.createElement('video');
function playC(){
    //let video = document.querySelector('video');
    //let video = document.createElement('video');

    if(video.src == ''){
        video.src = 'src/mat.mp4';
    }

    video.onplay = function(){
        pintarVideo(video);
    };

    video.play();
}
function pintarVideo(video){
    let cv = document.querySelector('#cv04'),
        ctx = cv.getContext('2d');

    ctx.drawImage(video, 0, 0, cv.width, video.videoHeight*(cv.width/video.videoWidth));

    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.font = '32px Arial';
    ctx.fillText('PCW', 50, 50);

    if(!video.paused){
        requestAnimationFrame(function(){
            pintarVideo(video);
        });
    }
}

function pausarC(){
    //let video = document.querySelector('video');

    video.pause();
}
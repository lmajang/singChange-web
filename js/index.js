const waitTime = 10000;
function triggerFile(event){
    let file = event.target.files[0].webkitRelativePath;
    console.log(file);
}

async function getMedia() {
    const constraints = {audio: true};
    const record = document.getElementById('record');
    const recordPlayer = document.getElementById('recordPlayer');
    const microphone = document.getElementsByClassName('microphone');
    try {
        var promise = navigator.mediaDevices.getUserMedia(constraints);
        var mediaRecord = new MediaRecorder(await promise);
        const chunks = [];
        mediaRecord.ondataavailable = function(event) {
            chunks.push(event.data);
            console.log(chunks);
        };
        mediaRecord.onstop =function (event) {
            var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
            recordPlayer.src = window.URL.createObjectURL(blob);
            recordPlayer.style.display = '';
            console.log(recordPlayer.style.display);
        };
        record.onclick = () => {
            if (mediaRecord.state ==="recording"){
                mediaRecord.stop();
                microphone[0].style.display = '';
                microphone[1].style.display = 'none';
            }
            else{
                getMedia();
            }
        };
        recordPlayer.style.display = 'none';
        microphone[0].style.display = 'none';
        microphone[1].style.display = '';
        mediaRecord.start();
        console.log(mediaRecord.state);
    } catch (err) {
        console.log(err);
        console.error("授权失败！");
    }

}

function waitChangeFinish(event){
    const changeProgressBar = document.getElementById('changeProgressBar');
    const changeAudioPlayer = document.getElementById('changeAudioPlayer');
    const timeProgress = document.getElementById('timeProgress');
    //初始化
    changeAudioPlayer.style.display='none';
    changeProgressBar.style.display='';
    changeProgressBar.children[0].style.width='0%';
    timeProgress.style.display='';
    let processBar = 0;
    var cleanCT;
    event.innerHTML +=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  转换中...`;
    let changePromis = new Promise((resolve, reject)=>{
        setTimeout(function (){
            resolve('111')
            event.innerHTML = `转换`;
            event.disabled = false;
        },waitTime);
        cleanCT = setInterval(function() {
            console.log("0.1s");
            processBar +=100;
            timeProgress.innerText= String(processBar/1000)+'s'+'/'+String(waitTime/1000)+'s';
            changeProgressBar.children[0].style.width=String(processBar/waitTime*100)+'%';
        }, 100);
    })
    changePromis.then((data)=>{
        console.log(data);
        changeProgressBar.style.display='none';
        changeAudioPlayer.style.display='';
        timeProgress.style.display='none'
        clearInterval(cleanCT);
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    const Conversing = document.getElementById('Conversion');
    Conversing.addEventListener('click',()=>{
            Conversing.setAttribute('disabled','true');
            Conversing.innerText = '';
            waitChangeFinish(Conversing);
        }
    );

    // document.getElementById('inputFormFile').addEventListener('change', function(event) {
    //     var file = event.target.files[0];
    //     var audioPlayer = document.getElementById('audioPlayer');
    //
    //     // 清除之前的URL，如果有的话
    //     audioPlayer.src = '';
    //
    //     // 检查是否选择了文件
    //     if (file) {
    //         // 创建一个URL对象，用于读取文件
    //         var fileURL = URL.createObjectURL(file);
    //         audioPlayer.src = fileURL;
    //         // 启用播放
    //         audioPlayer.style.display='';
    //
    //     } else {
    //         // 如果没有选择文件，禁用播放按钮
    //         audioPlayer.style.display='none';
    //     }
    // });

    // document.getElementById('playButton').addEventListener('click', function() {
    //     var audioPlayer = document.getElementById('audioPlayer');
    //     var playButton = document.getElementById('playButton');
    //     if(!isPlaying) {
    //         isPlaying = true;
    //         playButton.textContent='暂停';
    //         audioPlayer.play();
    //     }
    //     else{
    //         isPlaying = false;
    //         playButton.textContent='播放';
    //         audioPlayer.pause();
    //     }
    // });
});



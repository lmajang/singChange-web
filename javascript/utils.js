var btnIsClick = [false];
var conditionStateBtn=[false];
let audioFile;

async function getAudioFile() {
    const pickerOpts={
        types:[
            {
                description:"Audio",
                accept:{
                    "audio/*":[".mpeg", ".wav", ".flac"]
                }
            }
        ]
    };
    const audioFiles = await window.showOpenFilePicker(pickerOpts);
    const audioFile = audioFiles[0];
    const fileData = await audioFile.getFile();
    return fileData;
}

function processMove(event,uploadMusic,audioProgress,audioProgressHead){
    // const uploadModalContent = document.getElementById('uploadModalContent');
    // var updateTime;
    var updateProcess = event.offsetX/audioProgress.offsetWidth*100;

    changeAudioProgress(uploadMusic,updateProcess,audioProgress,audioProgressHead,true);
    // if (event.target === audioProgressHead) {
    //     updateTime = (audioProgressHead.offsetLeft / $('.player .controls .progressBar')[0].offsetWidth) * playStatus.currentTotalTime;
    // } else {
    //     updateTime = (e.offsetX / $('.player .controls .progressBar')[0].offsetWidth) * playStatus.currentTotalTime;
    // }
    // $('#audio')[0].currentTime = updateTime;
}

function changeAudioProgress(uploadMusic,updateProgress,audioProgress,audioProgressHead,isJump){
    audioProgress.children[0].style.width=String(updateProgress)+'%';
    console.log(audioProgress.children[0].style.width);
    audioProgressHead.style.left = String(updateProgress)+'%';
    if(isJump === false) return;
    uploadMusic.currentTime = uploadMusic.duration*updateProgress/100;
}

function changeAudioState(uploadMusic,stateButton,stateBtnIndex){
    if(!conditionStateBtn[stateBtnIndex]){
        conditionStateBtn[stateBtnIndex] = true;
        console.log('start');
        uploadMusic.play();
        stateButton.classList.add("fa-pause");
        stateButton.classList.remove("fa-play");
        // stateButton.children[0].style.display = 'none';
        // stateButton.children[1].style.display = '';
    }else {
        conditionStateBtn[stateBtnIndex] = false;
        console.log('pause');
        uploadMusic.pause();
        stateButton.classList.add("fa-play");
        stateButton.classList.remove("fa-pause");
        // stateButton.children[0].style.display = '';
        // stateButton.children[1].style.display = 'none';
    }
}



function changeLengthAudio(state,uploadMusic,audioProgress,audioProgressHead){
    var progressPercentage = 3;
    var nowProgress = parseInt(audioProgress.children[0].style.width.split('%')[0]);
    console.log(nowProgress);
    if (state !== 'up' && state !== 'down') {
        throw new Error('Invalid state. Must be either "up" or "down".');
    }
    if(state==='up'){
        if(nowProgress+progressPercentage>100){
            nowProgress = 100;
            changeAudioProgress(uploadMusic,nowProgress,audioProgress,audioProgressHead,true);
        }else{
            nowProgress += 3;
            changeAudioProgress(uploadMusic,nowProgress,audioProgress,audioProgressHead,true);
        }
    } else if(state==='down'){
        if(nowProgress-progressPercentage<0){
            nowProgress = 0;
            changeAudioProgress(uploadMusic,nowProgress,audioProgress,audioProgressHead,true);
        }else{
            nowProgress -= 3;
            changeAudioProgress(uploadMusic,nowProgress,audioProgress,audioProgressHead,true);
        }
    }
}

function createAudioProgress(audioProgress,audioProgressHead,stateBtn,fastBtn,backBtn,uploadMusic,index){
    audioProgress[index].addEventListener('mousedown',(event)=>{
        processMove(event,uploadMusic,audioProgress[0],audioProgressHead[0]);
    });
    audioProgressHead[index].addEventListener('mousedown',(event)=>{

        btnIsClick[index]=true;
        console.log('mousedown ',btnIsClick[0]);
    });
    audioProgress[index].addEventListener('mousemove',(event)=>{
        console.log('mousedown ',btnIsClick[0]);
        if (btnIsClick[index]) {
            processMove(event,uploadMusic,audioProgress[index],audioProgressHead[index]);
        }
    });

    stateBtn[index].addEventListener('click',(event)=>{
        changeAudioState(uploadMusic,stateBtn[index],index);
    });

    fastBtn[index].addEventListener('click',(event)=>{
        changeLengthAudio('up',uploadMusic,audioProgress[0],audioProgressHead[0]);
    });
    backBtn[index].addEventListener('click',(event)=>{
        changeLengthAudio('down',uploadMusic,audioProgress[0],audioProgressHead[0]);
    });
}

function formatSeconds(seconds) {
    if(!seconds) return "00:00";
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    var formattedMinutes = minutes.toString().padStart(2, '0'); // 保证分钟数为两位数
    var formattedSeconds = remainingSeconds.toString().split('.')[0].padStart(2, '0'); // 保证秒数为两位数
    return formattedMinutes + ":" + formattedSeconds;
}

//record 录音按钮 recordPlayer 录音文件 microphone图标
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
            getAudioFile = true;
            let nowDate = String(Date.now());
            const blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
            let formData = new FormData();
            formData.append('file',blob,'record-'+nowDate+'.mp3');
            fetch('/uploadRecord', {
                method: "POST",
                body: formData
            }).then(response => {
                if(!response.ok){
                    throw new Error('error');
                }
            })
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
//声音转换进度条
function waitChangeFinish(event){
    const changeProgressBar = document.getElementById('changeProgressBar');
    const changeAudioPlayer = document.getElementById('changeAudioPlayer');
    const timeProgress = document.getElementById('timeProgress');
    //初始化
    changeAudioPlayer.style.display='none';
    changeProgressBar.style.display='';
    changeProgressBar.children[0].style.width='0%';

    let processBar = 0;
    let oneWaitTime =100;
    let allWaitTime = 0;
    var cleanCT;
    event.innerHTML +=` <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  转换中...`;
    let changePromis = new Promise((resolve, reject)=>{
        //发送转换请求
        fetch('/sendAudioFile', {"method": "POST"}).then(response => {
            if(!response.ok){
                throw new Error('error');
            }else{
                processBar = 100;
                clearInterval(cleanCT);
                changeProgressBar.children[0].style.width=String(processBar)+'%';
                return response.blob();
            }
        }).then(blob =>{
            const audioUrl = URL.createObjectURL(blob);
            console.log(audioUrl);
            changeAudioPlayer.src= audioUrl;
            resolve('111')
            event.innerHTML = `转换`;
            event.disabled = false;
        })

        cleanCT = setInterval(function() {
            console.log("0.1s");
            processBar +=1;
            allWaitTime += (oneWaitTime/1000);
            timeProgress.innerText= String(allWaitTime.toFixed(1))+'s';
            if(processBar >99) processBar = 99;
            changeProgressBar.children[0].style.width=String(processBar)+'%';
        }, oneWaitTime);
    })
    changePromis.then((data)=>{
        console.log(data);
        changeProgressBar.style.display='none';
        changeAudioPlayer.style.display='';
    })
}
//发送音频和歌曲
function sendAudioFile(audioFile,recordFile){
    let formData = new FormData();
    formData.append('audioFile',audioFile,audioFile.filename);
    formData.append('recordFile',recordFile,recordFile.filename);
    fetch('/uploadRecord',{
        method:'POST',
        body: formData
    }).then(response => {
        if(!response.ok){
            throw new Error('error');
        }
    })
}


document.addEventListener('DOMContentLoaded',(event) =>{
    // const uploadModal = new bootstrap.Modal(document.getElementById('uploadModal'));
    // const uploadModalPage = document.getElementById('uploadModal');
    // const recordModal = new bootstrap.Modal(document.getElementById('recordModal'));
    // const recordModalPage = document.getElementById('recordModal');
    const uploadButton = document.getElementsByClassName('uploadButton');
    const recordButton = document.getElementById('recordButton');
    const audioProgress = document.getElementsByClassName('audioProgress');
    const audioProgressHead = document.getElementsByClassName('audioProgressHead');
    const backBtn = document.getElementsByClassName('prev-btn');
    const fastBtn = document.getElementsByClassName('next-btn');
    const stateBtn = document.getElementsByClassName('play-btn');
    const uploadMusic = document.getElementById('uploadMusic');
    const uploadMusicTime = document.getElementById('uploadMusicTime');
    const uploadCard = document.getElementById('uploadCard');

    createAudioProgress(audioProgress,audioProgressHead,stateBtn,fastBtn,backBtn,uploadMusic,0);

    document.addEventListener('mouseup',(event)=>{
        btnIsClick[0]=false;
    });

    uploadButton[0].addEventListener('click',async () => {
        console.log('upload');
        audioFile = await getAudioFile();
        if(audioFile){
            const timeline = gsap.timeline({
                onComplete: () => {
                    console.log('目标歌曲上传完成！');
                },
                defaults: {
                    ease: 'power4.inOut',
                },
            });

            timeline.fromTo('.container-uploadANDrecord-right', {
                left: '5%',
                opacity: 1,
            }, {
                opacity: 0,
                left: '100%',
                stagger: .03,
                duration: 2.5,
                delay: -.6,
            }, 0),

                timeline.fromTo('.player-right', {
                    left: '100%',
                    opacity: 0,
                }, {
                    opacity: 1,
                    left: '10%',
                    stagger: .03,
                    duration: 2.5,
                    delay: 1.5,
                }, 0),
                timeline.play();
        }
        var fileURL = URL.createObjectURL(audioFile);
        uploadMusic.volume = '0.3';
        changeAudioProgress(uploadMusic,0,audioProgress[0],audioProgressHead[0],false)
        uploadMusic.src = fileURL;

    });


    uploadMusic.addEventListener('timeupdate',()=>{
        var processPercent= uploadMusic.currentTime/uploadMusic.duration*100;
        changeAudioProgress(uploadMusic,processPercent,audioProgress[0],audioProgressHead[0],false);
        uploadMusicTime.innerText = formatSeconds(uploadMusic.currentTime)+'/'+formatSeconds(uploadMusic.duration);
        if(uploadMusic.currentTime === uploadMusic.duration){
            uploadMusic.pause();
            conditionStateBtn[0] = false;
            stateBtn[0].children[0].style.display = '';
            stateBtn[0].children[1].style.display = 'none';
        }
    })
});
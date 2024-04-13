var btnIsClick = [false, false];
var conditionStateBtn=[false, false];
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
    });
    audioProgress[index].addEventListener('mousemove',(event)=>{
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
async function getMedia(mediaRecord) {
    const downloadLink = document.getElementsByClassName('download-link');
    const record = document.getElementById('record');
    const recordPlayer = document.getElementsByClassName('recordPlayer')[0];
    const microphone = document.getElementsByClassName('microphone');
    try {

        const chunks = [];
        mediaRecord.ondataavailable = function(event) {
            chunks.push(event.data);
            console.log(chunks);
        };
        mediaRecord.onstop =function (event) {
            console.log(mediaRecord.state);
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
            downloadLink[0].href = recordPlayer.src;
            downloadLink[0].download = formData.get('file').name;

        };
        if (mediaRecord.state ==="recording"){
                microphone[0].style.display = '';
                microphone[1].style.display = 'none';
                console.log('222222222222222222');
                mediaRecord.stop();
                return true;
        }
        else{
                recordPlayer.style.display = 'none';
                microphone[0].style.display = 'none';
                microphone[1].style.display = '';
                mediaRecord.start();
                console.log(mediaRecord.state);
                return false;
            }

    } catch (err) {
        console.log(err);
        console.error("授权失败！");
    }

}
//声音转换进度条
function waitChangeFinish(event){
    // const conversion = document.getElementById('Conversion');
    const progressBar = document.getElementById('changeProgressBar').children[0];
    const computedStyle = document.getComputedStyle(progressBar)
    const changeAudioPlayer = document.getElementById('changeAudioPlayer');
    // const timeProgress = document.getElementById('timeProgress');
    //初始化
    changeAudioPlayer.style.display='none';
    // changeProgressBar.style.display='';
    // changeProgressBar.children[0].style.width='0%';

    let oneWaitTime =100;
    let allWaitTime = 0;
    var cleanCT;

    let changePromis = new Promise((resolve, reject)=>{
        //发送转换请求
        fetch('/sendAudioFile', {"method": "POST"}).then(response => {
            if(!response.ok){
                throw new Error('error');
            }else{

                clearInterval(cleanCT);
                let width = 100;
                progressBar.style.setProperty('--width', width);
                return response.blob();
            }
        }).then(blob =>{
            const audioUrl = URL.createObjectURL(blob);
            console.log(audioUrl);
            changeAudioPlayer.src= audioUrl;
            resolve('111')

        })

        cleanCT = setInterval(function() {
            console.log("0.1s");
            allWaitTime += (oneWaitTime/1000);
            // timeProgress.innerText= String(allWaitTime.toFixed(1))+'s';
            let width = parseFloat(computedStyle.getPropertyValue('--width'))
            if( width + 1 > 99) width = 99;
            progressBar.style.setProperty('--width', width + 1)

        }, oneWaitTime);
    })
    changePromis.then((data)=>{
        console.log(data);
        changeProgressBar.style.display='none';
        changeAudioPlayer.style.display='';
    })
}
//发送音频和歌曲
function sendAudioFile(voiceCh,audioFile){
    let formData = new FormData();
    formData.append('audioFile',audioFile,audioFile.filename);
    formData.append('voiceCh',voiceCh);
    fetch('/uploadRecord',{
        method:'POST',
        body: formData
    }).then(response => {
        if(!response.ok){
            throw new Error('error');
        }
    })
}

function animalplay(){
    if (true) {
        // 获取选定的文件
        // var file = uploadInput.files[0];

        // console.log('Selected file:', file.name);
        // console.log('File size:', file.size);

        alert('File uploaded successfully!');

        const timeline = gsap.timeline({
            onComplete: () => {
                console.log('用户音色上传完成！');
            },
            defaults: {
                ease: 'power4.inOut',
            },
        });

        timeline.fromTo('.container-uploadANDrecord-left', {
            left: 0,
            opacity: 1,
        }, {
            opacity: 0,
            left: '-100%',
            stagger: .03,
            duration: 2.5,
            delay: -.6,
        }, 0),

            timeline.fromTo('.player-left', {
                left: '-100%',
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

    if (true) {
        // 获取选定的文件
        // var file = recordInput.files[0];

        // console.log('Selected file:', file.name);
        // console.log('File size:', file.size);

        alert('File uploaded successfully!');

        const timeline = gsap.timeline({
            onComplete: () => {
                console.log('用户音色上传完成！');
            },
            defaults: {
                ease: 'power4.inOut',
            },
        });

        timeline.fromTo('.container-uploadANDrecord-left', {
            left: 0,
            opacity: 1,
        }, {
            opacity: 0,
            left: '-100%',
            stagger: .03,
            duration: 2.5,
            delay: -.6,
        }, 0),

            timeline.fromTo('.player-left', {
                left: '-100%',
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

    const timeline = gsap.timeline({
        onComplete: () => {
            console.log('用户音色上传完成！');
        },
        defaults: {
            ease: 'none',
        },
    });
    timeline.fromTo('#upload', {
        width:'20%',
    }, {
        width:'33%',
        stagger: .03,
        duration: 0.7,
        delay: 0,
    }, 0),

        timeline.fromTo('#record', {
            width:'20%',
        }, {
            width:'33%',
            stagger: .03,
            duration: 0.7,
            delay: 0,
        }, 0),

        timeline.fromTo('#select', {
            width:'60%',
        }, {
            width:'33%',
            stagger: .03,
            duration: 0.7,
            delay: 0,
        }, 0),

        timeline.fromTo('.container-uploadANDrecord-left', {
            y: '0%',
            opacity: 1,
            ease: 'power4.inOut',
        }, {
            y: '100%',
            opacity: 0,
            stagger: .03,
            duration: 2.5,
            delay: 1.5,
            ease: 'power4.inOut',
        }, 0),

        timeline.fromTo('.list', {
            y: '0%',
            opacity: 0,
            ease: 'power4.inOut',
        }, {
            y: '-250%',
            opacity: 1,
            stagger: .03,
            duration: 2.5,
            delay: 4,
            ease: 'power4.inOut',
        }, 0),

        timeline.play();

    if (true) {
        // 获取选定的文件
        var file = songInput.files[0];

        console.log('Selected file:', file.name);
        console.log('File size:', file.size);

        alert('File uploaded successfully!');

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
}


document.addEventListener('DOMContentLoaded',async (event) => {
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
    const uploadMusic = document.getElementsByClassName('uploadMusic')[0];
    const uploadMusicTime = document.getElementById('uploadMusicTime');
    const changedMusicTime = document.getElementById('changedMusicTime');
    const recordBtn = document.getElementById('record');
    const changeAudioPlayer = document.getElementById('changeAudioPlayer');
    const upload = document.getElementById('upload');
    const downloadLink = document.getElementsByClassName('download-link');


    var promise = navigator.mediaDevices.getUserMedia({audio: true});
    var mediaRecord = new MediaRecorder(await promise);

    createAudioProgress(audioProgress, audioProgressHead, stateBtn, fastBtn, backBtn, uploadMusic, 0);
    createAudioProgress(audioProgress, audioProgressHead, stateBtn, fastBtn, backBtn, changeAudioPlayer, 1);

    document.addEventListener('mouseup', (event) => {
        btnIsClick[0] = false;
    });

    uploadButton[0].addEventListener('click', async () => {
        audioFile = await getAudioFile();
        if (audioFile) {
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
        changeAudioProgress(uploadMusic, 0, audioProgress[0], audioProgressHead[0], false)
        uploadMusic.src = fileURL;
        downloadLink[0].href = fileURL;
        downloadLink[0].download = audioFile.name;
    });

    uploadButton[1].addEventListener('click', async () => {
        console.log('upload');
        audioFile = await getAudioFile();
        if (audioFile) {
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
        changeAudioProgress(uploadMusic, 0, audioProgress[0], audioProgressHead[0], false)
        uploadMusic.src = fileURL;
        changeAudioPlayer.src = fileURL;
        // ---------------TEST
        downloadLink[0].href = fileURL;
        downloadLink[0].download = audioFile.name;
        downloadLink[1].href = fileURL;
        downloadLink[1].download = audioFile.name;
        changedMusicTime.innerText = formatSeconds(changeAudioPlayer.currentTime) + '/' + formatSeconds(changeAudioPlayer.duration);
    });

    upload.addEventListener('click', async () => {
        audioFile = await getAudioFile();
        if (audioFile) {
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
        changeAudioProgress(uploadMusic, 0, audioProgress[0], audioProgressHead[0], false)
        uploadMusic.src = fileURL;
        downloadLink[0].href = fileURL;
        downloadLink[0].download = audioFile.name;
    });


    recordBtn.addEventListener('click', async () => {
        console.log('click');
        const isGetRecord = getMedia(mediaRecord).then(result => {
            console.log(result)
            if(result){
                console.log(uploadMusic.duration)
                uploadMusicTime.innerText = formatSeconds(uploadMusic.currentTime) + '/' + formatSeconds(uploadMusic.duration);

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
        });
    })

    uploadMusic.addEventListener('timeupdate', () => {
        var processPercent = uploadMusic.currentTime / uploadMusic.duration * 100;
        changeAudioProgress(uploadMusic, processPercent, audioProgress[0], audioProgressHead[0], false);
        uploadMusicTime.innerText = formatSeconds(uploadMusic.currentTime) + '/' + formatSeconds(uploadMusic.duration);
        if (uploadMusic.currentTime === uploadMusic.duration) {
            uploadMusic.pause();

            changeAudioState(uploadMusic,stateBtn[0],0);
        }
    })

    changeAudioPlayer.addEventListener('timeupdate', () => {
        var processPercent = changeAudioPlayer.currentTime / changeAudioPlayer.duration * 100;
        changeAudioProgress(changeAudioPlayer, processPercent, audioProgress[1], audioProgressHead[1], false);
        changedMusicTime.innerText = formatSeconds(changeAudioPlayer.currentTime) + '/' + formatSeconds(changeAudioPlayer.duration);
        if (changeAudioPlayer.currentTime === changeAudioPlayer.duration) {
            changeAudioPlayer.pause();
            changeAudioState(uploadMusic,stateBtn[1],1);
        }
    })
});
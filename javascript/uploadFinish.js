document.addEventListener("DOMContentLoaded", function() {
    // 获取上传模块的元素
    var uploadModule_l = document.querySelector('.uploadModule-left');
    var recordModule_l = document.querySelector('.recordModule-left');

    var uploadModule_r = document.querySelector('.uploadModule-right');
    var recordModule_r = document.querySelector('.recordModule-right');

    // 获取上传文件的 input 元素
    var uploadInput = document.getElementById('upload-userVoice');
    var recordInput = document.getElementById('record-userVoice');

    var songInput = document.getElementById('upload-targetSong');
    var selectInput = document.getElementById('select-storedSongs');

    // 监听上传文件的 change 事件
    uploadInput.addEventListener('change', function() {
        console.log('changed')
        // 检查是否有选定文件
        if (uploadInput.files.length > 0) {
            // 获取选定的文件
            var file = uploadInput.files[0];

            console.log('Selected file:', file.name);
            console.log('File size:', file.size);

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
    });

    recordInput.addEventListener('change', function() {
        console.log('changed')
        // 检查是否有选定文件
        if (recordInput.files.length > 0) {
            // 获取选定的文件
            var file = recordInput.files[0];

            console.log('Selected file:', file.name);
            console.log('File size:', file.size);

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
    });

    songInput.addEventListener('change', function() {
        console.log('changed')
        // 检查是否有选定文件
        if (songInput.files.length > 0) {
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
    });

    selectInput.addEventListener('change', function() {
        console.log('changed')
        // 检查是否有选定文件
        if (selectInput.files.length > 0) {
            // 获取选定的文件
            var file = selectInput.files[0];

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
    });

    // // 监听上传模块的点击事件
    // uploadModule_l.addEventListener('click', function() {
    //     // 模拟点击上传文件的 input 元素，触发文件选择对话框
    //     uploadInput.click();
    // });

    // recordModule_l.addEventListener('click', function() {
    //     // 模拟点击上传文件的 input 元素，触发文件选择对话框
    //     recordInput.click();
    // });

    // uploadModule_r.addEventListener('click', function() {
    //     // 模拟点击上传文件的 input 元素，触发文件选择对话框
    //     songInput.click();
    // });

    // recordModule_r.addEventListener('click', function() {
    //     // 模拟点击上传文件的 input 元素，触发文件选择对话框
    //     selectInput.click();
    // });
});

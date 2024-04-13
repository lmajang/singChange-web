
//upload动画
function uploadAnimation(){
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



document.addEventListener("DOMContentLoaded", function() {
  
    var uploadModule_l = document.querySelector('.uploadModule-left');
    var recordModule_l = document.querySelector('.recordModule-left');

    var uploadModule_r = document.querySelector('.uploadModule-right');
    var recordModule_r = document.querySelector('.recordModule-right');


    var uploadInput = document.getElementById('upload');
    var recordInput = document.getElementById('record');
    var selectSinger = document.getElementById('select');

    var songInput = document.getElementById('upload-targetSong');
    var selectSong = document.getElementById('select-storedSongs');

   
    // uploadInput.addEventListener('click', function() {
    //     console.log('changed')
    //     // 检查是否有选定文件
    //     if (true) {
    //         // 获取选定的文件
    //         // var file = uploadInput.files[0];
    //
    //         // console.log('Selected file:', file.name);
    //         // console.log('File size:', file.size);
    //
    //         alert('File uploaded successfully!');
    //
    //         const timeline = gsap.timeline({
    //             onComplete: () => {
    //               console.log('用户音色上传完成！');
    //             },
    //             defaults: {
    //               ease: 'power4.inOut',
    //             },
    //           });
    //
    //           timeline.fromTo('.container-uploadANDrecord-left', {
    //             left: 0,
    //             opacity: 1,
    //           }, {
    //             opacity: 0,
    //             left: '-100%',
    //             stagger: .03,
    //             duration: 2.5,
    //             delay: -.6,
    //           }, 0),
    //
    //           timeline.fromTo('.player-left', {
    //             left: '-100%',
    //             opacity: 0,
    //           }, {
    //             opacity: 1,
    //             left: '10%',
    //             stagger: .03,
    //             duration: 2.5,
    //             delay: 1.5,
    //           }, 0),
    //
    //           timeline.play();
    //     }
    // });

    // recordInput.addEventListener('click', function() {
    //     console.log('changed')
    //     // 检查是否有选定文件
    //     // recordInput.files.length > 0
    //     if (true) {
    //         // 获取选定的文件
    //         // var file = recordInput.files[0];
    //
    //         // console.log('Selected file:', file.name);
    //         // console.log('File size:', file.size);
    //
    //         alert('File uploaded successfully!');
    //
    //         const timeline = gsap.timeline({
    //             onComplete: () => {
    //               console.log('用户音色上传完成！');
    //             },
    //             defaults: {
    //               ease: 'power4.inOut',
    //             },
    //           });
    //
    //           timeline.fromTo('.container-uploadANDrecord-left', {
    //             left: 0,
    //             opacity: 1,
    //           }, {
    //             opacity: 0,
    //             left: '-100%',
    //             stagger: .03,
    //             duration: 2.5,
    //             delay: -.6,
    //           }, 0),
    //
    //           timeline.fromTo('.player-left', {
    //             left: '-100%',
    //             opacity: 0,
    //           }, {
    //             opacity: 1,
    //             left: '10%',
    //             stagger: .03,
    //             duration: 2.5,
    //             delay: 1.5,
    //           }, 0),
    //
    //           timeline.play();
    //     }
    // });

    selectSinger.addEventListener('click',function(){
      var brand = document.getElementById('brand_select');
      const t = document.querySelector('.hover-accordion');

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


    // selectSong.addEventListener('click', function() {
    //     // 检查是否有选定文件
    //     if (true) {
    //         // // 获取选定的文件
    //         // var file = selectInput.files[0];
    //
    //         // console.log('Selected file:', file.name);
    //         // console.log('File size:', file.size);
    //
    //         // alert('File uploaded successfully!');
    //
    //         const timeline = gsap.timeline({
    //             onComplete: () => {
    //               console.log('目标歌曲上传完成！');
    //             },
    //             defaults: {
    //               ease: 'power4.inOut',
    //             },
    //           });
    //
    //           timeline.fromTo('.container-uploadANDrecord-right', {
    //             left: '5%',
    //             opacity: 1,
    //           }, {
    //             opacity: 0,
    //             left: '100%',
    //             stagger: .03,
    //             duration: 2.5,
    //             delay: -.6,
    //           }, 0),
    //
    //           timeline.fromTo('.player-right', {
    //             left: '100%',
    //             opacity: 0,
    //           }, {
    //             opacity: 1,
    //             left: '10%',
    //             stagger: .03,
    //             duration: 2.5,
    //             delay: 1.5,
    //           }, 0),
    //
    //           timeline.play();
    //     }
    // });

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

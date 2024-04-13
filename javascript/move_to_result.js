var card = document.querySelector('.card');
var ConverionButton_Container = document.querySelector('.ConverionButton-Container');
var rotateButton = document.getElementById('rotateButton');
var isRotated = false;
const timeline = gsap.timeline({
    paused: true,
    onComplete: () => {
        console.log('切换至转换结果页面');
    },
    defaults: {
        ease: 'power4.inOut',
    },
});
timeline.set(ConverionButton_Container,{
    display:"block",
}),
timeline.to(ConverionButton_Container, {
    opacity: 0,
    duration: 2,
    delay: -.6,
}, 0),
// timeline.fromTo(ConverionButton_Container, {
//     x: '0',
//     y: '0',
// },{
//     x: '-15%',
//     y: '-20%',
//     delay: 0,
//     duration: 2,
// },0)
timeline.to(ConverionButton_Container, {
    top: '20%',
    left: '10%',
    delay: 1,
    duration: 2,
}, 0);

timeline.to(card, {
    rotationY: 180,
    delay: 0.5,
});
timeline.fromTo('.bar-container-c', {
        opacity: 0,
    }, {
        opacity: 1,
        stagger: .03,
        duration: 2.5,
        delay: 5,
    }, 0),
    timeline.to(ConverionButton_Container, {
        opacity: 1,
        duration: 0.8,
        delay: 5,
    }, 0)


const timelineR = gsap.timeline({
    paused: true,
    onComplete: () => {
        console.log('切换工作面板页面');
    },
    defaults: {
        ease: 'power4.inOut',
    },
});
timeline.set(ConverionButton_Container,{
    display:"none",
}),
timelineR.to(ConverionButton_Container, {
    opacity: 0,
    duration: 2,
    delay: -.6,
}, 0)
timelineR.to(ConverionButton_Container, {
    left: '42.5%',
    top: '40%',
    delay: 2,
    duration: 1,
}, 0)
timelineR.to(card, {
    rotationY: 0,
    delay: 0.5,
});

timelineR.to('.bar-container-c', {
        opacity: 0,
        duration: 2.5,
        delay: 4,
    }, 0),

    timelineR.to(ConverionButton_Container, {
        opacity: 1,
        duration: 0.8,
        delay: 6,
    }, 0),
    timeline.set(ConverionButton_Container,{
        display:"block",
    }),

// timeline.to(ConverionButton_Container, {
//         opacity: 1,
//         duration: 0.8,
//         delay: 2,
// }, 0)

rotateButton.addEventListener('click', function () {
    isRotated = !isRotated;
    if (isRotated) {
        // gsap.to(card, {
        //     rotationY: 180
        // });
        timeline.play();
    } else {
        // gsap.to(card, {
        //     rotationY: 0
        // });
        timelineR.play();
    }
});
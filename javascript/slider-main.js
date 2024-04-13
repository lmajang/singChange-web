document.addEventListener("DOMContentLoaded", function () {
  // 导入音乐文件并创建 <audio> 元素
  const audios = [
    new Audio('./assets/DonaldTrump.mp3'),
    new Audio('./assets/TaylorSwift.mp3'),
    new Audio('./assets/JustinBieber.mp3'),
    new Audio('./assets/AdeleAdkins.mp3'),
  ];

  audios.forEach((audio) => {
    audio.muted = true;
  })

  // 播放音乐函数
  function playAudio(audio) {
    audio.paused = false;
    audio.muted = false;
    audio.play()
  }

  // 停止音乐函数
  function stopAudio(audio) {
    audio.pause();
    audio.paused = true;
    audio.currentTime = 0;
  }

  gsap.registerPlugin(ScrollTrigger);
  window.addEventListener("load", function () {
    const slides = gsap.utils.toArray(".slide");
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    function getInitialTranslateZ(slide) {
      const style = window.getComputedStyle(slide);
      const matrix = style.transform.match(/matrix3d\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(", ");
        return parseFloat(values[14]) || 0;
      }
      return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide, index) => {
      const initialZ = getInitialTranslateZ(slide);
      const audio = audios[index];
      const nextAudio = audios[index - 1];
      if (index != 0) {
        const nextAudio = audios[index - 1];
      } else {
        const nextAudio = audio;
      }
      ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 22500;
          const currentZ = initialZ + zIncrement;

          let opacity;

          if (currentZ >= -2500) {
            opacity = mapRange(currentZ, -2500, 0, 0.1, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0, 0.07);
          }

          if (currentZ >= -1000 && currentZ < 1000) {
            playAudio(audio);
          }
          if (currentZ >= 1000 || currentZ <= -1000) {
            stopAudio(audio);
          }
          console.log(index + 1);
          slide.style.opacity = opacity;
          if ((index + 1) % 2 == 0) {
            slide.style.transform = `translateX(-20%) translateY(-50%) translateZ(${currentZ}px)`;
          } else {
            slide.style.transform = `translateX(60%) translateY(-50%) translateZ(${currentZ}px)`;
          }

          if (currentZ < 100) {
            gsap.to(activeSlideImages[index], 1.5, {
              opacity: 1,
              ease: "power3.out",
            });
          } else {
            gsap.to(activeSlideImages[index], 1.5, {
              opacity: 0,
              ease: "power3.out",
            });
          }
        },
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".l__menu");
  let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
  let isOpen = false;

  gsap.set(".menu-item p", {
    y: 225
  })

  const masterTimeline = gsap.timeline({
    paused: true
  });

  const reverseDuration = 1.2; // 反转动画的总持续时间

  masterTimeline.to('.slider', {
    opacity: 0,
    stagger: .03,
    duration: 1,
    delay: 0.2,
  }, 0);

  masterTimeline.to(".overlay", {
    duration: 1.5,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power4.inOut",
    delay: 1
  }, 0);

  masterTimeline.to(".menu-item p", {
    duration: 1.5,
    y: 0,
    stagger: 0.2,
    delay: 1.7,
    ease: "power4.out"
  }, 0);

  masterTimeline.to(activeItemIndicator, {
    width: "100%",
    duration: 1,
    ease: "power4.out",
    delay: 0.7
  }, "<");


  toggleButton.addEventListener("click", function () {
    if (isOpen) {
      masterTimeline.reverse();
    } else {
      masterTimeline.play();
    }
    isOpen = !isOpen;
  });
});
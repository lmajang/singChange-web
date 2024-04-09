document.addEventListener("DOMContentLoaded", function () {
  let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
  const toggleButton = document.querySelector(".l__menu");
  const toggleButton2 = document.querySelector(".menu-close");
  const toggleButton3 = document.querySelector(".menu-close-icon");
  const marquee = document.querySelector(".marquee");
  const hero_copy = document.querySelector(".hero-copy");
  const sonw_girl = document.querySelector("dotlottie-player")
  let isOpen = false;

  gsap.set(".menu-item p", {
    y: 225
  })

  const masterTimeline = gsap.timeline({ paused: true });

  // 反转动画部分
  masterTimeline.to('dotlottie-player', {
    opacity: 0,
    stagger: .03,
    duration: 1,
    delay: 0.2,
  }, 0);

  masterTimeline.to('.hero-copy', {
    opacity: 0,
    stagger: .03,
    duration: 1,
    delay: 0.2,
  }, 0);
  
  masterTimeline.fromTo('.marquee', {
    opacity: 1,
  }, {
    opacity: 0,
    duration: 1,
    delay: 0.2,
  }, 0);
  
  masterTimeline.fromTo('.marquee--item', {
    top: 0,
    opacity: 1,
  }, {
    top: '4rem',
    opacity: 0,
    stagger: .03,
    duration: 1,
    delay: 0.2,
  }, 0);
  
  masterTimeline.to('.home__marquee', {
    opacity: 0,
  }, 0);
  
  masterTimeline.to('.marquee', {
    opacity: .2,
    duration: 1.6,
    ease: 'Expo.outIn',
  });
  
  masterTimeline.to('.marquee', {
    opacity: 0,
    duration: .6,
    ease: 'Expo.inOut',
  });


  
  // 菜单动画部分，使用反转动画的总持续时间作为延迟
const reverseDuration = 1.2; // 反转动画的总持续时间
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
},0);

masterTimeline.to(activeItemIndicator, {
  width: "100%",
  duration: 1,
  ease: "power4.out",
  delay: 0.7
}, "<");

masterTimeline.to(".sub-nav", {
  bottom: "10%",
  opacity: 1,
  duration: 0.5,
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
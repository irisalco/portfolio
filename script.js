// 1. 初始化 Lenis 慣性滾動 (Block Studio 愛用技術)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical', 
    gestureDirection: 'vertical', 
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 將 Lenis 與 GSAP ScrollTrigger 同步
gsap.registerPlugin(ScrollTrigger);

// 2. 首頁 Hero 文字進場動畫
gsap.from(".hero-title", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.2
});

gsap.from(".hero-subtitle p", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    delay: 0.8
});

// 3. 作品列表滾動視差與揭露動畫
const projects = document.querySelectorAll(".project-item");

projects.forEach(project => {
    const img = project.querySelector("img");
    const info = project.querySelector(".project-info");

    // 圖片內部視差 (Image Parallax)
    gsap.to(img, {
        y: "15%", 
        ease: "none",
        scrollTrigger: {
            trigger: project,
            start: "top bottom", 
            end: "bottom top",
            scrub: true 
        }
    });

    // 資訊欄位淡入上浮
    gsap.from(info, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: project,
            start: "top 80%", 
            toggleActions: "play none none reverse"
        }
    });
});

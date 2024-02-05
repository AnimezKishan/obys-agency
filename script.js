const tl = gsap.timeline();
const timer = document.querySelector(".timer h5 ");
const body = document.querySelector("body");
const main = document.querySelector(".main")
const videoContainer = document.querySelector(".video-wrapper");
const video = document.querySelector(".page2 .video-wrapper video");
let isPaused = true;
let isMenuOpen = false;

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
});

function locomotiveSupport(){
    gsap.registerPlugin(ScrollTrigger);

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}

function loaderAnimation(){

    function timerFunction(){
        let a = 0;
        const t = setInterval(()=>{
            a++;
            if(a < 10){
                timer.textContent = `0${a}`;
            }
            else
                timer.textContent = a;

            if(a >= 100){
                clearInterval(t);

                tl.to(".text h2", {
                    opacity: 0,
                    animation: "none",
                    delay: .5,
                    duration: .6
                });

                tl.to(".loader .disclaimer, .text", {
                    opacity: 0,
                    duration: .6
                })

                tl.to(".loader", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    display: "none",
                    duration: 1,
                    ease: "power4.out",
                })

                // Page 1 Animations

                tl.from("nav svg, nav .nav-part2 h4", {
                    y:150,
                    stagger: .2,
                    onStart: ()=>{
                        gsap.to("nav .text1", {
                            opacity: 1,
                            duration: .5
                        })
                    }
                })

                tl.from(".page1 .hero h1", {
                    y:130,
                    stagger: .2,
                    onStart: ()=>{
                        gsap.to(".page1 .hero", {
                            opacity: 1,
                            duration: .5
                        })
                    }
                })

                tl.from(".page2 .video-wrapper", {
                    opacity: 0,
                }, "-=1")

                return;
            }
        }, 25)
    }


    tl.from(".text h1, .text h2", {
        y: 150,
        stagger: 0.2,
        delay: 1,
    })

    tl.from(".loader .disclaimer, .text .timer", {
        opacity: 0,
        duration: .6
    })

    tl.call(timerFunction);
}

function mouseFollower(){
    // window.addEventListener("mousemove", (e)=>{
    //     gsap.to(".crsr", {
    //         left: e.x,
    //         top: e.y,
    //     })
    // })
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 1,
        });
    }
}

function magnetAnimation(){
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        Shery.makeMagnet("nav .nav-part2 h4");
        Shery.makeMagnet(".menu-wrapper");
    }
}

function sheryAnimation(){
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        Shery.imageEffect(".image-div", {
            style: 5,
            config: {"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272695760684946},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.38,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":9.92,"range":[0,100]}},
            gooey: true,
        })
    }
    
}

function videoCursorAnimation(){
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        videoContainer.addEventListener("touchstart", (e)=>{
            video.volume = 0.1;
            isPaused = !isPaused;

            if(!isPaused){
                gsap.to(".page2 .video-wrapper video", {
                    opacity: 1,
                    onEnd: ()=>{
                        gsap.to(".video-cursor", {
                            scale: .3,
                        })
    
                        document.querySelector(".video-cursor").innerHTML = `<i class="ri-pause-line"></i>`;
    
                        video.play();
                    }
                })
            }
            else{
                gsap.to(".page2 .video-wrapper video", {
                    opacity: 0,
                    onEnd: ()=>{
                        gsap.to(".video-cursor", {
                            scale: 1,
                        })
    
                        document.querySelector(".video-cursor").innerHTML = `<i class="ri-play-fill"></i>`;
    
                        video.pause();
                    }
                })
            }
    
        })
    }
    else{
        videoContainer.addEventListener("mouseenter", ()=>{
            videoContainer.addEventListener("mousemove", (e)=>{
                gsap.to(".mousefollower", {
                    opacity: 0,
                })
                gsap.to(".video-cursor", {
                    left: e.x - 300,
                    y: e.y - 200,
                })
            })
        })
    
        videoContainer.addEventListener("mouseleave", ()=>{
            gsap.to(".mousefollower", {
                opacity: 1,
            })
    
            gsap.to(".video-cursor", {
                left: "80%",
                top: "-10%",
            })
        })
    
        videoContainer.addEventListener("click", ()=>{
            video.volume = 0.1;
            isPaused = !isPaused;
    
            if(!isPaused){
                gsap.to(".page2 .video-wrapper video", {
                    opacity: 1,
                    onEnd: ()=>{
                        gsap.to(".video-cursor", {
                            scale: .7,
                        })
    
                        document.querySelector(".video-cursor").innerHTML = `<i class="ri-pause-line"></i>`;
    
                        video.play();
                    }
                })
            }
            else{
                gsap.to(".page2 .video-wrapper video", {
                    opacity: 0,
                    onEnd: ()=>{
                        gsap.to(".video-cursor", {
                            scale: 1,
                        })
    
                        document.querySelector(".video-cursor").innerHTML = `<i class="ri-play-fill"></i>`;
    
                        video.pause();
                    }
                })
            }
    
        })
    }
}

function flagAnimation(){
    document.querySelector(".hero_special").addEventListener("mousemove", (e)=>{
        gsap.to(".flag", {
            x: e.x,
            y: e.y,
            opacity: 1
        })
    })

    document.querySelector(".hero_special").addEventListener("mouseleave", (e)=>{
        gsap.to(".flag", {
            opacity: 0
        })
    })
}

function textAnimation(){
    let textVal = document.querySelector(".page6-content .text-wrapper h1").textContent;
    let splittedText = textVal.split("")
    let clutter = "";
    splittedText.forEach(t=>{
        clutter += `<span>${t}</span>`;
    })
    document.querySelector(".page6 .page6-content .text-wrapper h1").innerHTML = clutter;

    let textVal2 = document.querySelector(".page6-content h3").textContent;
    let splittedText2 = textVal2.split("")
    let clutter2 = "";
    splittedText2.forEach(t=>{
        clutter2 += `<span>${t}</span>`;
    })
    document.querySelector(".page6 .page6-content h3").innerHTML = clutter2;

    document.querySelector(".page6 .page6-content .text-wrapper").addEventListener("mouseenter", ()=>{

        document.querySelectorAll(".page6 .page6-content h1 span").forEach(sp=>{
            sp.style.opacity = 0;
        })

        gsap.to(".page6-content h3 span", {
            stagger: .03,
            opacity: 1
        })

        gsap.to(".page6-content svg", {
            transform: "translateX(50%)",
        })
    })

    document.querySelector(".page6 .page6-content .text-wrapper").addEventListener("mouseleave", ()=>{

        document.querySelectorAll(".page6 .page6-content h3 span").forEach(sp=>{
            sp.style.opacity = 0;
        })

        gsap.to(".page6-content .text-wrapper h1 span", {
            stagger: .03,
            opacity: 1
        })

        gsap.to(".page6-content svg", {
            transform: "translateX(0)",
        })
    })
}

function menuAnimation(){
    const menuBtn = document.querySelector(".menu-wrapper");
    const tlMenu = gsap.timeline({paused: true});

    tlMenu.to(".menu", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    })

    tlMenu.from(".menu-items h1", {
        stagger: .05,
        opacity: 0,
        y: 100,
    })

    tlMenu.from(".menu .box-wrapper", {
        opacity: 0
    }, "-=.5")

    menuBtn.addEventListener("click", ()=>{

        if(!isMenuOpen){
            console.log("menu open");
            gsap.to(".menu-wrapper svg rect:nth-child(2), .menu-wrapper svg rect:nth-child(4), .menu-wrapper svg rect:nth-child(6), .menu-wrapper svg rect:nth-child(8)", {
                opacity: 0,
            })
            
            locoScroll.stop();
            tlMenu.play();
        }
        else{
            console.log("menu close");
            gsap.to(".menu-wrapper svg rect:nth-child(2), .menu-wrapper svg rect:nth-child(4), .menu-wrapper svg rect:nth-child(6), .menu-wrapper svg rect:nth-child(8)", {
                opacity: 1,
            })
            
            locoScroll.start();
            tlMenu.reverse(.5);
            
        }
        
        isMenuOpen = !isMenuOpen;
    })
}

loaderAnimation();
mouseFollower();
magnetAnimation();
sheryAnimation();
videoCursorAnimation();
flagAnimation();
textAnimation();
menuAnimation();
locomotiveSupport();

// document.body.style.cursor = 'none';
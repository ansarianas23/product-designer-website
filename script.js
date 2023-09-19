const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


// function that chnages the shape of the mouse pointer while moving it
function circleSqueez(){
    let timeout;
    let xscale = 1;
    let yscale = 1;

    let xprev = 0;
    let yprev = 0;

    window.addEventListener("mousemove", function(e){
        clearTimeout(timeout)

        xscale = gsap.utils.clamp(0.8, 1.2, e.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, e.clientY - yprev);
        
        xprev = e.clientX;      // mouse position value
        yprev = e.clientY;      // mouse position value

        circleMouseFollower(xscale, yscale)

        timeout = setTimeout(function(){
            document.querySelector("#miniCircle").style.transform = `translate(${e.clientX}px ,${e.clientY}px) scale(1, 1)`
        },100)
    })
}

circleSqueez();

// function that created a pointer
function circleMouseFollower(xscale, yscale){
    window.addEventListener('mousemove', function(e){
        document.querySelector("#miniCircle").style.visibility = "visible"
        document.querySelector("#miniCircle").style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xscale},${yscale})`;
    })

    window.addEventListener('mouseout',function(){
        document.querySelector("#miniCircle").style.visibility = "hidden"
    })
}

circleMouseFollower();

// first page animate function
function firstPageAnimate(){
    let tl = gsap.timeline();

    tl.from("#nav",{
        y:-10,
        opacity:0,
        duration: 1.5,
        ease: Expo
    })

    tl.to(".boundingElem",{
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2    // delay animate will run one by one
    })

    tl.from("#heroFooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
    })
}

firstPageAnimate();

// 2nd page on hover image rotate effect function
document.querySelectorAll(".elem").forEach(function(elem){
    let rotate = 0
    let diffrot = 0
    elem.addEventListener("mousemove", function(e){
        let diff = e.clientY - elem.getBoundingClientRect().top;
        diffrot = e.clientX - rotate;
        rotate = e.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: e.clientX,
            rotate: gsap.utils.clamp(-20,20, diffrot),
        })
    })
})

// function that removes images respective div when mouse leave the div
document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mouseleave", function(e){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            duration: 0.5
        })
    })
})
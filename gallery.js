// ======================
// NỀN SAO
// ======================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let firstRoundDone = false;

for(let i = 0; i < 700; i++){

    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.003
    });

}

function animateStars(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    stars.forEach(star => {

        star.alpha += star.speed;

        if(star.alpha >= 1 || star.alpha <= 0){
            star.speed *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        `rgba(255,255,255,${star.alpha})`;

        ctx.fill();

    });

    requestAnimationFrame(
        animateStars
    );
}

animateStars();

window.addEventListener("resize", () => {

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

});

// ======================
// HẠT SÁNG
// ======================

for(let i = 0; i < 80; i++){

    const sparkle =
    document.createElement("div");

    sparkle.className =
    "sparkle";

    sparkle.style.left =
    Math.random() * 100 + "vw";

    sparkle.style.top =
    Math.random() * 100 + "vh";

    sparkle.style.animationDelay =
    Math.random() * 3 + "s";

    document.body.appendChild(
        sparkle
    );
}

// ======================
// SAO BĂNG
// ======================

for(let i = 0; i < 5; i++){

    const star =
    document.createElement("div");

    star.className =
    "shooting-star";

    star.style.animationDelay =
    (i * 3) + "s";

    document.body.appendChild(
        star
    );
}

// ======================
// CAROUSEL
// ======================

const carousel =
document.getElementById(
    "carousel"
);

const items =
document.querySelectorAll(
    ".carousel .item"
);

const total =
items.length;

let radius;

if(window.innerWidth <= 480){
    radius = 520;
}else if(window.innerWidth <= 768){
    radius = 650;
}else{
    radius = 900;
}

items.forEach((item,index)=>{

    const angle =
    (360 / total) * index;

    item.style.transform =
    `rotateY(${angle}deg)
     translateZ(${radius}px)`;

});

// ======================
// BIẾN XOAY
// ======================

let rotateY = 0;
let rotateX = -10;

let isDragging = false;

let lastX = 0;
let lastY = 0;

let velocityX = 0;
let velocityY = 0;

// ĐẾM XOAY

let messageShown = false;

// ======================
// UPDATE
// ======================

function updateCarousel(){

    carousel.style.transform =

    `rotateX(${rotateX}deg)
     rotateY(${rotateY}deg)`;

}

// ======================
// KẾT THÚC
// ======================

function showEnding(){

    if(messageShown) return;

    messageShown = true;

    carousel.classList.add(
        "fade"
    );

    const endingScreen =
    document.getElementById(
        "endingScreen"
    );

    endingScreen.classList.add(
        "show"
    );

    const music =
    document.getElementById(
        "bgMusic"
    );

    if(music){

        let fadeAudio =
        setInterval(()=>{

            if(music.volume > 0.3){

                music.volume -= 0.02;

            }else{

                clearInterval(
                    fadeAudio
                );

            }

        },100);
    }

    createGoldenStars();

    setTimeout(()=>{

        document
        .getElementById(
            "secondMessage"
        )
        .classList
        .add("show");

    },5000);

    // 10 GIÂY SAU QUAY LẠI

    setTimeout(()=>{    

        endingScreen.classList.remove(
            "show"
        );

        document
        .getElementById(
            "secondMessage"
        )
        .classList
        .remove("show");

        carousel.classList.remove(
            "fade"
        );

        messageShown = false;

        firstRoundDone = false;

        rotateY = 0;

        if(music){

            music.volume = 0.001;
        }

    },10000);
}

// ======================
// SAO VÀNG
// ======================

function createGoldenStars(){

    for(let i=0;i<120;i++){

        const star =
        document.createElement(
            "div"
        );

        star.style.position =
        "fixed";

        star.style.left =
        "50%";

        star.style.top =
        "50%";

        star.style.width =
        "5px";

        star.style.height =
        "5px";

        star.style.borderRadius =
        "50%";

        star.style.background =
        "gold";

        star.style.boxShadow =
        "0 0 15px gold";

        star.style.zIndex =
        "9998";

        document.body.appendChild(
            star
        );

        const angle =
        Math.random() *
        Math.PI * 2;

        const distance =
        300 +
        Math.random()*600;

        const x =
        Math.cos(angle) *
        distance;

        const y =
        Math.sin(angle) *
        distance;

        star.animate([

            {
                transform:
                "translate(0,0)",
                opacity:1
            },

            {
                transform:
                `translate(${x}px,${y}px)`,
                opacity:0
            }

        ],{

            duration:4000,
            easing:"ease-out"

        });

        setTimeout(()=>{

            star.remove();

        },4000);
    }
}

// ======================
// CHUỘT
// ======================

document.addEventListener(
"mousedown",
e=>{

    isDragging = true;

    lastX = e.clientX;
    lastY = e.clientY;

});

document.addEventListener(
"mouseup",
()=>{

    isDragging = false;

});

document.addEventListener(
"mousemove",
e=>{

    if(!isDragging) return;

    let dx =
    e.clientX - lastX;

    let dy =
    e.clientY - lastY;

    let rotationAmount =
    dx * 0.3;

    rotateY +=
    rotationAmount;

    rotateX -=
    dy * 0.2;

    velocityX =
    dx * 0.08;

    velocityY =
    dy * 0.04;

    updateCarousel();

    lastX =
    e.clientX;

    lastY =
    e.clientY;

});

// ======================
// MOBILE
// ======================

document.addEventListener(
"touchstart",
e=>{

    isDragging = true;

    lastX =
    e.touches[0].clientX;

    lastY =
    e.touches[0].clientY;

});

document.addEventListener(
"touchend",
()=>{

    isDragging = false;

});

document.addEventListener(
"touchmove",
e=>{

    if(!isDragging) return;

    let dx =
    e.touches[0].clientX
    - lastX;

    let dy =
    e.touches[0].clientY
    - lastY;

    let rotationAmount =
    dx * 0.3;

    rotateY +=
    rotationAmount;

    rotateX -=
    dy * 0.2;

    velocityX =
    dx * 0.08;

    velocityY =
    dy * 0.04;

    updateCarousel();

    lastX =
    e.touches[0].clientX;

    lastY =
    e.touches[0].clientY;

});

// ======================
// QUÁN TÍNH
// ======================

function inertia(){

    if(!isDragging){

        rotateY += velocityX;

        rotateX -= velocityY;

        velocityX *= 0.96;
        velocityY *= 0.96;

        const autoRotate = 0.2;

        rotateY += autoRotate;

        if(Math.abs(rotateY) > 350){
            firstRoundDone = true;
        }

        const currentAngle =
        ((rotateY % 360) + 360) % 360;

        if(
            firstRoundDone &&
            currentAngle < 2 &&
            !messageShown
        ){
            showEnding();
        }

        updateCarousel();
    }

    requestAnimationFrame(
        inertia
    );
}

inertia();

// ======================
// CHỐNG LẬT
// ======================

setInterval(()=>{

    if(rotateX > 50)
        rotateX = 50;

    if(rotateX < -50)
        rotateX = -50;

},20);

// ======================
// PHÁT NHẠC
// ======================

const music =
document.getElementById(
    "bgMusic"
);

document.addEventListener(
    "click",
    ()=>{

        music.play()
        .catch(()=>{});

    },
    { once:true }
);
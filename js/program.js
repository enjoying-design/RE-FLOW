// LINEUP swiper 자동흐름 + 스와이프
document.addEventListener("DOMContentLoaded", function () {

    const lineupSwiperEl = document.querySelector(".lineup_swiper");

    if (!lineupSwiperEl || typeof Swiper === "undefined") {
        return;
    }

    const lineupSwiper = new Swiper(".lineup_swiper", {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 10,

        speed: 6000,

        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },

        freeMode: {
            enabled: true,
            momentum: false
        },

        navigation: {
            nextEl: ".lineup_next",
            prevEl: ".lineup_prev"
        },

        grabCursor: true
    });

    lineupSwiperEl.addEventListener("mouseenter", function () {
        lineupSwiper.autoplay.stop();
    });

    lineupSwiperEl.addEventListener("mouseleave", function () {
        lineupSwiper.autoplay.start();
    });

});


// AOS scroll animation
document.addEventListener("DOMContentLoaded", function () {

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 120
        });
    }

});

// TOP 버튼 - section1부터 보이고 클릭 시 맨 위로 이동
document.addEventListener("DOMContentLoaded", function () {

    const topBtn = document.querySelector("#top_btn");
    const section1 = document.querySelector("#section1_wrap");

    if (!topBtn || !section1) return;

    function checkTopButton() {

        const section1Top = section1.offsetTop;
        const scrollTop = window.scrollY || window.pageYOffset;

        if (scrollTop >= section1Top - 100) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    }

    topBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener("scroll", checkTopButton);
    window.addEventListener("resize", checkTopButton);

    checkTopButton();

});

// soft green circle cursor + leaf trail
document.addEventListener("DOMContentLoaded", function () {

    const circleCursor = document.querySelector("#circle_cursor");

    if (!circleCursor) return;

    document.body.classList.add("custom-cursor-on");

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let lastX = 0;
    let lastY = 0;
    let lastLeafTime = 0;
    let isFirstMove = true;

    // 커서 부드럽게 따라오기
    function moveCursor() {

        cursorX += (mouseX - cursorX) * 0.24;
        cursorY += (mouseY - cursorY) * 0.24;

        circleCursor.style.left = cursorX + "px";
        circleCursor.style.top = cursorY + "px";

        requestAnimationFrame(moveCursor);
    }

    // 작은 나뭇잎 생성
    function createLeaf(x, y, backX, backY) {

        const leaf = document.createElement("span");
        leaf.className = "cursor_leaf";

        const sideX = -backY;
        const sideY = backX;

        const randomSide = (Math.random() - 0.5) * 38;
        const moveX = backX * (26 + Math.random() * 42) + sideX * randomSide;
        const moveY = backY * (26 + Math.random() * 42) + sideY * randomSide;

        const rotate = Math.random() * 180 - 90;
        const size = 5 + Math.random() * 5;

        leaf.style.left = x + "px";
        leaf.style.top = y + "px";

        leaf.style.width = size + "px";
        leaf.style.height = size * 1.65 + "px";

        leaf.style.setProperty("--leaf-x", moveX + "px");
        leaf.style.setProperty("--leaf-y", moveY + "px");
        leaf.style.setProperty("--leaf-rotate", rotate + "deg");

        document.body.appendChild(leaf);

        leaf.addEventListener("animationend", function () {
            leaf.remove();
        });

    }

    // 마우스 움직임
    window.addEventListener("mousemove", function (e) {

        mouseX = e.clientX;
        mouseY = e.clientY;

        circleCursor.classList.add("is-visible");

        if (isFirstMove) {
            cursorX = mouseX;
            cursorY = mouseY;
            lastX = mouseX;
            lastY = mouseY;
            isFirstMove = false;
            return;
        }

        const now = Date.now();

        const dx = mouseX - lastX;
        const dy = mouseY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 9 && now - lastLeafTime > 30) {

            const length = distance || 1;

            const backX = -dx / length;
            const backY = -dy / length;

            createLeaf(
                mouseX + backX * 13,
                mouseY + backY * 13,
                backX,
                backY
            );

            if (Math.random() > 0.68) {
                createLeaf(
                    mouseX + backX * 20 + (Math.random() - 0.5) * 10,
                    mouseY + backY * 20 + (Math.random() - 0.5) * 10,
                    backX,
                    backY
                );
            }

            lastLeafTime = now;
            lastX = mouseX;
            lastY = mouseY;
        }

    });

    // 화면 밖으로 나가면 숨김
    window.addEventListener("mouseleave", function () {
        circleCursor.classList.remove("is-visible");
    });

    // hover 대상
    const hoverItems = document.querySelectorAll(
        "a, button, #top_btn, .program_arrow, .notice_prev, .notice_next, .faq_list li, .map-spot, .map-action, .ticket_more, .zone-card, .notice_card"
    );

    hoverItems.forEach(function (item) {

        item.addEventListener("mouseenter", function () {
            circleCursor.classList.add("is-hover");
        });

        item.addEventListener("mouseleave", function () {
            circleCursor.classList.remove("is-hover");
        });

    });

    // 클릭 효과
    window.addEventListener("mousedown", function () {
        circleCursor.classList.add("is-click");
    });

    window.addEventListener("mouseup", function () {
        circleCursor.classList.remove("is-click");
    });

    moveCursor();

});
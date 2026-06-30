// 흘러가는선효과 - section1 끝까지 내리면 선도 끝까지 그려짐
document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector("#section1_wrap");
    const movingLine = document.querySelector(".line_moving");

    if (!section || !movingLine) return;

    const lineLength = movingLine.getTotalLength();

    movingLine.style.strokeDasharray = lineLength;
    movingLine.style.strokeDashoffset = lineLength;

    let targetProgress = 0;
    let currentProgress = 0;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function updateProgress() {

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startPoint = windowHeight * 0.75;
        const totalDistance = section.offsetHeight - windowHeight * 0.25;

        targetProgress = (startPoint - rect.top) / totalDistance;
        targetProgress = clamp(targetProgress, 0, 1);
    }

    function renderLine() {

        currentProgress += (targetProgress - currentProgress) * 0.020;

        movingLine.style.strokeDashoffset = lineLength * (1 - currentProgress);

        requestAnimationFrame(renderLine);
    }

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    updateProgress();
    renderLine();

});

// 섹션별 큰 타이틀 + 소개글 스크롤 등장 효과
document.addEventListener("DOMContentLoaded", function () {

    const titleItems = document.querySelectorAll(".scroll_intro, .scroll_intro_title");

    const titleObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }

        });

    }, {
        threshold: 0.25,
        rootMargin: "0px 0px -80px 0px"
    });

    titleItems.forEach(function (item) {
        titleObserver.observe(item);
    });

});

// section1 사진/텍스트 스크롤 등장 + 사라짐 효과
document.addEventListener("DOMContentLoaded", function () {

    const boxes = document.querySelectorAll(".box1, .box2, .box3, .box4");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }

        });

    }, {
        threshold: 0.3
    });

    boxes.forEach(function (box) {
        observer.observe(box);
    });

});
// 프로그램 스와이퍼 + 자동흐름
document.addEventListener("DOMContentLoaded", function () {

    const programSwiperEl = document.querySelector(".program_swiper");

    if (!programSwiperEl || typeof Swiper === "undefined") {
        return;
    }

    const programSwiper = new Swiper(".program_swiper", {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 70,

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
            nextEl: ".program_next",
            prevEl: ".program_prev"
        },

        grabCursor: true
    });

    programSwiperEl.addEventListener("mouseenter", function () {
        programSwiper.autoplay.stop();
    });

    programSwiperEl.addEventListener("mouseleave", function () {
        programSwiper.autoplay.start();
    });

});



// 공지사항 카드 슬라이드
document.addEventListener("DOMContentLoaded", function () {

    const noticeCards = document.querySelectorAll(".notice_card");
    const prevBtn = document.querySelector(".notice_prev");
    const nextBtn = document.querySelector(".notice_next");

    if (!prevBtn || !nextBtn || noticeCards.length === 0) {
        return;
    }

    let noticeIndex = 0;
    let isSliding = false;

    noticeCards.forEach(function (card, index) {
        card.classList.remove("active", "enter-right", "enter-left", "leave-left", "leave-right");

        if (index === 0) {
            card.classList.add("active");
        }
    });

    function removeMoveClass() {
        noticeCards.forEach(function (card) {
            card.classList.remove("enter-right", "enter-left", "leave-left", "leave-right");
        });
    }

    function moveNotice(direction) {

        if (isSliding) return;

        isSliding = true;

        const currentCard = noticeCards[noticeIndex];

        let nextIndex;

        if (direction === "next") {
            nextIndex = noticeIndex + 1;

            if (nextIndex >= noticeCards.length) {
                nextIndex = 0;
            }

        } else {
            nextIndex = noticeIndex - 1;

            if (nextIndex < 0) {
                nextIndex = noticeCards.length - 1;
            }
        }

        const nextCard = noticeCards[nextIndex];

        removeMoveClass();

        if (direction === "next") {
            currentCard.classList.remove("active");
            currentCard.classList.add("leave-left");

            nextCard.classList.add("enter-right");

            setTimeout(function () {
                nextCard.classList.remove("enter-right");
                nextCard.classList.add("active");
            }, 20);
        }

        if (direction === "prev") {
            currentCard.classList.remove("active");
            currentCard.classList.add("leave-right");

            nextCard.classList.add("enter-left");

            setTimeout(function () {
                nextCard.classList.remove("enter-left");
                nextCard.classList.add("active");
            }, 20);
        }

        setTimeout(function () {
            currentCard.classList.remove("leave-left", "leave-right");
            noticeIndex = nextIndex;
            isSliding = false;
        }, 700);
    }

    nextBtn.addEventListener("click", function () {
        moveNotice("next");
    });

    prevBtn.addEventListener("click", function () {
        moveNotice("prev");
    });

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
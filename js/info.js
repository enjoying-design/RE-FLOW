// info page accordion
$(function(){

    $("#info_page .rf_accordion > ul > li").click(function(){

        $(this).children(".rf_answer").slideToggle(300);
        $(this).siblings().children(".rf_answer").slideUp(300);

        $(this).toggleClass("open");
        $(this).siblings().removeClass("open");

    });

});

// AOS scroll animation
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 120
});

// soft green circle cursor + leaf trail
document.addEventListener("DOMContentLoaded", function(){

    const circleCursor = document.querySelector("#circle_cursor");

    if(!circleCursor) return;

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
    function moveCursor(){

        cursorX += (mouseX - cursorX) * 0.24;
        cursorY += (mouseY - cursorY) * 0.24;

        circleCursor.style.left = cursorX + "px";
        circleCursor.style.top = cursorY + "px";

        requestAnimationFrame(moveCursor);
    }

    // 작은 나뭇잎 생성
    function createLeaf(x, y, backX, backY){

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

        leaf.addEventListener("animationend", function(){
            leaf.remove();
        });

    }

    // 마우스 움직임
    window.addEventListener("mousemove", function(e){

        mouseX = e.clientX;
        mouseY = e.clientY;

        circleCursor.classList.add("is-visible");

        if(isFirstMove){
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

        if(distance > 9 && now - lastLeafTime > 30){

            const length = distance || 1;

            const backX = -dx / length;
            const backY = -dy / length;

            createLeaf(
                mouseX + backX * 13,
                mouseY + backY * 13,
                backX,
                backY
            );

            if(Math.random() > 0.68){
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
    window.addEventListener("mouseleave", function(){
        circleCursor.classList.remove("is-visible");
    });

    // hover 대상 - info 페이지 전용
    const hoverItems = document.querySelectorAll(
        "a, button, .rf_accordion, .rf_accordion li, .rf_accordion li *, .rf_accordion button, .rf_accordion a, .faq_title, .info_title, .notice_head"
    );

    hoverItems.forEach(function(item){

        item.addEventListener("mouseenter", function(){
            circleCursor.classList.add("is-hover");
        });

        item.addEventListener("mouseleave", function(){
            circleCursor.classList.remove("is-hover");
        });

    });

    // 클릭 효과
    window.addEventListener("mousedown", function(){
        circleCursor.classList.add("is-click");
    });

    window.addEventListener("mouseup", function(){
        circleCursor.classList.remove("is-click");
    });

    moveCursor();

});
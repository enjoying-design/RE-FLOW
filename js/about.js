// 슬라이딩효과
document.addEventListener("DOMContentLoaded", function(){

    const scrollItems = document.querySelectorAll(".scroll_effect");

    const observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }else{
                entry.target.classList.remove("show");
            }

        });

    }, {
        threshold: 0.2
    });

    scrollItems.forEach(function(item){
        observer.observe(item);
    });

});


// story03 보라색 선 스크롤 드로잉
document.addEventListener("DOMContentLoaded", function(){

    const section = document.querySelector(".story03");
    const purpleLine = document.querySelector(".line03_moving");

    if(!section || !purpleLine) return;

    const lineLength = purpleLine.getTotalLength();

    purpleLine.style.strokeDasharray = lineLength;
    purpleLine.style.strokeDashoffset = lineLength;

    let targetProgress = 0;
    let currentProgress = 0;

    function clamp(value, min, max){
        return Math.max(min, Math.min(max, value));
    }

    function updatePurpleLine(){

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startPoint = windowHeight * 0.82;
        const totalDistance = section.offsetHeight + windowHeight * 0.15;

        targetProgress = (startPoint - rect.top) / totalDistance;
        targetProgress = clamp(targetProgress, 0, 1);
    }

    function renderPurpleLine(){

        currentProgress += (targetProgress - currentProgress) * 0.035;

        purpleLine.style.strokeDashoffset = lineLength * (1 - currentProgress);

        requestAnimationFrame(renderPurpleLine);
    }

    window.addEventListener("scroll", updatePurpleLine);
    window.addEventListener("resize", updatePurpleLine);

    updatePurpleLine();
    renderPurpleLine();

});

// about4 하늘색 선 스크롤 드로잉
document.addEventListener("DOMContentLoaded", function(){

    const section = document.querySelector(".about_message");
    const blueLine = document.querySelector(".line04_moving");

    if(!section || !blueLine) return;

    const lineLength = blueLine.getTotalLength();

    blueLine.style.strokeDasharray = lineLength;
    blueLine.style.strokeDashoffset = lineLength;

    let targetProgress = 0;
    let currentProgress = 0;

    function clamp(value, min, max){
        return Math.max(min, Math.min(max, value));
    }

    function updateBlueLine(){

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        /*
          about_message가 화면에 들어오면 선 시작
          섹션 중후반에서 선이 끝까지 그려짐
        */
        const startPoint = windowHeight * 0.82;
        const totalDistance = section.offsetHeight + windowHeight * 0.15;

        targetProgress = (startPoint - rect.top) / totalDistance;
        targetProgress = clamp(targetProgress, 0, 1);
    }

    function renderBlueLine(){

        currentProgress += (targetProgress - currentProgress) * 0.035;

        blueLine.style.strokeDashoffset = lineLength * (1 - currentProgress);

        requestAnimationFrame(renderBlueLine);
    }

    window.addEventListener("scroll", updateBlueLine);
    window.addEventListener("resize", updateBlueLine);

    updateBlueLine();
    renderBlueLine();

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

    // hover 대상
    const hoverItems = document.querySelectorAll(
        "a, button, .program_arrow, .notice_prev, .notice_next, .faq_list li, .map-spot, .map-action, .ticket_more, .zone-card, .notice_card"
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
# 할리갈리 게임

### 게임하기 : https://leafy-mousse-ad76d7.netlify.app/

[[할리갈리 동영상 링크]](https://youtu.be/iGaDXIv0tAQ)

<img src="README.assets/6tc0sl.gif" alt="6tc0sl" style="zoom:200%;" />



```js
// 유저 컴퓨터 점수 
let sumScore = {
    'user' : 0,
    'com1' : 0,
    'com2' : 0,
    'com3' : 0,
};

// 점수판에 반영
$('#user').text(sumScore['user']);
$('#com1').text(sumScore['com1']);
$('#com2').text(sumScore['com2']);
$('#com3').text(sumScore['com3']);


// 모달
$("#modalCloseBtn").click(function(){
    $(".modalContent").css('visibility', 'hidden');
    $(".modalLayer").css('visibility', 'hidden');
    $("#modal").attr("style", "display:none");
});


// 게임 끝났을 때 누가 1등인지 판별 및 모달 창 보여주기 함수
function gameover() {
    const max=Object.keys(sumScore).reduce((a, b) => (sumScore[a] > sumScore[b]) ? a : b);
    let winner = '';
    if (max == 'user') {
        winner = 'User';
    }
    else if (max == 'com1') {
        winner = 'Computer1';
    }
    else if (max == 'com2') {
        winner = 'Computer2';
    }
    else if (max == 'com3') {
        winner = 'Computer3';
    }

    $(".modalContent").children('h1').text(winner);
    $(".modalContent").css('visibility', 'visible');
    $(".modalLayer").css('visibility', 'visible');
    $("#modal").attr("style", "display:block");
}

//카드 생성 56장
let fruitCard = [];
for (var i = 0; i < 56; i++) {
    $('#article').append('<div class="card""><div id="hand"></div></div>');
    fruitCard.push(Math.floor(Math.random() * 56)%18+1  );
}
$('.card').eq(0).css('background-image', "url('./img/gameover.png')");
$('.card').eq(0).css('pointerEvents', 'none');


//점수 산정 로직6
let cardCnt = 0;
let imageNum = '';
let fruit = {
        'strawberry' : 0,
        'grape' : 0,
        'lemon' : 0,
        'banana' : 0,
    }
function score(target) {
    fruit = {
        'strawberry' : 0,
        'grape' : 0,
        'lemon' : 0,
        'banana' : 0,
    }
    
    // 미리 생성한 cardImg 객체로 과일 갯수 판독
    imageNum = target.style.backgroundImage.split('/')[2].split('.')[0];
    fruitList.push(imageNum);
    if (fruitList.length > 4) {
        fruitList.shift();
    }

    let idx = 0;
    while (idx < fruitList.length) {
        for (var i=0; i<cardImg[fruitList[idx]].length; i++ ) {
            fruit[cardImg[fruitList[idx]][i]]++;
        }
        idx++;
    }
	
    // 게임 룰인 과일 5개 일 때 벨 누르기 
    if (fruit['strawberry'] == 5) {
        bellMove();
    }
    else if (fruit['grape'] == 5) {
        bellMove();
    }
    else if (fruit['lemon'] == 5) {
        bellMove();
    }
    else if (fruit['banana'] == 5) {
        bellMove();
    }

}


//벨 진동
let moveNum = 0;
let comList = ['com3', 'com1', 'com2',  'com2', 'com1', 'com3', 'com1', 'com3', 'com2'];
function bellMove() {
    timeCheck = true;
    $('#bell').css('pointerEvents', 'auto');  // 벨 진동 전에 벨 누르지 못하게 한 것 초기화
    moveNum = 0;
    
    // 벨 진동 애니메이션
    moveImg = setInterval(function(){
        if (moveNum > 200) {
            clearInterval(moveImg);
        }
        else {
            $('#Hbtn')[0].style.left = $('#Hbtn')[0].offsetLeft + 10 + 'px';
            setTimeout(function(){$('#Hbtn')[0].style.left = $('#Hbtn')[0].offsetLeft - 10 + 'px';},5);
        }
        moveNum++;
    },10)

    setTimeout(function() {
        if ($('#bell').css('pointerEvents') == 'none') {
            return;
        }

        setTimeout(function() {
        
        // 득점하면 기존 카드 모드 뒤집어서 초기화
        for (var i = 1; i < 57; i++) {
            if ($('#article').children('.card').eq(i).css('background-image') != $('#article').children('.card').eq(1).css('background-image')) {
                $('#article').children('.card').eq(i).css('visibility', 'hidden');
                fruitList = [];
                    
            }
        }
        $('#bell').css('pointerEvents', 'none');  // 벨 진동 안하면 벨 못누르게 하기
        },500);
		
        // 1.3초 안에 벨 못누르면 컴퓨터가 득점
        sumScore[comList[0]] += cardCnt;  
        $('#' + comList[0]).text(sumScore[comList[0]]);
        comList.shift();
        cardCnt = 0;
    },1300)
}

// 카드뒤집어서 무슨 카드인지 보여주는 로직 
let z = 100; // z-index 변수 값
let numCard = ''; // 카드 이미지 번호 변수 값
function changeCard(target) {
    numCard = 'img' + fruitCard.shift() + '.jpg';
    target.style.backgroundImage = `url(./img/${numCard})`;
    target.style.zIndex = z;
    target.style.borderRadius = '20px';
    target.style.pointerEvents = 'none';
    z++;
}

//카드 옮기기 로직
let cardList = document.querySelectorAll(".card");
for(let i=0;i<cardList.length;i++){
    cardBox(cardList[i]);
}

// 사용자가 벨 누르면 득점
function clickBtn() {
    setTimeout(function() {
        for (var i = 1; i < 57; i++) {
            if ($('#article').children('.card').eq(i).css('background-image') != $('#article').children('.card').eq(1).css('background-image')) {
                $('#article').children('.card').eq(i).css('visibility', 'hidden');
                fruitList = [];
                
        }
    }
    $('#bell').css('pointerEvents', 'none');
    },500);
    sumScore['user'] += cardCnt;
    cardCnt = 0;
    $('#user').text(sumScore['user']);
    return true;
}


//컴퓨터가 카드 가져가는 로직
let moveCard;
let cardNum = 57;
function cardMoveRight() {
    moveCard = setInterval(function() {
        $('.card')[cardNum].children[0].style.visibility = 'visible'
        if ($('.card')[cardNum].offsetLeft >= 1050) {
            clearInterval(moveCard);
            $('.card')[cardNum].style.left = 1050+ 'px';
            $('.card')[cardNum].children[0].style.visibility = 'hidden';
            changeCard($('.card')[cardNum]);
            score($('.card')[cardNum]);
        
        }
        else {
            $('.card')[cardNum].style.left =  $('.card')[cardNum].offsetLeft + 10 + 'px';
        }
    }, 10);
    cardNum--;
}
function cardMoveTop() {
    moveCard = setInterval(function() {
        $('.card')[cardNum].children[0].style.visibility = 'visible'
        if ($('.card')[cardNum].offsetTop <= 20) {
            clearInterval(moveCard);
            $('.card')[cardNum].style.top = 20+ 'px';
            $('.card')[cardNum].children[0].style.visibility = 'hidden';
            changeCard($('.card')[cardNum]);
            score($('.card')[cardNum]);
        
        }
        else {
            $('.card')[cardNum].style.top =  $('.card')[cardNum].offsetTop - 10 + 'px';
        }
    }, 10);
    cardNum--;
}

function cardMoveLeft() {
    moveCard = setInterval(function() {
        $('.card')[cardNum].children[0].style.visibility = 'visible'
        if ($('.card')[cardNum].offsetLeft <= 150) {
            clearInterval(moveCard);
            $('.card')[cardNum].style.left = 150+ 'px';
            $('.card')[cardNum].children[0].style.visibility = 'hidden';
            changeCard($('.card')[cardNum]);
            score($('.card')[cardNum]);
        
        }
        else {
            $('.card')[cardNum].style.left =  $('.card')[cardNum].offsetLeft - 10 + 'px';
        }
    }, 10);
    cardNum--;
}
// 자동 옮기기 여기까지


// 카드 이동 (유저) 
cardBox($('.card'))
let timeOut = ''
let timeCheck = false;
function cardBox(card){
    card.onmousedown = function(event) {
        timeCheck = false;
        var target = event.target;

        if ($(event.target).css('backgroundImage') == $('.card').eq(0).css('backgroundImage')) {
            gameover()
            return;
        }

        let tempTarX = target.style.left;
        let tempTarY = target.style.top;
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var gapX = mouseX - target.offsetLeft;
        var gapY = mouseY - target.offsetTop;

        document.onmousemove = function(event) {

            target.style.left = event.clientX - gapX + 'px';
            target.style.top = event.clientY - gapY +'px';
        }
        document.onmouseup = function(event) {

            // target div 의 중앙 좌표 
            let tarCenterX = target.offsetLeft + 100;
            let tarCenterY = target.offsetTop + 100;


            // 카드가 빨려들어가게 하는 조건문
            if((550 <= tarCenterX && tarCenterX <= 800) && ( 600 <= tarCenterY && tarCenterY <= 900 ))
            {   
                target.style.left = 600+ 'px';
                target.style.top = 670+ 'px';
                cardCnt++;


                // 마우스 못쓰게
                $('.card').css('pointerEvents', 'none')
                $('.card').css('cursor', 'notAllowed');
                changeCard($(target)[0]);
                score($(target)[0]);
                cardNum--;
            
                document.onmousemove = null;
                document.onmouseup = null;

                // 마우스 다시 사용
                setTimeout(function() {$('.card').css('pointerEvents', '')},3100);

                if (timeCheck) {return;}
				
                // 시간차를 두며 컴퓨터 카드 가져가기
                timeOut = setTimeout(() => {
                    cardCnt++;
                    if (timeCheck) {return;}
                    if (cardNum == 1) {
                        gameover()
                        return;
                    }                          
                    cardMoveRight();
                    
                }, 1000);
                timeOut = setTimeout(() => {
                    cardCnt++;
                    if (timeCheck) {return;}
                    if (cardNum == 1) {
                        gameover()
                        return;
                    }
                    cardMoveTop();
                    
                }, 2000);
                timeOut = setTimeout(() => {
                    cardCnt++;
                    if (timeCheck) {return;}
                    if (cardNum == 1) {
                        gameover()
                        return;
                    }
                    cardMoveLeft();
                    
                }, 3000);
                
            }
        };
}
```


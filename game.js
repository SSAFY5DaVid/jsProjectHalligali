// 유저 컴퓨터 점수 
let sumScore = {
    'user' : 0,
    'com1' : 0,
    'com2' : 0,
    'com3' : 0,
};


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

// 유저 점수 산정을 위한 과일 갯수 정보

let fruitList = [];

const cardImg = {
    'img1' : ['strawberry'],
    'img2': ['lemon'],
    'img3': ['grape'],
    'img4': ['banana'],
    'img5': ['strawberry','grape'],
    'img6': ['lemon','banana'],
    'img7': ['strawberry','banana'],
    'img8': ['grape','banana'],
    'img9': ['strawberry','lemon'],
    'img10': ['grape','lemon'],
    'img11': ['grape','lemon','banana'],
    'img12': ['strawberry','lemon','banana'],
    'img13': ['strawberry','grape','lemon'],
    'img14': ['strawberry','grape','banana'],
    'img15': ['strawberry','strawberry','strawberry'],
    'img16': ['banana','banana','banana','banana'],
    'img17': ['grape','grape','grape','grape'],
    'img18': ['lemon','lemon','lemon','lemon'],
}



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

// 카드 변환 로직 
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

//벨 진동
let moveNum = 0;
let comList = ['com3', 'com1', 'com2',  'com2', 'com1', 'com3', 'com1', 'com3', 'com2'];
function bellMove() {
    timeCheck = true;
    $('#bell').css('pointerEvents', 'auto');
    moveNum = 0;
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
        for (var i = 1; i < 57; i++) {
            if ($('#article').children('.card').eq(i).css('background-image') != $('#article').children('.card').eq(1).css('background-image')) {
                $('#article').children('.card').eq(i).css('visibility', 'hidden');
                fruitList = [];
                    
            }
        }
        $('#bell').css('pointerEvents', 'none');
        },500);

        sumScore[comList[0]] += cardCnt;
        $('#' + comList[0]).text(sumScore[comList[0]]);
        comList.shift();
        cardCnt = 0;
    },1300)
}


//자동 옮기기 로직
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
}


window.onload = function(){
    let basket =document.getElementById("basket");
    let basketSpeed  = 20;
    let scoreCounter = document.getElementById("score");
    let basketPosition = window.innerWidth/2;
    let score = 0;
    function updateBasketPosition() {
        basket.style.left = `${basketPosition}px`;
    }



    function updateScore() {
        scoreCounter.textContent = `Score: ${score}`;
    }
    document.addEventListener('keydown',(event)=>{
        if (event.key==='ArrowLeft') {
            basketPosition-=basketSpeed ;
            if (basketPosition < 0) 
                basketPosition = 0;
        }else if(event.key==='ArrowRight') {
            basketPosition += basketSpeed ;
            let maxPosition = window.innerWidth - basket.offsetWidth;
            if (basketPosition > maxPosition)
                basketPosition = maxPosition;
        }
        updateBasketPosition();
    })




    function creatEgg(){
        let egg= document.createElement('div');
        egg.classList.add('egg');
        egg.style.top='0px';
        egg.style.left = `${Math.random() * window.innerWidth}px`;
        document.body.appendChild(egg);
        let eggTop = 0;
        let eggInterval = setInterval(()=>{
            eggTop +=5;
            egg.style.top = `${eggTop}px`;
            let eggRect = egg.getBoundingClientRect();
            let basketRect = basket.getBoundingClientRect();
            if (
                (eggRect.bottom >= basketRect.top) && 
                (eggRect.left < basketRect.right) && 
                (eggRect.right > basketRect.left )
            ) {
                clearInterval(eggInterval);
                egg.remove();
                score++; 
                updateScore();
            } else if (eggTop > window.innerHeight) {
                clearInterval(eggInterval);
                egg.classList.add('brokenEgg'); 
            }
        }, 20);
    }
    setInterval(creatEgg, 1500);
}
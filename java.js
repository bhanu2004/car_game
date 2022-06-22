const score = document.querySelector('.sc');
const popup = document.querySelector('.popup');
const popup2 = document.querySelector('.popup2');
const gamearea = document.querySelector('.gamearea');

let keys = {ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};
let player = {speed:5};

popup.addEventListener('click',start);
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
var num=0;
var count;
function startfn(){
    count =setInterval(function(){
    score.innerHTML = num;
    num++;},1000)
}


function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
}
function start(){
    
    popup.classList.add('hide');
    gamearea.classList.remove('hide');
    startfn();
    for( i=-2;i<1;i++){
        let enemy = document.createElement("div");
        let eimg = document.createElement('img');
        eimg.src = "eCar.png";
        eimg.setAttribute('class','ecar');
        enemy.appendChild(eimg);
        enemy.setAttribute('class','enemy');
        
        enemy.y = (i* 280)+10;
        enemy.x = Math.floor(Math.random()*420);
        enemy.style.left = enemy.x + "px";
        enemy.style.top = enemy.y + "px";
        gamearea.appendChild(enemy);
    }
    for(i=0;i<=6;i++){
        let roadLine = document.createElement("div");
        roadLine.setAttribute('class','roadLine');
        roadLine.y = i*150+10;
        roadLine.style.top = roadLine.y + "px";
        gamearea.appendChild(roadLine);
    }
  
    let car = document.createElement("img");
    car.src = "pCar.png"
    car.setAttribute('class','car');
    gamearea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    player.start = true;
    window.requestAnimationFrame(gamePlay);
}
function isCollide(a,b){
    let rCar = a.getBoundingClientRect();
    let rEnemy = b.getBoundingClientRect();
    return !(rCar.top>rEnemy.bottom || rCar.bottom<rEnemy.top || rCar.left >rEnemy.right || rCar.right < rEnemy.left);
}
function movelines(){
    let lines = document.querySelectorAll('.roadLine');
    lines.forEach(function(items){
        items.y= (items.y+player.speed-2)%750;
        items.style.top = items.y + "px";
    });
}
function enemyCar(car){
 let ec = document.querySelectorAll('.enemy');
 ec.forEach(function(items){
     if(isCollide(car,items)){
        popup2.classList.remove('hide');
        player.start = false;
        
    // gamearea.classList.add('hide');
   
    console.log("colide");
     }
    if(!player.start){
        // gamearea.removeChild(ec);
        function stopfn(){
            clearInterval(count);
        }
        stopfn();
        
    }
     items.y+= player.speed;
     if(items.y>700){
         items.y = -200;
         items.x = Math.floor(Math.random()*420);
         items.style.left = items.x + "px";
     }
     items.style.top = items.y + 'px';
 })
}
function gamePlay(){
    let car = document.querySelector('.car');
    movelines();
    enemyCar(car);
    
    let road = gamearea.getBoundingClientRect();
    if(player.start){
        if(keys.ArrowUp && player.y>200){player.y-=player.speed-1}
        if(keys.ArrowDown && player.y<(road.height-70)){player.y+=player.speed-1}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed-1}
        if(keys.ArrowRight && player.x <(road.width-45)){player.x+=player.speed-1}
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
    }
    
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}
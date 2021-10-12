//div do dinossauro
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let dinoPosition = 0;
let gameover = false;

//receber o keypress
document.addEventListener('keyup', handleKeyUp);

//função para ativar o pulo
function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
    //recarregar o jogo
    if(event.keyCode === 13){
        if(gameover){
            location.reload();
        }
    }
}

//função para fazer a animação de pular
function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(dinoPosition >= 160){
            //dino desce
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(dinoPosition <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    dinoPosition -= 20;
                    dino.style.bottom = dinoPosition + 'px';
                }
            }, 25);

        }else{
            //dino sobe
            dinoPosition += 20;
            dino.style.bottom = dinoPosition + 'px';
        }
        
    }, 25);

}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomCactus = Math.random() * 5000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let cactusSpeed = setInterval(() => {
        //verificar se cactus saiu da tela para apaga-lo
        if(cactusPosition <= -60){
            clearInterval(cactusSpeed);
            background.removeChild(cactus);

        //verificar colisão    
        }else if(cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60){
            clearInterval(cactusSpeed);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1><br><h2 class="game-over">Pressione Enter para Continuar</h2>';
            gameover = true;

        //movimento do cactus    
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    //valor minimo para gerar um novo cactus
    if(randomCactus < 700){
        randomCactus = 700;
    }

    setTimeout(createCactus, randomCactus);
}

createCactus();

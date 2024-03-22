
// Referencia do HTML
const songName = document.getElementById("music-name");
const bandName = document.getElementById("banda-name");
const som = document.getElementById("audio");
const cover = document.getElementById("cover")
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const likeButton = document.getElementById("like");
const curentProgress = document.getElementById("curent-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");


// criando variaveis - essa parte refere-se as imagens e sons que apareceram 
// durante os cliques dos botoes anterior e proximo
const issoCeNumConta = {
    songName : 'Isso Ce Num Conta',
    artist : 'Bruno e Marrone',
    file: 'issoCeNumConta',
    liked: false
};

const amorEterno = {
    songName : 'amor eterno',
    artist : 'Bruno e Marrone',
    file: 'amorEterno',
    liked: false
};

const saudadeMachuca = {
    songName : 'saudade machuca',
    artist : 'Bruno e Marrone',
    file: 'saudadeMachuca',
    liked: false
};

const cidadeVizinha = {
    songName : 'cidade vixinha',
    artist : 'Henrique e Juliano',
    file: 'cidadeVizinha',
    liked: true
};


const cheiroDoShampo = {
    songName : 'cheiro do shampo',
    artist : 'Leo magalhaes',
    file: 'cheiroDoShampo',
    liked: false
};

const completaAFrase = {
    songName : 'completa a frase',
    artist : 'Henrique e Juliano',
    file: 'completaAFrase',
    liked: false
};                      
                 //Parse ler a string e trnsforma em objeto estruturado                 //operador ??(se informaçao da esquerda nao existe,aloca valor patrao(da direita))
                // vai no armazenamento do navegador e salva o item depois do like      // colocando lista em um array  //
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [issoCeNumConta, amorEterno, saudadeMachuca, cidadeVizinha, cheiroDoShampo, completaAFrase];
let sortedPlaylist = [...originalPlaylist]; //esses tres pontos serve para espalhar o array

let index = 0;

//funcao verifica se liked é vdd,se for: remove vazio e preenche coracao.
function likeButtonRender(){
    if(sortedPlaylist[index].liked === true){
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }
    else{
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active'); 
    }

}

//percorre o array playlist e carrega as informacoes de cada musica.
function initializeSom(){
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    som.src = `sons/${sortedPlaylist[index].file}.mp3`; 
    songName.innerHTML = sortedPlaylist[index].songName;
    bandName.innerHTML = sortedPlaylist[index].artist;
    likeButtonRender();
}

initializeSom();

// funcao para o botao anterior
function previousSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -= 1;
    }
    initializeSom();
    clicaPlay();
}

// funcao para o botao proximo
function nextSong(){
    if(index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    initializeSom();
    clicaPlay();
}

// Essa parte refere-se ao botao playpause
let taTocando = false;
let isShuffle = false;
let repeatOn = false;

function clicaPlay(){
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    som.play();
    taTocando= true;
}


function clicaPause(){
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    som.pause();
    taTocando = false;
}

function playPauseDecida(){
    if(taTocando === true){
        clicaPause();
    }
    else{
        clicaPlay();
    }
}

//funcao que atualiza barra de progresso
function updateProgress(){
    //currentTime = tempo atualizado que a musica ja tocou
    //duration = duracao total da musica
    const barwidth = (som.currentTime/som.duration)*100;
    curentProgress.style.setProperty('--progress',`${barwidth}%`);
    songTime.innerHTML = toHHMMSS(som.currentTime);//esse comando pega tempo corrido da musica
}

//funcao jumpTo(pulaPra algum momento especifico ao ser clicado)
//Ouve um click e ela localiza onde foi
function jumpTo(event){
    const width = progressContainer.clientWidth; //pega a largura total da barra
    const clickposition = event.offsetX; //Pega a posicao onde foi clicado na barra
    const jumpToTime = (clickposition/width) * som.duration;//pega click/lagura total e multiplica duracao da musica
    som.currentTime = jumpToTime;
}

function shuffleArray(sortedPlaylist){
    const size = sortedPlaylist.length;
    let currentIndex = size - 1; 
    while(currentIndex > 0){
        //Math.random retorna numero aleatorio de 0 a 1
        //Math.floor ingnora numeros sorteados depois da virgula(0,345).
        let randomIndex = Math.floor(Math.random()* size);
        let aux = sortedPlaylist[currentIndex];
        sortedPlaylist[currentIndex] = sortedPlaylist[randomIndex];
        sortedPlaylist[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffle === false){
        isShuffle = true;
        shuffleArray(sortedPlaylist); 
        shuffleButton.classList.add('button-active');
    }
    else{
        isShuffle = false;
        sortedPlaylist = [...originalPlaylist]; 
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add("button-active");
    }
    else{
        repeatOn = false;
        repeatButton.classList.remove("button-active");
    }
}

//funçao para botao de repetir ou continuar musica
function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else{
        clicaPlay();
    }
}


//essa funcao pegara o tempo todo em segundos(3704,4567s) e transforma em hora/min/seg
function toHHMMSS( originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let minuts = Math.floor((originalNumber - hours * 3600)/60);
    let seg = Math.floor(originalNumber - hours * 3600 - minuts * 60);
    
    return `${hours.toString().padStart(2, '0')}:${minuts.toString().padStart(2, '0')}:
    ${seg.toString().padStart(2, '0')}`;
}

//funcao para pegar o tempo total da musica
function updateTotalTime(){
    totalTime.innerHTML = toHHMMSS(som.duration);
}

//funcao gerencia funcao do like 
function likeButtonCliked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }
    else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));//armazena o item,vai salvar como playlist
}

play.addEventListener('click', playPauseDecida);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
som.addEventListener('timeupdate', updateProgress);
som.addEventListener('ended', nextOrRepeat);
som.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked); 
repeatButton.addEventListener('click', repeatButtonClicked); 
likeButton.addEventListener('click', likeButtonCliked); 

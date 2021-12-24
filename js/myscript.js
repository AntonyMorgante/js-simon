/* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

let ar = [];
let score = 0;
let time = 5;
let period;
let gameIsOn = 0;

function genNumber(inf,sup){
    return Math.floor(Math.random()*(sup-inf+1)+inf);
}

function createNumberArray(number){
    do {
        n = genNumber(0,99); /* meglio farli generici */
        let nIsUnique = true; 
        for (let i=0; i<ar.length; i++){
            if (ar[i] == n){ 
                nIsUnique = false;
                i = ar.length; 
            }
        }
        if (nIsUnique){
            ar.push(n); 
        }
    } while (ar.length < number)
}

function clearNumbers(){
    let numberBox = document.getElementById("number-box");
    numberBox.innerHTML = "";
}

function writeNumbers(array){
    clearNumbers();
    let numberBox = document.getElementById("number-box");
    for (let i=0; i<array.length;i++){
        let number = document.createElement("span")
        let n = document.createTextNode(ar[i] + " ");
        number.appendChild(n);
        number.classList.add("arrayNum")
        numberBox.appendChild(number);

    }
}

function askNumbers(array){
    for (i=0; i<ar.length;i++){
        let answer = parseInt(prompt("Inserisci uno dei numeri che erano presenti sullo schermo"));
        for (j=0; j<ar.length;j++){
            if (answer == ar[j]){
                score ++
            }
        }
    }
}

function countdown(){
    time--;
    let countdownBox = document.getElementById("countdown");
    countdownBox.innerHTML = time;
}

function clearCountdown(){
    let countdownBox = document.getElementById("countdown");
    countdownBox.innerHTML = "";
    clearInterval(period);
}

function endGame(){
    askNumbers(ar);
    let numberBox = document.getElementById("number-box");
    numberBox.innerHTML = "La tua partita è finita! Il tuo punteggio è: " + score + ".<br>Gioca di nuovo per provare a migliorare il tuo risultato!";
    gameIsOn = 0;
    playButton.innerHTML = "Comincia una nuova partita"
}

function createGame(){
    if (!gameIsOn){
        gameIsOn = 1;
        time = 5;
        let countdownBox = document.getElementById("countdown");
        countdownBox.innerHTML = time;
        period = setInterval(countdown, 1000);
        clearNumbers();
        createNumberArray(5); 
        writeNumbers(ar);
        const clearCount = setTimeout(clearCountdown,4900);
        const clearTime = setTimeout(clearNumbers,4900);
        const questionTime = setTimeout(endGame,5000);
        playButton.innerHTML = "Partita in corso..."
    }
}

const playButton = document.getElementById("play-button")
playButton.addEventListener("click", createGame)


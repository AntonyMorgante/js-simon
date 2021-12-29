/* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

let ar = [];
let score = 0;
let time = 0;
let period;
let gameIsOn = 0;

function genNumber(inf,sup){
    return Math.floor(Math.random()*(sup-inf+1)+inf);
}

function createNumberArray(number){
    let sup = parseInt(document.getElementById("sup").value);
    if (isNaN(sup)){
        sup = 99;
    }
    do {
        n = genNumber(0,sup); 
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

function createAnswersArray(number){
    let answers = [];
    do {
        n = parseInt(prompt("Inserisci uno dei numeri che erano visualizzati sullo schermo"))
        let nIsUnique = true; 
        for (let i=0; i<answers.length; i++){
            if (answers[i] == n){ 
                nIsUnique = false;
                i = answers.length; 
                alert("Hai già inserito questo numero!")
            }
        }
        if (nIsUnique){
            answers.push(n); 
        }
    } while (answers.length < number)
    return answers;
}

function confrontAnswers(array1,array2){
    for (let i=0;i<array1.length;i++){
        for (let j=0;j<array2.length;j++){
            if (array1[i]==array2[j]){
                score += 1;
            }
        }   
    }
}

function countdown(){
    time--;
    let countdownBox = document.getElementById("countdown");
    countdownBox.innerHTML = time;
}

function initiateCountdown(){
    let countdownBox = document.getElementById("countdown");
    countdownBox.innerHTML = time;
    period = setInterval(countdown, 1000);
}

function clearCountdown(){
    let countdownBox = document.getElementById("countdown");
    countdownBox.innerHTML = "";
    clearInterval(period);
}

function endGame(){
    let numbers = parseInt(document.getElementById("numbers").value);
    if (isNaN(numbers)){
        numbers = 5;
    }
    let answers = createAnswersArray(numbers);
    confrontAnswers(ar,answers);
    let numberBox = document.getElementById("number-box");
    numberBox.innerHTML = "La tua partita è finita! Il tuo punteggio è: " + score + ".<br>Gioca di nuovo per provare a migliorare il tuo risultato!";
    gameIsOn = 0;
    playButton.innerHTML = "Comincia una nuova partita"
}

function newGameValues (){
    gameIsOn = 1;
    score = 0;
    time = parseInt(document.getElementById("time").value);
    if (isNaN(time)){
        time = 30;
    }
    ar = [];
}

function createGame(){
    let numbers = parseInt(document.getElementById("numbers").value);
    if (isNaN(numbers)){
        numbers = 5;
    }
    if (!gameIsOn){
        newGameValues();
        initiateCountdown();
        clearNumbers();
        createNumberArray(numbers); 
        writeNumbers(ar);
        const clearCount = setTimeout(clearCountdown,(time*1000)-100);
        const clearTime = setTimeout(clearNumbers,(time*1000)-100);
        const questionTime = setTimeout(endGame,time*1000);
        playButton.innerHTML = "Partita in corso..."
    }
}

const playButton = document.getElementById("play-button")
playButton.addEventListener("click", createGame)


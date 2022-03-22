let darkTheme = localStorage.getItem('dark-theme') === 'true';
let correctWord;
let row = 1;
let guess = '';
let complete = false;
let startTime = 0;
let minutes = 0;
let seconds = 0;
let time_taken = '';
let totalTime = 0;

function onKeyPress(key) {
    if (complete === true) {
        return;
    }
    let charnum = key.keyCode;
    if (guess.length > 0 && key.key == 'Backspace') {
        let word = document.getElementById('row' + row).children[guess.length - 1];
        guess = guess.substring(0, guess.length - 1)
        word.firstChild.innerHTML = '';
        return;
    }

    if (guess.length === 5 && key.key === 'Enter' && allWords.includes(guess)) {
        validateWord();
        if (guess === correctWord) {
            completeGame(true);
            return
        }
        row += 1;
        guess = '';
        if (row === 7) {
            completeGame(false)
        }
        return;
    }

    if (guess.length < 5) {
        if ((charnum > 96 && charnum < 123) || (charnum > 64 && charnum < 91)) {
            guess = guess + key.key;
            let word = document.getElementById('row' + row).children[guess.length - 1];
            word.firstChild.innerHTML = key.key;
        }
        return;
    }
}

function validateWord() {
    guess = guess.toUpperCase();
    let remainingLetters = correctWord.slice().split('');
    for (let i = 0; i < guess.length; i++) {
        let correct = guess[i] === correctWord[i];
        if (correct) {
            remainingLetters[i] = ' ';
            let word = document.getElementById('row' + row).children[i];
            word.classList.add('green');
        }
    }
    console.log(remainingLetters);
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== ' ') {
            let contains = guess.substring(0, i + 1).split('').filter(c => c === guess[i]).length <= remainingLetters.filter(c => c === guess[i]).length;
            let word = document.getElementById('row' + row).children[i];
            word.classList.add(contains ? 'yellow' : 'wrong');
        }
    }
}

function completeGame(win) {
    complete = true;
    totalTime = Date.now() - startTime;
    minutes = Math.floor((totalTime) / 60000);
    seconds = Math.floor(totalTime / 1000) % 60;
    time_taken = (minutes > 0 ? minutes + 'm ' : '') + seconds + 's';


    let time = document.getElementById('completion-time');
    time.innerHTML = time_taken;
    let word = document.getElementById('correct-word');
    word.innerHTML = correctWord;
    let resultsPanel = document.getElementById('results-panel');
    resultsPanel.classList.add(win ? 'won' : 'lost');
    resultsPanel.classList.add('visible');

}


document.addEventListener('keydown', onKeyPress);

window.onload = () => {
    // Pick a word
    correctWord = allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();
    // correctWord = allWords[Date.now() % (1000 * 60 * 60 * 24) % allWords.length].toUpperCase();
    startTime = Date.now();

    // Restore dark theme settings
    updateDarkTheme();
}

function updateDarkTheme() {
    // Store dark theme settings
    localStorage.setItem('dark-theme', darkTheme);

    // Update body classes
    let body = document.getElementsByTagName('body')[0];
    let classes = body.classList;
    if (darkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
}


let darkTheme = localStorage.getItem('dark-theme') === 'true';
let correctWord;
let row = 1;
let guess = '';

function onKeyPress(key) {
    let charnum = key.keyCode;
    if (guess.length > 0 && key.key == 'Backspace') {
        let word = document.getElementById('row' + row).children[guess.length - 1];
        guess = guess.substring(0, guess.length - 1)
        word.firstChild.innerHTML = '';
        return;
    }

    if (guess.length === 5 && key.key === 'Enter' && allWords.includes(guess)) {
        validateWord();
        if(guess === correctWord)
            completeGame(true);
        row += 1;
        guess = '';
        return;
    }

    if (guess.length < 5) {
        console.log(key);
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

function completeGame(win){
    let resultsPanel = document.getElementById('results-panel');
    resultsPanel.classList.add('visible');
}


document.addEventListener('keydown', onKeyPress);

window.onload = () => {
    // Pick a word
    correctWord = allWords[Math.floor(Math.random()*allWords.length)].toUpperCase();
    // correctWord = allWords[Date.now() % 1000 * 60 * 60 * 24 % allWords.length].toUpperCase();

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


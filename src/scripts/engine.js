const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        time: document.querySelector('#time'),
        score: document.querySelector('#score'),
    },
    values: {
        enemyPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 650),
        countdownId: setInterval(countdown, 1000),
    }
};

function countdown() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countdownId);
        alert('Game Over! O seu score foi ' + state.values.result + '!')
    }
}

function playSound(audioName) {
    let audio = new Audio(`src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add('enemy');
    state.values.enemyPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.enemyPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.enemyPosition = null;
                playSound("hit");
            }
        })
    })
}

function init() {
    addListenerHitBox()
}

init();
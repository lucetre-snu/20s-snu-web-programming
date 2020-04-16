const Game = function() {
    const rains = [];
    const words = ['사람', '국자', '바람', '고구마', '부부', '닭싸움', '줌', '하이퍼커넥트'];
    const gameBoxDom = document.getElementById('game-box');
    const lifeBoxDom = document.getElementById('life-box');
    const formDom = document.getElementById('form');
    const answerDom = document.getElementById('answer');
    let gameOver = false;
    let life = 3;

    const getNewRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)];
    }

    const generateNewRain = () => {
        const word = getNewRandomWord();
        const dom = document.createElement('div');

        dom.className = 'word-box';
        dom.textContent = word;
        dom.style.left = Math.floor(Math.random() * 80) + '%';
        // dom.style.left = Math.floor((gameBoxDom.offsetWidth - dom.offsetWidth) * Math.random()) + 'px';
        setInterval(() => {
            if(gameOver) return;
            const prevTop = dom.style.top ? parseInt(dom.style.top) : 0;
            dom.style.top = prevTop + 15 + 'px';
        }, 1000);
        setTimeout(() => {
            if(gameOver) return;
            if(dom.parentElement == gameBoxDom) {      
                rains.forEach((rain, i) => {
                    if(rain.dom === dom) {
                        rains.splice(i, 1);
                        return;
                    }
                });
                lifeBoxDom.textContent = '🧡'.repeat(--life);
                dom.remove();
                if(life === 0 && !gameOver) {
                    gameOver = true;
                    alert('game over');
                }
            }
        }, 19000);
        gameBoxDom.appendChild(dom);

        return {word, dom}
    }

    this.initialize = () => {
        setInterval(() => {
            if(gameOver) return;
            let rain = generateNewRain();
            rains.push(rain);
        }, 2000);
        formDom.addEventListener('submit', function(e) {
            if(gameOver) return;
            e.preventDefault();
            const answerText = answerDom.value;
            for(let i = 0; i < rains.length; i++) {
                let rain = rains[i];
                if(rain.word === answerText) {
                    rain.dom.remove();
                    rains.splice(i, 1);
                    break;
                }
            }
            answerDom.value = '';
        });
    }
};


const game = new Game();
game.initialize();

document.addEventListener('DOMContentLoaded', function() {
    const memoryCards = document.querySelectorAll('.memory-card');
    let startTime;
    let timerId;
    let matchedCards = 0; // Added to track matched cards

    function shuffleCards() {
        memoryCards.forEach(card => {
            const randomPos = Math.floor(Math.random() * memoryCards.length);
            card.style.order = randomPos;
        });
    }

    shuffleCards();

    const cards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            if (!startTime) {
                startTime = Date.now();
                updateTimer();
            }
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedCards += 2; // Increment matched cards count

        checkGameOver(); // Check if game is over

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            lockBoard = false;
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function checkGameOver() {
        // Check if the number of matched cards equals the total number of cards
        if (matchedCards === memoryCards.length) {
            // Introduce a brief delay to ensure the last pair of cards is visible before winning
            setTimeout(() => {
                window.location.href = '/html/vittoria.html';
            }, 1000); // 1000 milliseconds (1 second) delay
        }
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
});

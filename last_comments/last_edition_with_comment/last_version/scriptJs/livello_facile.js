document.addEventListener('DOMContentLoaded', function () {
    const memoryCards = document.querySelectorAll('.memory-card');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedCards = 0; // Variable to track matched cards

    function shuffleCards() {
        memoryCards.forEach(card => {
            const randomPos = Math.floor(Math.random() * memoryCards.length);
            card.style.order = randomPos;
        });
    }

    shuffleCards();

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
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
        checkGameOver(); // Check if the game is over

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

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

    memoryCards.forEach(card => card.addEventListener('click', flipCard));
});

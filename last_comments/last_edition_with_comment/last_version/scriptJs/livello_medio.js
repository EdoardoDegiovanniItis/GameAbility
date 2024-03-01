document.addEventListener('DOMContentLoaded', function() {
    const memoryCards = document.querySelectorAll('.memory-card');
  
    function shuffleCards() {
        memoryCards.forEach(card => {
            const randomPos = Math.floor(Math.random() * memoryCards.length);
            card.style.order = randomPos;
        });
    }
  
    shuffleCards();
  
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedCards = 0; // Variable to keep track of matched cards
  
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
        resetBoard();
        checkGameOver(); // Check if the game is over after each correct match
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
        // If all cards have been matched
        if (matchedCards === memoryCards.length) {
            setTimeout(() => {
                window.location.href = '/html/vittoria.html';
            }, 500); // Wait briefly to allow the last card to flip
        }
    }
  
    memoryCards.forEach(card => card.addEventListener('click', flipCard));
});

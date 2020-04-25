import Cookies from 'js-cookie';

class Cards {
    constructor() {
        this.seen = Cookies.get('seen');
        this.showAll = Cookies.get('showAll');

        if (this.showAll === undefined) {
            Cookies.set('showAll', false, { expires: 9999 })
            this.showAll = false;
        }

        if (this.seen === undefined) {
            Cookies.set('seen', [], { expires: 9999 });
            this.seen = [];
        } else {
            this.seen = JSON.parse(this.seen);
        }

        this.nextButton = document.getElementById("next");
        this.nextButton.addEventListener("click", () => {
           this.next();
        });

        this.resetButton = document.getElementById("reset-cards");
        this.resetButton.addEventListener("click", () => {
           this.resetSeen();
        });

    }

    next() {
        let nextCard = this.getNextValidNumber();
        let card = document.getElementById("card");
        card.setAttribute("src", `./assets/img/q-${nextCard}.jpg`);
        this.addToSeen(nextCard);
    }

    addToSeen(num) {
        this.seen.push(num);
        Cookies.set('seen', JSON.stringify(this.seen), { expires: 9999 });
    }

    getNextValidNumber() {
        let tries = 0;
        let randNum = this.getRandomOneToOneHundred();

        while (this.seen.indexOf(randNum) !== -1 && tries < 1000) {
            tries++;
            randNum = this.getRandomOneToOneHundred();
        }

        if (tries > 999) {
            console.log("resetting seen");
            this.resetSeen();
        }

        return randNum;
    }

    resetSeen() {
        Cookies.set('seen', [], { expires: 9999 });
        this.seen = [];
    }

    getRandomOneToOneHundred() {
        return Math.floor(Math.random() * 100) + 1;
    }
}

document.foo = new Cards();

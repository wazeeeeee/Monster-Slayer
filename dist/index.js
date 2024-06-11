"use strict";
class Player {
    constructor(herosHealth, monsterHealth, attack, specialAttack) {
        this.herosHealth = herosHealth;
        this.monsterHealth = monsterHealth;
        this.initialHerosHealth = herosHealth;
        this.initialMonsterHealth = monsterHealth;
        this.attack = attack;
        this.specialAttack = specialAttack;
        this.gameOver = false;
    }
    attackMonster() {
        if (this.gameOver)
            return;
        const damage = Math.floor(Math.random() * this.attack) + 1;
        const heroDamageMultiplier = 1.5;
        this.monsterHealth -= damage;
        this.herosHealth -= damage * heroDamageMultiplier;
        this.checkGameOver();
        this.updateHealthBars();
    }
    attackSpecial() {
        if (this.gameOver)
            return;
        const specialDamage = Math.floor(Math.random() * this.specialAttack) + 1;
        const herosHealth = 1.5;
        this.monsterHealth -= specialDamage;
        this.herosHealth -= specialDamage / herosHealth;
        this.checkGameOver();
        this.updateHealthBars();
    }
    heal() {
        if (this.gameOver)
            return;
        const healAmount = Math.floor(Math.random() * 20) + 10;
        this.herosHealth += healAmount;
        if (this.herosHealth > this.initialHerosHealth) {
            this.herosHealth = this.initialHerosHealth;
        }
        console.log('You healed for ' + healAmount + ' points!');
        this.updateHealthBars();
    }
    checkGameOver() {
        if (this.monsterHealth <= 0) {
            this.monsterHealth = 0;
            this.gameOver = true;
            alert('You deafeated the monster!');
        }
        if (this.herosHealth <= 0) {
            this.herosHealth = 0;
            this.gameOver = true;
            alert('The monster have killed you!');
        }
    }
    giveUp() {
        alert('You give up!');
        this.gameOver = true;
    }
    updateHealthBars() {
        const monsterHealthBar = document.getElementById("monsterHealth");
        const herosHealthBar = document.getElementById('herosHealth');
        if (monsterHealthBar) {
            const monsterHP = (this.monsterHealth / this.initialMonsterHealth) * 100;
            monsterHealthBar.style.width = `${monsterHP}%`;
            console.log("The monster's health has been updated to: " + monsterHP + "%");
        }
        if (herosHealthBar) {
            const herosHP = (this.herosHealth / this.initialHerosHealth) * 100;
            herosHealthBar.style.width = `${herosHP}%`;
            console.log("The hero's health has been updated to: " + herosHP + "%");
        }
    }
}
class Hero extends Player {
    constructor(herosHealth, monsterHealth, attack, specialAttack, heroName) {
        super(herosHealth, monsterHealth, attack, specialAttack);
        this.heroName = heroName;
    }
}
class Monster extends Player {
    constructor(herosHealth, monsterHealth, attack, specialAttack, monsterName) {
        super(herosHealth, monsterHealth, attack, specialAttack);
        this.monsterName = monsterName;
    }
}
const hero = new Player(100, 100, 10, 20);
const hitButton = document.getElementById("hit");
const specialAttackButton = document.getElementById("attackspecial");
const heal = document.getElementById('heal');
const giveUp = document.getElementById('giveup');
hitButton.addEventListener("click", () => {
    hero.attackMonster();
});
specialAttackButton.addEventListener("click", () => {
    hero.attackSpecial();
});
heal.addEventListener("click", () => {
    hero.heal();
});
giveUp.addEventListener('click', () => {
    hero.giveUp();
});

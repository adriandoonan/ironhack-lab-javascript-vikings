// Soldier
class Soldier {
    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }
    attack() {
        return this.strength
    }
    receiveDamage(damage) {
        this.health -= damage
    }
}

// Viking
class Viking extends Soldier {
    constructor(name, health, strength) {
        super(health,strength);
        this.name = name;
    }
    receiveDamage(damage) {
        this.health -= damage;
        if (this.health <= 0 ) {
            return `${this.name} has died in act of combat`
        }
        return `${this.name} has received ${damage} points of damage`
    }
    battleCry() {
        return `Odin Owns You All!`
    }
}

// Saxon
class Saxon extends Soldier {
    constructor(health,strength) {
        super(health,strength);
    }
    receiveDamage(damage) {
        this.health -= damage;
        if (this.health <= 0 ) {
            return `A Saxon has died in combat`
        }
        return `A Saxon has received ${damage} points of damage`
    }
}

// War
class War {
    constructor() {
        this.vikingArmy = [];
        this.saxonArmy = [];
    }
    addViking(viking) {
        try {
            if (!(viking instanceof Viking)) {
                throw new TypeError('Should be a Viking')
            }
            this.vikingArmy.push(viking)
        }
        catch(e) {
            console.error(e)
        }
    }
    addSaxon(saxon) {
        try {
            if (!(saxon instanceof Saxon)) {
                throw new TypeError('Should be a Saxon')
            }
            this.saxonArmy.push(saxon)
        }
        catch(e) {
            console.error(e)
        }
    }
    vikingAttack() {
        if (this.saxonArmy.length === 0 || this.vikingArmy.length === 0) {
            return this.showStatus()
        }
        const message = randomElement(this.saxonArmy).receiveDamage(randomElement(this.vikingArmy).attack())
        this.saxonArmy = this.saxonArmy.filter(element => element.health > 0)
        return message
    }
    saxonAttack() {
        if (this.saxonArmy.length === 0 || this.vikingArmy.length === 0) {
            return this.showStatus()
        }
        const message = randomElement(this.vikingArmy).receiveDamage(randomElement(this.saxonArmy).attack())
        this.vikingArmy = this.vikingArmy.filter(element => element.health > 0)
        return message
    }
    attack(attacker) {
        if (this.saxonArmy.length === 0 || this.vikingArmy.length === 0) {
            return this.showStatus()
        }
        switch(attacker) {
            case 'viking':
                return this.vikingAttack();
            case 'saxon':
                return this.saxonAttack();
            default:
                return 'attacker should be a Viking or Saxon'
        } 
        
    }
    showStatus() {
        if (this.saxonArmy.length === 0 ) {
            return `Vikings have won the war of the century!`
        }
        if (this.vikingArmy.length === 0 ) {
            return `Saxons have fought for their lives and survived another day...`
        }
        return `Vikings and Saxons are still in the thick of battle.`
    }
}

const emptyArr = []
const testArr = [1,2,3,4,5]

const randomElement = (array) => array[Math.floor(Math.random() * array.length)] || null

randomElement(emptyArr)
randomElement(testArr)

const gorm = new Viking('gorm',6,5)
gorm instanceof Viking

const sax = new Saxon(10,5)

let war = new War()

war.addSaxon(sax)
war.addViking(gorm)
war.attack('viking')
war.attack('viking')
war.attack('viking')
war.showStatus()
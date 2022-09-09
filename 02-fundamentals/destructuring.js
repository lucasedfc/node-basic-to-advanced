const deadpool = {
    name: 'Wade',
    lastName: 'Winston',
    power: 'Regeneration',
    age: 49,
    getName() {
        return `${this.name} ${this.lastName} ${this.power} `
    }
}

// const name = deadpool.name;
// const lastName = deadpool.lastName;
// const power = deadpool.power;
// const {name, lastName, power, age = 0} = deadpool;

function printHeroe({name, lastName, power, age = 0}) {        
    console.log(name, lastName, power, age);
}

// printHeroe(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];

// const [h1, h2, h3] = heroes

const [,,h3] = heroes;

console.log(h3);


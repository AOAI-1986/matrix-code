const characterSize = 25;
const fadeInterval = 1.6;
let streams = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    let x = 0;
    for (let i = 0; i <= Math.round(width / characterSize) - 1; i++) {
        const stream = new Stream();
        stream.generateCharacters(x, random(-1000, 0));
        streams.push(stream);
        x += characterSize;
    }

    textFont('Consolas');
    textSize(characterSize);
    textStyle(BOLD);
}

function draw() {
    background(0, 200);
    streams.forEach(stream => stream.render());
}

class Character {
    constructor(x, y, speed, first, opacity) {
        this.x = x;
        this.y = y;
        this.value;
        this.speed = speed;
        this.first = first;
        this.opacity = opacity;
        this.switchInterval = round(random(2, 25));
    }

    setToRandomCharacter() {
        const charType = Math.round(Math.random() * 5);
        if (frameCount % this.switchInterval === 0) {
            if (charType > 0) {
                this.value = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));  
            }
        }
    }

    fall() {
        this.y >= height ? this.y = 0 : this.y += this.speed;
    }
}

class Stream {
    constructor() {
        this.characters = [];
        this.totalCharacters = round(random(7, 20));
        this.speed = random(5, 8);
    }

    generateCharacters(x, y) {
        let opacity = 255;
        let first = Math.round(Math.random() * 4) === 1;
        
        for (let i = 0; i <= this.totalCharacters; i++) {
            const character = new Character(x, y, this.speed, first, opacity);
            this.characters.push(character);
            opacity -= (255 / this.totalCharacters) / fadeInterval;
            y -= characterSize;
            first = false;
        }
    }

    render() {
        this.characters.forEach(character => {
            character.first ? fill(140, 255, 170, character.opacity) : fill(0, 255, 0, character.opacity);
            text(character.value, character.x, character.y);
            character.fall();
            character.setToRandomCharacter();
        })
    }
}
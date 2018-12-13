import Entity, { Trait } from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import Solid from '../traits/Solid.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadToothpaste() {
    return loadSpriteSheet('toothpaste').then(createToothpasteFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (them.type !== 'mario') return;

        if (us.bounds.bottom >= them.bounds.top) them.bounds.top = us.bounds.bottom + 1;
        else if (us.bounds.left <= them.bounds.right) them.bounds.right = us.bounds.left + 1;
        else if (us.bounds.left >= them.bounds.right) them.bounds.left = us.bounds.right + 1;

        // Checks if speech in position exists if not creates it
        const entities = Array.from(window.level.entities);
        const existingSpeech = entities.find((ent) => ent.type === 'speech');
        const existingSpeech2 = entities.find((ent) => ent.type === 'speech2');
        const existingSpeech3 = entities.find((ent) => ent.type === 'speech3');
        const existingSpeech4 = entities.find((ent) => ent.type === 'speech4');
        const existingSpeech5 = entities.find((ent) => ent.type === 'speech5');
        const existingSpeech6 = entities.find((ent) => ent.type === 'speech6');
        const existingSpeech7 = entities.find((ent) => ent.type === 'speech7');
        const existingSpeech8 = entities.find((ent) => ent.type === 'speech8');
        if (!existingSpeech && us.pos.x === 180) {
            addSpeechEntity(window.entityFactory.speech(), us);
        } else if (!existingSpeech2 && us.pos.x === 650) {
            addSpeechEntity(window.entityFactory.speech2(), us);
        } else if (!existingSpeech3 && us.pos.x === 950) {
            addSpeechEntity(window.entityFactory.speech3(), us);
        } else if (!existingSpeech4 && us.pos.x === 1200) {
            addSpeechEntity(window.entityFactory.speech4(), us);
        } else if (!existingSpeech5 && us.pos.x === 1567) {
            addSpeechEntity(window.entityFactory.speech5(), us);
        } else if (!existingSpeech6 && us.pos.x === 1850) {
            addSpeechEntity(window.entityFactory.speech6(), us);
        } else if (!existingSpeech7 && us.pos.x === 2390) {
            addSpeechEntity(window.entityFactory.speech7(), us);
        } else if (!existingSpeech8 && us.pos.x === 2810) {
            addSpeechEntity(window.entityFactory.speech8(), us);
        }
    }
}

function addSpeechEntity(speech, toothpaste) {
    speech.pos.y = toothpaste.pos.y - 110;
    speech.pos.x = toothpaste.pos.x - 64;
    window.level.entities.add(speech);
}

function createToothpasteFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(toothpaste) {
        return walkAnim(toothpaste.lifetime);
    }

    function drawToothpaste(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createToothpaste() {
        const toothpaste = new Entity();
        toothpaste.size.set(16, 16);
        toothpaste.type = 'toothpaste';
        // toothpaste.addTrait(new Physics());
        toothpaste.addTrait(new Solid());
        toothpaste.addTrait(new PendulumMove());
        toothpaste.addTrait(new Behavior());
        toothpaste.draw = drawToothpaste;

        return toothpaste;
    };
}

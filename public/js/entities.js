import { loadFinaltooth } from './entities/Finaltooth.js';
import { loadMario } from './entities/Mario.js';
import { loadGerm } from './entities/Germ.js';
import { loadGerm2 } from './entities/Germ2.js';
import { loadGerm3 } from './entities/Germ3.js';
import { loadGoomba } from './entities/Goomba.js';
import { loadKoopa } from './entities/Koopa.js';
import { loadToothpaste } from './entities/Toothpaste.js';
import { loadSpeech } from './entities/Speech.js';
import { loadSpeech2 } from './entities/Speech2.js';
import { loadSpeech3 } from './entities/Speech3.js';
import { loadSpeech4 } from './entities/Speech4.js';
import { loadSpeech5 } from './entities/Speech5.js';
import { loadSpeech6 } from './entities/Speech6.js';
import { loadSpeech7 } from './entities/Speech7.js';
import { loadSpeech8 } from './entities/Speech8.js';


export function loadEntities() {
    const entityFactories = {};
    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadFinaltooth().then(addAs('finaltooth')),
        loadMario().then(addAs('mario')),
        loadGerm().then(addAs('germ')),
        loadGerm2().then(addAs('germ2')),
        loadGerm3().then(addAs('germ3')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadToothpaste().then(addAs('toothpaste')),
        loadSpeech().then(addAs('speech')),
        loadSpeech2().then(addAs('speech2')),
        loadSpeech3().then(addAs('speech3')),
        loadSpeech4().then(addAs('speech4')),
        loadSpeech5().then(addAs('speech5')),
        loadSpeech6().then(addAs('speech6')),
        loadSpeech7().then(addAs('speech7')),
        loadSpeech8().then(addAs('speech8')),
    ]).then(() => entityFactories);
}

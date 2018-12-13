import Entity, { Trait } from '../Entity.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadSpeech5() {
  return loadSpriteSheet('speech5')
    .then(createSpeechFactory);
}


class Behavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us, them) {
    return;
  }
}


function createSpeechFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(speech) {
    return walkAnim(speech.lifetime);
  }

  function drawSpeech(context) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createSpeech() {
    const speech = new Entity();
    speech.size.set(212, 102);
    speech.type = 'speech5';

    speech.draw = drawSpeech;

    return speech;
  };
}

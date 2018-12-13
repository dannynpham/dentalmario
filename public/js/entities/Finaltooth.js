import Entity, { Trait } from '../Entity.js';
import PendulumMove from '../traits/PendulumMove.js';
import Solid from '../traits/Solid.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadFinaltooth() {
  return loadSpriteSheet('finaltooth').then(createFinaltoothFactory);
}

class Behavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us, them) {
    if (them.type !== 'mario') return;
    document.querySelector('#screen').style.display = 'none';
    document.querySelector('.final-screen').style.display = 'block';
    console.log('victory!!!');
  }
}

function createFinaltoothFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  function routeAnim(finaltooth) {
    return walkAnim(finaltooth.lifetime);
  }

  function drawFinaltooth(context) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createFinaltooth() {
    const finaltooth = new Entity();
    finaltooth.size.set(160, 140);
    finaltooth.type = 'finaltooth';
    finaltooth.addTrait(new Solid());
    finaltooth.addTrait(new PendulumMove());
    finaltooth.addTrait(new Behavior());
    finaltooth.draw = drawFinaltooth;

    return finaltooth;
  };
}

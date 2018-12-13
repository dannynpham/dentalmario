import Entity, { Trait } from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import { loadSpriteSheet } from '../loaders.js';

export function loadGerm() {
    return loadSpriteSheet('germ')
    .then(createGermFactory);
}


class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }
}


function createGermFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(germ) {
        if (germ.killable.dead) {
            return 'flat';
        }

        return walkAnim(germ.lifetime);
    }

    function drawGerm(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGerm() {
        const germ = new Entity();
        germ.size.set(16, 16);
        germ.type = 'germ';

        germ.addTrait(new Physics());
        germ.addTrait(new Solid());
        germ.addTrait(new PendulumMove());
        germ.addTrait(new Behavior());
        germ.addTrait(new Killable());

        germ.draw = drawGerm;

        return germ;
    };
}

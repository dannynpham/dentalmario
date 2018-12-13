export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement('canvas');


    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            // console.log(entity);
            spriteBuffer.width = entity.size.x || width;
            spriteBuffer.height = entity.size.y || height;
            const spriteBufferContext = spriteBuffer.getContext('2d');
            spriteBufferContext.clearRect(0, 0, width, height);
            // spriteBufferContext.clearRect(0, 0, width, height);

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });
    };
}

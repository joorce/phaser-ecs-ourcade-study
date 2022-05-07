import { defineQuery, enterQuery, exitQuery, defineSystem } from 'bitecs';
import { Position } from '../components/Position';
import { Rotation } from '../components/Rotation';
import { Sprite } from '../components/Sprite';

export const createSpriteSystem = (scene: Phaser.Scene, textures: string[]) => {
  const spritesById = new Map<number, Phaser.GameObjects.Sprite>();
  const spriteQuery = defineQuery([Sprite, Position]);
  const spriteQueryEnter = enterQuery(spriteQuery);
  const spriteQueryExit = exitQuery(spriteQuery);

  return defineSystem((world) => {
    const enterEntities = spriteQueryEnter(world);
    for (const id of enterEntities) {
      const texId = Sprite.texture[id];
      const texture = textures[texId];
      spritesById.set(id, scene.add.sprite(0, 0, texture));
    }
    const entities = spriteQuery(world);
    for (const id of entities) {
      const sprite = spritesById.get(id);
      if (!sprite) {
        continue;
      }

      sprite.x = Position.x[id];
      sprite.y = Position.y[id];
      sprite.angle = Rotation.angle[id];
    }
    const exitEntities = spriteQueryExit(world);
    for (const id of exitEntities) {
      const sprite = spritesById.get(id);
      if (!sprite) {
        continue;
      }

      sprite.destroy();
      spritesById.delete(id);
    }
    return world;
  });
};

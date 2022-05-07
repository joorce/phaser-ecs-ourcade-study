import { defineQuery, defineSystem } from 'bitecs';
import { Player } from '../components/Player';
import { Rotation } from '../components/Rotation';
import { Velocity } from '../components/Velocity';

export const createPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const query = defineQuery([Player, Velocity, Rotation]);
  return defineSystem((world) => {
    const entities = query(world);
    for (const id of entities) {
      if (cursors.left.isDown) {
        Velocity.x[id] = -5;
        Velocity.y[id] = 0;
        Rotation.angle[id] = 180;
      } else if (cursors.right.isDown) {
        Velocity.x[id] = 5;
        Velocity.y[id] = 0;
        Rotation.angle[id] = 0;
      } else if (cursors.up.isDown) {
        Velocity.x[id] = 0;
        Velocity.y[id] = -5;
        Rotation.angle[id] = 270;
      } else if (cursors.down.isDown) {
        Velocity.x[id] = 0;
        Velocity.y[id] = 5;
        Rotation.angle[id] = 90;
      } else {
        Velocity.x[id] = 0;
        Velocity.y[id] = 0;
      }
    }
    return world;
  });
};

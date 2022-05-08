import { defineQuery, defineSystem } from 'bitecs';
import { Direction, Input } from '../components/Input';
import { Player } from '../components/Player';
import { Rotation } from '../components/Rotation';
import { Velocity } from '../components/Velocity';

export const createPlayerSystem = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
) => {
  const query = defineQuery([Player, Velocity, Rotation, Input]);

  return defineSystem((world) => {
    const entities = query(world);
    console.log(entities);

    for (const id of entities) {
      if (cursors.left.isDown) {
        Input.direction[id] = Direction.Left;
      } else if (cursors.right.isDown) {
        Input.direction[id] = Direction.Right;
      } else if (cursors.up.isDown) {
        Input.direction[id] = Direction.Up;
      } else if (cursors.down.isDown) {
        Input.direction[id] = Direction.Down;
      } else {
        Input.direction[id] = Direction.None;
      }
    }
    return world;
  });
};

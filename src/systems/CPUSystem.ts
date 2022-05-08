import { defineQuery, defineSystem } from 'bitecs';
import { CPU } from '../components/CPU';
import { Direction, Input } from '../components/Input';
import { Rotation } from '../components/Rotation';
import { Velocity } from '../components/Velocity';

export const createCPUSystem = (scene: Phaser.Scene) => {
  const query = defineQuery([CPU, Velocity, Rotation, Input]);
  return defineSystem((world) => {
    const dt = scene.game.loop.delta;
    const entities = query(world);
    for (const id of entities) {
      CPU.accumulatedTime[id] += dt;

      if (CPU.accumulatedTime[id] < CPU.timeBetweenActions[id]) {
        continue;
      }

      CPU.accumulatedTime[id] = 0;

      const rand = Phaser.Math.Between(0, 20);

      switch (rand) {
        case 0:
          Input.direction[id] = Direction.Left;
          break;
        case 1:
          Input.direction[id] = Direction.Right;
          break;
        case 2:
          Input.direction[id] = Direction.Up;
          break;
        case 3:
          Input.direction[id] = Direction.Down;
          break;
        default:
          Input.direction[id] = Direction.None;
          break;
      }
    }
    return world;
  });
};

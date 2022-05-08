import { defineQuery, defineSystem } from 'bitecs';
import { CPU } from '../components/CPU';
import { Rotation } from '../components/Rotation';
import { Velocity } from '../components/Velocity';

export const createCPUSystem = (scene: Phaser.Scene) => {
  const query = defineQuery([CPU, Velocity, Rotation]);
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
          Velocity.x[id] = -5;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 180;
          break;
        case 1:
          Velocity.x[id] = 5;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 0;
          break;
        case 2:
          Velocity.x[id] = 0;
          Velocity.y[id] = -5;
          Rotation.angle[id] = 270;
          break;
        case 3:
          Velocity.x[id] = 0;
          Velocity.y[id] = 5;
          Rotation.angle[id] = 90;
          break;
        default:
          Velocity.x[id] = 0;
          Velocity.y[id] = 0;
          break;
      }
    }
    return world;
  });
};

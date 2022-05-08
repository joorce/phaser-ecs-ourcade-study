import { defineQuery, defineSystem } from 'bitecs';
import { Direction, Input } from '../components/Input';
import { Position } from '../components/Position';
import { Rotation } from '../components/Rotation';
import { Velocity } from '../components/Velocity';

export const createMovementSystem = (speed: number) => {
  const query = defineQuery([Position, Velocity, Input]);
  return defineSystem((world) => {
    const entities = query(world);
    for (const id of entities) {
      const direction = Input.direction[id];
      switch (direction) {
        case Direction.None:
          Velocity.x[id] = 0;
          Velocity.y[id] = 0;
          break;
        case Direction.Left:
          Velocity.x[id] = -speed;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 180;
          break;
        case Direction.Right:
          Velocity.x[id] = speed;
          Velocity.y[id] = 0;
          Rotation.angle[id] = 0;
          break;
        case Direction.Up:
          Velocity.x[id] = 0;
          Velocity.y[id] = -speed;
          Rotation.angle[id] = 270;
          break;
        case Direction.Down:
          Velocity.x[id] = 0;
          Velocity.y[id] = speed;
          Rotation.angle[id] = 90;
          break;
        default:
          break;
      }

      Position.x[id] += Velocity.x[id];
      Position.y[id] += Velocity.y[id];
    }
    return world;
  });
};

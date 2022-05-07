import { defineQuery, defineSystem } from 'bitecs';
import { Position } from '../components/Position';
import { Velocity } from '../components/Velocity';

export const createMovementSystem = () => {
  const query = defineQuery([Position, Velocity]);
  return defineSystem((world) => {
    const entities = query(world);
    for (const id of entities) {
      Position.x[id] += Velocity.x[id];
      Position.y[id] += Velocity.y[id];
    }
    return world;
  });
};

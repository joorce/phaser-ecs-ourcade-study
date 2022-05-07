import { addComponent, addEntity, createWorld, IWorld, System } from 'bitecs';
import 'phaser';
import { Player } from './components/Player';
import { Position } from './components/Position';
import { Rotation } from './components/Rotation';
import { Sprite } from './components/Sprite';
import { Velocity } from './components/Velocity';
import { createMovementSystem } from './systems/MovementSystem';
import { createPlayerSystem } from './systems/PlayerSystem';
import { createSpriteSystem } from './systems/SpriteSystem';

export class MainScene extends Phaser.Scene {
  private spriteSystem?: System;
  private movementSystem?: System;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerSystem?: System;
  private world?: IWorld;

  constructor() {
    super({
      key: 'MainScene',
    });
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(): void {
    this.load.image('tank-blue', 'assets/tank_blue.png');
    this.load.image('tank-green', 'assets/tank_green.png');
    this.load.image('tank-red', 'assets/tank_red.png');
  }

  create(): void {
    this.world = createWorld();
    const tank = addEntity(this.world);

    addComponent(this.world, Position, tank);

    Position.x[tank] = 100;
    Position.y[tank] = 100;

    addComponent(this.world, Velocity, tank);

    Velocity.x[tank] = 0;
    Velocity.y[tank] = 0;

    addComponent(this.world, Sprite, tank);

    Sprite.texture[tank] = 0;

    addComponent(this.world, Player, tank);

    addComponent(this.world, Rotation, tank);
    Rotation.angle[tank] = 0;

    this.spriteSystem = createSpriteSystem(this, [
      'tank-blue',
      'tank-red',
      'tank-green',
    ]);

    this.movementSystem = createMovementSystem();
    this.playerSystem = createPlayerSystem(this.cursors);
  }

  update(t: number, dt: number): void {
    if (!this.world) {
      return;
    }
    this.spriteSystem?.(this.world);
    this.movementSystem?.(this.world);
    this.playerSystem?.(this.world);
  }
}

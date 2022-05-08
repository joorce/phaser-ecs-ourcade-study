import { addComponent, addEntity, createWorld, IWorld, System } from 'bitecs';
import 'phaser';
import { CPU } from './components/CPU';
import { Player } from './components/Player';
import { Position } from './components/Position';
import { Rotation } from './components/Rotation';
import { Sprite } from './components/Sprite';
import { Velocity } from './components/Velocity';
import { createCPUSystem } from './systems/CPUSystem';
import { createMovementSystem } from './systems/MovementSystem';
import { createPlayerSystem } from './systems/PlayerSystem';
import { createSpriteSystem } from './systems/SpriteSystem';

export class MainScene extends Phaser.Scene {
  private spriteSystem?: System;
  private movementSystem?: System;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerSystem?: System;
  private cpuSystem?: System;
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
    const player = addEntity(this.world);

    addComponent(this.world, Position, player);
    addComponent(this.world, Velocity, player);
    addComponent(this.world, Sprite, player);
    addComponent(this.world, Player, player);
    addComponent(this.world, Rotation, player);

    Position.x[player] = 100;
    Position.y[player] = 100;

    Velocity.x[player] = 0;
    Velocity.y[player] = 0;

    Sprite.texture[player] = 0;

    Rotation.angle[player] = 0;

    this.spriteSystem = createSpriteSystem(this, [
      'tank-blue',
      'tank-red',
      'tank-green',
    ]);

    const { width, height } = this.scale;
    for (let i = 0; i < 20; i++) {
      const enemyTank = addEntity(this.world);
      addComponent(this.world, Position, enemyTank);
      Position.x[enemyTank] = Phaser.Math.Between(width * 0.25, width * 0.75);
      Position.y[enemyTank] = Phaser.Math.Between(height * 0.25, height * 0.75);
      addComponent(this.world, Rotation, enemyTank);
      addComponent(this.world, Sprite, enemyTank);
      addComponent(this.world, Velocity, enemyTank);
      Sprite.texture[enemyTank] = Phaser.Math.Between(1, 2);
      addComponent(this.world, CPU, enemyTank);
      CPU.timeBetweenActions[enemyTank] = Phaser.Math.Between(20, 300);
    }

    this.movementSystem = createMovementSystem();
    this.playerSystem = createPlayerSystem(this.cursors);
    this.cpuSystem = createCPUSystem(this);
  }

  update(t: number, dt: number): void {
    if (!this.world) {
      return;
    }
    this.cpuSystem?.(this.world);
    this.playerSystem?.(this.world);
    this.movementSystem?.(this.world);
    this.spriteSystem?.(this.world);
  }
}

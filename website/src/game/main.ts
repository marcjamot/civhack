import { World } from "ecsy";
import { Action } from "./components/action";

import { Circle } from "./components/circle";
import { Position } from "./components/position";
import { Graphics } from "./systems/graphics";

export class Game {
  #world = new World();
  #last: number = Date.now();

  constructor(div: HTMLElement) {
    this.#world
      .registerComponent(Action, false)
      .registerComponent(Circle)
      .registerComponent(Position)
      .registerSystem(Graphics, { div: div });

    // Debug
    this.#world.createEntity()
      .addComponent(Action, {
        action: () => {
          console.log("Clicked on base");
        },
      })
      .addComponent(Circle, { color: 0xFF0000, radius: 20 })
      .addComponent(Position, { x: 0.03, y: 0.412 });
  }

  start() {
    const now = Date.now();
    const dt = now - this.#last;
    this.#last = now;

    this.#world.execute(dt, now);
    setTimeout(() => this.start(), 1);
  }

  onResize() {
    const graphics = this.#world.getSystem(Graphics);
    if (graphics) {
      graphics.resize();
    }
  }
}

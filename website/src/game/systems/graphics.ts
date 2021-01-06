/// <reference path="../../../node_modules/pixi.js/pixi.js.d.ts" />

import { Action } from "$game/components/action";
import { Circle } from "$game/components/circle";
import { Position } from "$game/components/position";
import { Attributes, Entity, System, World } from "ecsy";

export class Graphics extends System {
  #div: HTMLElement;
  #app: PIXI.Application;
  #worldmap: PIXI.Sprite;

  constructor(world: World<Entity>, attributes?: Attributes) {
    super(world, attributes);
    this.#div = attributes.div;
  }

  init(attributes?: Attributes) {
    this.enabled = false;
    this.#app = new PIXI.Application({ resizeTo: this.#div });
    this.#div.appendChild(this.#app.view);

    this.#app.loader
      .add("worldmap", "worldmap.jpg")
      .load((_, resources) => {
        const worldmap = new PIXI.Sprite(resources.worldmap.texture);
        worldmap.name = "worldmap";
        worldmap.width = this.#app.view.width;
        worldmap.height = this.#app.view.height;
        this.#app.stage.addChild(worldmap);
        this.#worldmap = worldmap;

        this.enabled = true;
      });
  }

  execute(delta: number, time: number) {
    this.queries.circles.added.forEach((entity) => {
      const action = entity.getComponent(Action);
      const circle = entity.getComponent(Circle);
      const wp = entity.getComponent(Position);
      const sc = this.w2s(new PIXI.Point(wp.x, wp.y));

      const g = new PIXI.Graphics();
      g.beginFill(circle.color);
      g.drawCircle(sc.x, sc.y, circle.radius);
      g.endFill();
      if (action !== undefined) {
        g.interactive = true;
        g.on("pointerdown", (event: PIXI.InteractionEvent) => {
          action.action();
        });
      }
      this.#worldmap.addChild(g);
    });
  }

  resize() {
    this.#app.resize();
    this.#worldmap.width = this.#app.view.width;
    this.#worldmap.height = this.#app.view.height;
  }

  s2w(p: PIXI.Point): PIXI.Point {
    return new PIXI.Point(
      p.x / this.#worldmap.width * this.#worldmap.scale.x,
      p.y / this.#worldmap.height * this.#worldmap.scale.y,
    );
  }

  w2s(p: PIXI.Point): PIXI.Point {
    return new PIXI.Point(
      p.x / this.#worldmap.scale.x * this.#worldmap.width,
      p.y / this.#worldmap.scale.y * this.#worldmap.height,
    );
  }
}

Graphics.queries = {
  circles: { components: [Circle, Position], listen: { added: true } },
};

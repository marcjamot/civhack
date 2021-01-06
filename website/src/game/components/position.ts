import { Component, Types } from "ecsy";

class Position extends Component<any> {}

Position.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
};

export { Position };

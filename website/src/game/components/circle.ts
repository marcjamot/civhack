import { Component, Types } from "ecsy";

class Circle extends Component<any> {}

Circle.schema = {
  color: { type: Types.Number },
  radius: { type: Types.Number },
};

export { Circle };

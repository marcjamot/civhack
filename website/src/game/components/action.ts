import { Component, Types } from "ecsy";

export class Action extends Component<any> {
  action: Function;

  constructor(props?: Partial<Omit<any, keyof Component<any>>> | false) {
    super(false);
    if (props) {
      this.action = props.action;
    }
  }

  copy(source: this): this {
    throw new Error("unimplemented");
  }
  clone(): this {
    throw new Error("unimplemented");
  }
  reset(): void {
    throw new Error("unimplemented");
  }
}

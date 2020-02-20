import {Deserializable} from "./deserializable.model";
export class Style  implements Deserializable{
    // tslint:disable-next-line: variable-name
    _id?: string;
    name?: string;
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
  }
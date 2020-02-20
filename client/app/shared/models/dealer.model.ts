import {Deserializable} from "./deserializable.model";
export class Dealer  implements Deserializable{
    // tslint:disable-next-line: variable-name
    _id?: string;
    name?: string;
    address?: string;
    phone?: string;
    website?: string;
    deserialize(input: any): this {
      Object.assign(this, input);
      return this;
    }
  }
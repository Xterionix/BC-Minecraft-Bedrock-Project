import { Defined } from "./Defined";
import { Using } from "./Used";

export interface DefinedUsing<T> extends Defined<T>, Using<T> {}

export namespace DefinedUsing {
  export function create<T>(using: T[] | undefined = undefined, defined: T[] | undefined = undefined): DefinedUsing<T> {
    if (!using) using = [];
    if (!defined) defined = [];

    return {
      defined: defined,
      using: using,
    };
  }
}

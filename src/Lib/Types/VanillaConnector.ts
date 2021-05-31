import { Container } from "./Container";
import { Identifiable } from "./Identifiable";

export interface VanillaConnector<T> {
  has(id: string): boolean;
  get(id: string): T | undefined;

  forEach(callbackfn: (value: T) => void, thisArg?: any): void;
}

export namespace VanillaConnector {
  export function createID<T extends Identifiable>(vanilla: T[], edu: T[], container: Container): VanillaConnector<T> {
    return new _VanillaObjConnector<T>(vanilla, edu, container);
  }

  export function createString(vanilla: string[], edu: string[], container: Container): VanillaConnector<string> {
    return new _VanillaStringConnector(vanilla, edu, container);
  }
}

class _VanillaObjConnector<T extends Identifiable> implements VanillaConnector<T> {
  private _container: Container;
  private _vanilla: T[];
  private _edu: T[];

  constructor(vanilla: T[], edu: T[], container: Container) {
    this._container = container;
    this._vanilla = vanilla;
    this._edu = edu;
  }

  isEdu() {
    return this._container.context.attributes["education.enable"] === "true";
  }

  has(id: string): boolean {
    if (Identifiable.has(this._vanilla, id)) return true;

    if (this.isEdu() && Identifiable.has(this._edu, id)) return true;

    return false;
  }

  get(id: string): T | undefined {
    let item = Identifiable.get(this._vanilla, id);
    if (item) return item;

    if (this.isEdu()) return Identifiable.get(this._edu, id);

    return undefined;
  }

  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    this._vanilla.forEach(callbackfn, thisArg);

    if (this.isEdu()) this._edu.forEach(callbackfn, thisArg);
  }
}

class _VanillaStringConnector implements VanillaConnector<string> {
  private _container: Container;
  private _vanilla: string[];
  private _edu: string[];

  constructor(vanilla: string[], edu: string[], container: Container) {
    this._container = container;
    this._vanilla = vanilla;
    this._edu = edu;
  }

  isEdu() {
    return this._container.context.attributes["education.enable"] === "true";
  }

  has(id: string): boolean {
    if (this._vanilla.includes(id)) return true;

    if (this.isEdu() && this._edu.includes(id)) return true;

    return false;
  }

  get(id: string): string | undefined {
    let item = this._vanilla.find((x) => x === id);
    if (item) return item;

    if (this.isEdu()) return this._edu.find((x) => x === id);

    return undefined;
  }

  forEach(callbackfn: (value: string) => void, thisArg?: any): void {
    this._vanilla.forEach(callbackfn, thisArg);

    if (this.isEdu()) this._edu.forEach(callbackfn, thisArg);
  }
}

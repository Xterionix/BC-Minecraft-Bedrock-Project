import { Types } from "bc-minecraft-bedrock-types";
import { Pack } from "../Pack/Pack";
import { PackCollection } from "../Pack/PackCollection";
import { DataSet } from "./DataSet";

/**
 *
 */
export class DataSetConnector<T extends Types.Identifiable & Types.Locatable, U extends Pack> {
  private _collection: PackCollection<U>;
  private _getDataset: (pack: U) => DataSet<T> | undefined;

  /**
   *
   * @param get
   * @param count
   */
  constructor(collection: PackCollection<U>, getDataset: (pack: U) => DataSet<T> | undefined) {
    this._collection = collection;
    this._getDataset = getDataset;
  }

  /**
   *
   * @param id
   * @returns
   */
  get(id: string): T | undefined {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    for (let I = 0; I < packs.length; I++) {
      const p = packs[I];

      const item = this._getDataset(p)?.get(id);
      if (item) return item;
    }

    return undefined;
  }

  /**
   *
   * @param id
   * @returns
   */
  has(id: string): boolean {
    return this.get(id) !== undefined;
  }

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument*/
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    for (let I = 0; I < packs.length; I++) {
      const p = packs[I];
      const dataset = this._getDataset(p);
      dataset?.forEach(callbackfn, thisArg);
    }
  }
}

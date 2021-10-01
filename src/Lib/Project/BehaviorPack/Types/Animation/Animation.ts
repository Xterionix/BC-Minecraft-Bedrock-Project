import { Types } from "bc-minecraft-bedrock-types";
import { MolangSet } from "bc-minecraft-molang";
import { MolangCarrier } from '../../../../Types/Carrier/Carrier';

//TODO add events

/** */
export interface Animation extends Types.BaseObject, MolangCarrier<MolangSet> {
  /** */
  molang: MolangSet;
}

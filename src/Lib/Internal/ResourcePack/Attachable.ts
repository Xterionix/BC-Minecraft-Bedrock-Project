import { Types } from "bc-minecraft-bedrock-types";
import { FormatVersion } from "../Types/FormatVersion";
import { ScriptContainer } from "../Types";

/** */
export interface Attachable extends FormatVersion {
  /** */
  readonly format_version: string;
  /** */
  "minecraft:attachable": AttachableContainer;
}

/** */
export interface AttachableContainer extends ScriptContainer {
  /** */
  description: AttachableDescription;
}

/** */
export interface AttachableDescription {
  /** */
  identifier: string;
  /** */
  materials?: {
    /** */
    default?: string;
    /** */
    enchanted?: string;
  };
  /** */
  animations?: Types.Definition;
  /** */
  animation_controllers?: string[];
  /** */
  particle_effects?: Types.Definition;
  /** */
  geometry?: Types.Definition;
  /** */
  sound_effects?: Types.Definition;
  /** */
  textures?: Types.Definition;
}

/** */
export namespace Attachable {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Attachable {
    if (
      value &&
      typeof value === "object" &&
      typeof value.format_version === "string" &&
      typeof value["minecraft:attachable"] === "object"
    ) {
      const desc = value["minecraft:attachable"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") return true;
    }

    return false;
  }
}

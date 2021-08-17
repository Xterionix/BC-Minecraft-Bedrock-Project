import { MCProject } from "bc-minecraft-project";
import { DataSet, DataSetBase } from "../../Types/DataSet/include";
import { Pack } from "../../Types/Pack/Pack";

import { TextDocument } from "../../Types/TextDocument/TextDocument";
import { FileType } from "./Enum/include";
import { Container } from "../../Types/Container/include";

import * as Animation from "./Types/Animation/include";
import * as AnimationController from "./Types/AnimationController/include";
import * as Attachable from "./Types/Attachable/include";
import * as Block from "./Types/Block/include";
import * as Entity from "./Types/Entity/include";
import * as Fog from "./Types/Fog/include";
import * as Particle from "./Types/Particle/include";
import * as Material from "./Types/Material/include";
import * as Model from "./Types/Model/include";
import * as Sound from "./Types/Sound/include";
import * as Texture from "./Types/Texture/include";

export class ResourcePack implements Container, Pack {
  /**The folder path of the pack*/
  readonly folder: string;
  /**The context of the project*/
  readonly context: MCProject;

  /**The collection of  animations*/
  readonly animations: DataSet<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController.AnimationController>;
  /**The collection of animations controllers*/
  readonly attachables: DataSet<Attachable.Attachable>;
  /**The collection of blocks*/
  readonly blocks: DataSet<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity>;
  /**The collection of fogs*/
  readonly fogs: DataSet<Fog.Fog>;
  /**The collection of materials*/
  readonly materials: DataSet<Material.Material>;
  /**The collection of models*/
  readonly models: DataSet<Model.Model>;
  /**The collection of models*/
  readonly particles: DataSet<Particle.Particle>;
  /**The collection of sounds*/
  readonly sounds: DataSet<Sound.Sound>;
  /**The collection of textures*/
  readonly textures: DataSet<Texture.Texture>;

  /**
   *
   * @param folder The folder of the behavior
   * @param Context The Mcproject data or the filepath to read from*/
  constructor(folder: string, Context: MCProject | string) {
    this.folder = folder;
    this.context = typeof Context === "object" ? Context : MCProject.loadSync(Context);

    this.animation_controllers = new DataSet();
    this.animations = new DataSet();
    this.attachables = new DataSet();
    this.blocks = new DataSet();
    this.entities = new DataSet();
    this.fogs = new DataSet();
    this.materials = new DataSet();
    this.models = new DataSet();
    this.particles = new DataSet();
    this.sounds = new DataSet();
    this.textures = new DataSet();
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument) {
    const Type = FileType.detect(doc.uri);

    switch (Type) {
      case FileType.animation:
        return this.animations.set(Animation.Process(doc));

      case FileType.animation_controller:
        return this.animation_controllers.set(AnimationController.Process(doc));

      case FileType.attachable:
        return this.attachables.set(Attachable.Process(doc));

      case FileType.entity:
        return this.entities.set(Entity.Process(doc));

      case FileType.fog:
        return this.fogs.set(Fog.Process(doc));

      case FileType.material:
        return this.materials.set(Material.Process(doc));

      case FileType.model:
        return this.models.set(Model.Process(doc));

      case FileType.particle:
        return this.particles.set(Particle.Process(doc));

      case FileType.sounds_definitions:
        return this.sounds.set(Sound.Process(doc));

      case FileType.texture_item_atlas:
      case FileType.texture_terrain_atlas:
        return this.textures.set(Texture.ProcessTextureAtlas(doc));
    }
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(uri: string): DataSetBase | undefined {
    const Type = FileType.detect(uri);

    switch (Type) {
      case FileType.animation:
        return this.animations;

      case FileType.animation_controller:
        return this.animation_controllers;

      case FileType.attachable:
        return this.attachables;

      case FileType.entity:
        return this.entities;

      case FileType.fog:
        return this.fogs;

      case FileType.material:
        return this.materials;

      case FileType.model:
        return this.models;

      case FileType.particle:
        return this.particles;

      case FileType.sounds_definitions:
        return this.sounds;

      case FileType.texture_item_atlas:
      case FileType.texture_terrain_atlas:
        return this.textures;

      default:
        return undefined;
    }
  }

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out ||= this.animations.deleteFolder(uri);
    out ||= this.animation_controllers.deleteFolder(uri);
    out ||= this.attachables.deleteFolder(uri);
    out ||= this.blocks.deleteFolder(uri);
    out ||= this.entities.deleteFolder(uri);
    out ||= this.fogs.deleteFolder(uri);
    out ||= this.materials.deleteFolder(uri);
    out ||= this.models.deleteFolder(uri);
    out ||= this.particles.deleteFolder(uri);
    out ||= this.sounds.deleteFolder(uri);
    out ||= this.textures.deleteFolder(uri);

    return out;
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    let out = false;

    out ||= this.animations.deleteFile(uri);
    out ||= this.animation_controllers.deleteFile(uri);
    out ||= this.attachables.deleteFile(uri);
    out ||= this.blocks.deleteFile(uri);
    out ||= this.entities.deleteFile(uri);
    out ||= this.fogs.deleteFile(uri);
    out ||= this.materials.deleteFile(uri);
    out ||= this.models.deleteFile(uri);
    out ||= this.particles.deleteFile(uri);
    out ||= this.sounds.deleteFile(uri);
    out ||= this.textures.deleteFile(uri);

    return out;
  }
}

/**
 *
 */
export namespace ResourcePack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is ResourcePack {
    if (typeof value === "object") {
      const temp = <ResourcePack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.attachables !== "object") return false;
      if (typeof temp.fogs !== "object") return false;
      if (typeof temp.materials !== "object") return false;
      if (typeof temp.models !== "object") return false;
      if (typeof temp.particles !== "object") return false;
      if (typeof temp.sounds !== "object") return false;
      if (typeof temp.textures !== "object") return false;

      if (typeof temp.animations !== "object") return false;
      if (typeof temp.animation_controllers !== "object") return false;
      if (typeof temp.blocks !== "object") return false;
      if (typeof temp.entities !== "object") return false;

      if (typeof temp.context !== "object") return false;
      if (typeof temp.folder !== "string") return false;

      return true;
    }

    return false;
  }
}

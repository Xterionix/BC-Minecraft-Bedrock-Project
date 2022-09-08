import * as internal from "../../../../Internal/ResourcePack/TextureAtlas";
import { Json } from "../../../../Internal/Json";
import { Types } from "bc-minecraft-bedrock-types";
import { TextDocument } from "../../../Types/TextDocument";
import { Texture } from "./Texture";
import { Documentation } from "../../../Types/Documentation";
import { SMap } from "../../../Types/Map";

/**
 *
 * @param doc
 * @returns
 */
export function ProcessTextureAtlas(doc: TextDocument): Texture[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<internal.TextureAtlas>(doc);

  if (!internal.TextureAtlas.is(imp)) return undefined;

  const container = imp.texture_data;
  const out: Texture[] = [];

  SMap.forEach(container, (value, key) => {
    out.push({
      id: key,
      location: Types.Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Texture: ${key}`),
    });
  });

  return out;

  return;
}

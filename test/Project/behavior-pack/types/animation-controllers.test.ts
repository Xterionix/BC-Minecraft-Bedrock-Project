import { BehaviorPack } from "../../../../src/main";

describe("BehaviorPack - Animation Controller", () => {
  const data = `{
      "format_version": "1.8.0",
      "animation_controllers": {
        "controller.animation.example.base_pose": { "states": { "default": { "animations": [{ "base_pose": 0 }] } } }
      }
    }`;

  test("Process", () => {
    const controllers = BehaviorPack.AnimationController.Process({
      getText: () => data,
      uri: "example",
    });
    expect(controllers).toMatchSnapshot();
  });
});

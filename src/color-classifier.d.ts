declare module "color-classifier" {
    export const Palette: { RAINBOW: string[] };
    export const AlgorithmTypes: { HSV: string };
    export default class ColorClassifier {
        constructor(palette: string[], algorithm: string);
        classify(color: string, format: "hex"): string;
    }
}

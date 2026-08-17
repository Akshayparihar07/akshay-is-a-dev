/// <reference types="astro/client" />

declare module "eva-icons" {
  export type EvaAnimationType = "zoom" | "pulse" | "shake" | "flip";

  export interface EvaAnimation {
    type: EvaAnimationType;
    hover?: boolean;
    infinite?: boolean;
  }

  export interface EvaIcon {
    name: string;
    contents: string;
    toSvg(attrs?: Record<string, unknown> & { animation?: EvaAnimation }): string;
  }

  export const icons: Record<string, EvaIcon>;
  export function replace(options?: Record<string, unknown>): void;

  const eva: { icons: Record<string, EvaIcon>; replace: typeof replace };
  export default eva;
}

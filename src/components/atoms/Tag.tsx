import RNG from "rand-seed";
import { lerp } from "../../utils";

export type TagProps = {
  title: string;
  variant?: "filled" | "outlined";
};

export default function Tag({ title, variant }: TagProps) {
  const rand: number = new RNG(title).next();
  const randomHue = `hsl(${lerp(0, 360, rand)}deg,100%,80%`;

  console.log(title, randomHue);

  const variantFilled: string = `${randomHue}`;
  const variantOutlined: string = `outline  outline-1 outline-primary `;
  return (
    <div
      className={`
        ${variant === "filled" ? variantFilled : variantOutlined}
        px-2.5 py-1 
        rounded-md
        text-sm
        `}
      style={{
        backgroundColor: variant === "filled" ? randomHue : "none",
        outlineColor: variant === "filled" ? "none" : randomHue,
      }}
    >
      {title}
    </div>
  );
}

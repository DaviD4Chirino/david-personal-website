import RNG from "rand-seed";
import { getContrastHex, lerp } from "../../utils";

export type TagProps = {
  title: string;
  variant?: "filled" | "outlined";
};
const colorPallettes = {
  Godot: "#478cbf",
};
export default function Tag({ title, variant }: TagProps) {
  const hasPallette = Object.keys(colorPallettes).findIndex((i) => i == title);

  let color = "";
  let textColor = "";

  if (hasPallette > -1) {
    const c = Object.values(colorPallettes)[hasPallette];
    color = c;
    textColor = getContrastHex(c);
  } else {
    const rand: number = new RNG(title).next();
    color = `hsl(${lerp(0, 360, rand)}deg,100%,70%`;
  }

  const variantFilled: string = `${color}`;
  const variantOutlined: string = `outline  outline-1 `;

  return (
    <span
      className={`
        ${variant === "filled" ? variantFilled : variantOutlined}
        px-2.5 py-1 
        rounded-md
        text-sm
        whitespace-nowrap
        `}
      style={{
        backgroundColor: variant === "filled" ? color : "none",
        outlineColor: variant === "filled" ? "none" : color,
        color: textColor ? textColor : "",
      }}
    >
      {title}
    </span>
  );
}

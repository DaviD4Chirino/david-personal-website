export type TagProps = {
  title: string;
  variant?: "filled" | "outlined";
};

export default function Tag({ title, variant }: TagProps) {
  const variantFilled: string = "bg-primary text-[white]";
  const variantOutlined: string = "outline outline-1 outline-primary ";
  return (
    <div
      className={`
        ${variant === "filled" ? variantFilled : variantOutlined}
        px-2.5 py-1 
        rounded-md
        text-sm
        `}
    >
      {title}
    </div>
  );
}

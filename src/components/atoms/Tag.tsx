export type TagProps = {
  title: string;
  href: string;
  variant?: "filled" | "outlined";
};

export default function Tag({ title, href, variant }: TagProps) {
  const variantFilled: string = "bg-primary text-[white]";
  const variantOutlined: string = "outline outline-1 outline-primary ";
  return (
    <a
      href={href}
      className={`
        ${variant === "filled" ? variantFilled : variantOutlined}
        px-2.5 py-1 
        rounded-full
        no_underline hover:underline
        text-sm
        `}
    >
      {title}
    </a>
  );
}

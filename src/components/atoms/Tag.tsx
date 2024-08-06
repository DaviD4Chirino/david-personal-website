import { Chip } from "@mui/material";

export type TagProps = {
  title: string;
  href: string;
};

export default function Tag({ title, href }: TagProps) {
  return (
    <Chip
      component="a"
      href={href}
      label={title}
      color="primary"
      variant="outlined"
      className="no_underline"
      clickable
    />
  );
}

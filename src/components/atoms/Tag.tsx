import { Chip, ChipProps } from "@mui/material";

export type TagProps = {
  title: string;
  href: string;
  chipProps?: ChipProps;
};

export default function Tag({ title, href, chipProps }: TagProps) {
  return (
    <Chip
      component="a"
      href={href}
      label={title}
      color="primary"
      variant={chipProps?.variant || "outlined"}
      className="no_underline"
      clickable
      {...chipProps}
    />
  );
}

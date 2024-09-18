import { Dropdown } from "flowbite-react";

export function DropItem({
  name,
  title,
  onClick,
  icon,
}: {
  name: string;
  title: string;
  onClick: (name: orders) => void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Dropdown.Item onClick={() => onClick(name as orders)} icon={icon}>
      {title}
    </Dropdown.Item>
  );
}

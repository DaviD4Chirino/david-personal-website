import {
  FaCheckCircle as SuccessI,
  FaTimesCircle as ErrorI,
  FaExclamationTriangle as WarningI,
  FaInfoCircle as InfoI,
} from "react-icons/fa";

type ToastTypes = "success" | "error" | "warning" | "info";

export type ToastProps = {
  type: ToastTypes;
  message: string;
};

type ToastPresets = {
  [type in ToastTypes]: ToastPreset;
};

type ToastPreset = {
  icon: React.ReactNode;
  bgColor: string;
  color: string;
};
// * You can apply this into the ToastContainer however you want
// You may want to have an icon provider
const iconClassName: string = "size-7 ";

const toastPresets: ToastPresets = {
  success: {
    icon: <SuccessI className={iconClassName} />,
    bgColor: "bg-[green]",
    color: "text-[white]",
  },
  error: {
    icon: <ErrorI className={iconClassName} />,
    bgColor: "bg-[red]",
    color: "text-[white]",
  },
  warning: {
    icon: <WarningI className={iconClassName} />,
    bgColor: "bg-[orange]",
    color: "text-[black]",
  },
  info: {
    icon: <InfoI className={iconClassName} />,
    bgColor: "bg-[blue]",
    color: "text-[white]",
  },
};

export default function Toast({ type, message }: ToastProps) {
  const { bgColor, color, icon }: ToastPreset = toastPresets[type];
  return (
    <span
      className={`
        toast toast-${type} 
        ${bgColor}
        ${color}
        rounded-md p-4
        grid grid-cols-[auto_1fr] gap-3
    `}
    >
      {icon}
      <p className="self-center line-clamp-1 ">{message}</p>
    </span>
  );
}

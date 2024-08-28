import {
  FaCheckCircle as SuccessI,
  FaTimesCircle as ErrorI,
  FaExclamationTriangle as WarningI,
  FaInfoCircle as InfoI,
} from "react-icons/fa";
import { useToast } from "./useToast";
import { useTimeoutFn } from "react-use";

type ToastTypes = "success" | "error" | "warning" | "info";

export type ToastProps = {
  type: ToastTypes;
  message: string;
  /** In ms */
  duration: number;
  id: number;
};

type ToastPresets = {
  [type in ToastTypes]: ToastPreset;
};

type ToastPreset = {
  icon: React.ReactNode;
  className: string;
};
// * You can apply this into the ToastContainer however you want
// You may want to have an icon provider
const iconClassName: string = "size-7 ";

const toastPresets: ToastPresets = {
  success: {
    icon: <SuccessI className={iconClassName} />,
    className: "bg-[green] text-[white]",
  },
  error: {
    icon: <ErrorI className={iconClassName} />,
    className: "bg-[red] text-[white]",
  },
  warning: {
    icon: <WarningI className={iconClassName} />,
    className: "bg-[orange] text-[black]",
  },
  info: {
    icon: <InfoI className={iconClassName} />,
    className: "bg-[blue] text-[white]",
  },
};

export default function Toast({
  type,
  message,
  id,
  duration = 5000,
}: ToastProps) {
  const { className, icon }: ToastPreset = toastPresets[type];

  const toast = useToast();

  function handleRemoval() {
    toast.remove(id);
  }

  function handleClick() {
    handleRemoval();
  }
  useTimeoutFn(handleRemoval, duration);

  return (
    <button
      onClick={handleClick}
      className={`
        toast toast-${type} 
        relative isolate
        rounded-md p-4
        text-left
        grid grid-cols-[auto_1fr] gap-3
        animate-fade-left animate-duration-[400ms] 
        ${className}
    `}
    >
      {icon}
      <p className="self-center line-clamp-1">{message}</p>
    </button>
  );
}

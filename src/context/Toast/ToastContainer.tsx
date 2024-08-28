import Toast, { ToastProps } from "./Toast";

type ToastContainerProps = {
  toasts: ToastProps[];
};

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="grid h-max gap-2" id="ToastContainer">
      {toasts.map((toast, i) => (
        <Toast {...toast} key={i} />
      ))}
    </div>
  );
}

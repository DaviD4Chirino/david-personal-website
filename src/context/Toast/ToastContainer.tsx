import Toast, { ToastProps } from "./Toast";
type ToastContainerProps = {
  toasts: ToastProps[];
};

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div
      tabIndex={-1}
      className="
   
    p-5 
    fixed top-0 right-0 left-0 bottom-0 
    z-50  pointer-events-none
    flex place-items-end place-content-end
    "
    >
      <div
        className="
        grid gap-2 
        h-max w-full sm:w-[30rem] 
        pointer-events-auto"
        id="ToastContainer"
      >
        {toasts.map((toast) => (
          <Toast {...toast} key={toast.id} />
        ))}
      </div>
    </div>
  );
}

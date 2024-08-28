import { ToastProps } from "./Toast";

type Actions = "ADD_TOAST" | "DELETE_TOAST";

// toastReducer.js
export function toastReducer(
  state: { toasts: ToastProps[] },
  action: { type: Actions; payload: ToastProps }
) {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload.id
      );
      return {
        ...state,
        toasts: updatedToasts,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

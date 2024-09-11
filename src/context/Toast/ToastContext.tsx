"use client";
import { createContext, useReducer } from "react";
import { toastReducer } from "./ToastReducer";
import { ToastProps } from "./Toast";
import ToastContainer from "./ToastContainer";

type ToastContextValues = {
  addToast: (message: ToastProps["message"], type: ToastProps["type"]) => void;
  success: (message: ToastProps["message"]) => void;
  error: (message: ToastProps["message"]) => void;
  warning: (message: ToastProps["message"]) => void;
  info: (message: ToastProps["message"]) => void;
  remove: (id: ToastProps["id"]) => void;
};

const initialValues: ToastContextValues = {
  addToast: function (
    _message: ToastProps["message"],
    _type: ToastProps["type"]
  ): void {
    throw new Error("Function not implemented.");
  },
  success: function (_message: ToastProps["message"]): void {
    throw new Error("Function not implemented.");
  },
  error: function (_message: ToastProps["message"]): void {
    throw new Error("Function not implemented.");
  },
  warning: function (_message: ToastProps["message"]): void {
    throw new Error("Function not implemented.");
  },
  info: function (_message: ToastProps["message"]): void {
    throw new Error("Function not implemented.");
  },
  remove: function (_id: ToastProps["id"]): void {
    throw new Error("Function not implemented.");
  },
};

export const ToastContext = createContext<ToastContextValues>(initialValues);

let initialState = {
  toasts: [],
};

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  function addToast(message: ToastProps["message"], type: ToastProps["type"]) {
    dispatch({
      type: "ADD_TOAST",
      payload: {
        id: Math.floor(Math.random() * 100000),
        type,
        message,
        duration: 5000,
      },
    });
  }

  function success(message: ToastProps["message"]) {
    addToast(message, "success");
  }

  function warning(message: ToastProps["message"]) {
    addToast(message, "warning");
  }

  function info(message: ToastProps["message"]) {
    addToast(message, "info");
  }

  function error(message: ToastProps["message"]) {
    addToast(message, "error");
  }

  function remove(id: ToastProps["id"]) {
    dispatch({
      type: "DELETE_TOAST",
      payload: { id: id, message: "", type: "error", duration: 5000 },
    });
  }

  const values: ToastContextValues = {
    addToast,
    success,
    warning,
    info,
    error,
    remove,
  };
  return (
    <ToastContext.Provider value={values}>
      <ToastContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
}

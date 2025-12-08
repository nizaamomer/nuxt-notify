// runtime/types/toast.ts

export type ToastColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "neutral";

export type ToastOrientation = "vertical" | "horizontal";

export type ToastUI = Partial<{
  root: string;
  wrapper: string;
  title: string;
  description: string;
  icon: string;
  avatar: string;
  actions: string;
  progress: string;
  close: string;
}>;

export interface ToastAction {
  label: string;
  icon?: string;
  color?: ToastColor;
  variant?: "solid" | "outline" | "soft" | "ghost" | "link";
  class?: string;
  onClick?: (e?: Event) => void;
}

export interface ToastClose {
  color?: ToastColor;
  variant?: "solid" | "outline" | "soft" | "ghost" | "link";
  class?: string;
}

export interface ToastAvatar {
  src?: string;
  alt?: string;
  icon?: string;
  text?: string;
}

export interface ToastProgress {
  color?: ToastColor;
}

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  maxToasts?: number;
  avatar?: ToastAvatar;
  color?: ToastColor;
  orientation?: ToastOrientation;
  close?: boolean | ToastClose;
  closeIcon?: string;
  actions?: ToastAction[];
  progress?: boolean | ToastProgress;
  duration?: number;
  callback?: () => void;

  ui?: ToastUI;
  showIcon?: boolean;
}

export interface ToastOptions extends Omit<Toast, "id"> {}

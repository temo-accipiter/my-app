/**
 * Component prop types
 * Shared types for component props across the application
 */

import type { ReactNode } from "react";

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Button variants (matching shadcn/ui button)
export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// Card props
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
}

// Modal/Dialog props
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

// Form field props
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
}

// Input props
export interface InputProps extends FormFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

// Select props
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends FormFieldProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

// Table props
export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (value: unknown, row: T) => ReactNode;
  sortable?: boolean;
}

export interface TableProps<T> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

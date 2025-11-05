/**
 * Common types used across the application
 * These are generic, reusable types that don't belong to a specific domain
 */

// Utility types for better type inference
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// ID types - helps distinguish different ID types
export type UserId = string & { readonly brand: unique symbol };
export type PostId = string & { readonly brand: unique symbol };

// Common status types
export type Status = "idle" | "loading" | "success" | "error";

// Generic async state
export interface AsyncState<T = unknown, E = Error> {
  status: Status;
  data: T | null;
  error: E | null;
}

// Pagination types
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Generic API error
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

// Date range
export interface DateRange {
  from: Date;
  to: Date;
}

// Generic filter type
export type SortOrder = "asc" | "desc";

export interface SortParams<T = string> {
  field: T;
  order: SortOrder;
}

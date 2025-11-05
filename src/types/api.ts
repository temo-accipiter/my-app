/**
 * API-related types
 * Types for API requests, responses, and error handling
 */

import type { ApiError, PaginatedResponse } from "./common";

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

// Generic API error response
export interface ApiErrorResponse {
  success: false;
  error: ApiError;
}

// HTTP methods
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Request configuration
export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

// Example API types - replace with your actual API structure

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// API response types
export type GetUsersResponse = PaginatedResponse<User>;
export type GetUserResponse = ApiResponse<User>;
export type CreateUserResponse = ApiResponse<User>;
export type UpdateUserResponse = ApiResponse<User>;
export type DeleteUserResponse = ApiResponse<{ success: boolean }>;

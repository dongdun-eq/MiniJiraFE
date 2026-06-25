import { isAxiosError } from "axios";

interface BackendErrorShape1 {
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
}

interface BackendErrorShape2 {
  error: {
    code: string;
    message: string;
    details: Array<{ field: string; message: string }>;
  };
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (!isAxiosError(error)) {
    return fallback;
  }

  const data = error.response?.data;
  if (!data || typeof data !== "object") {
    return fallback;
  }

  // Dạng 2 — validation chi tiết theo field. Ưu tiên ghép các field
  // lỗi cụ thể lại thành 1 message dễ đọc, vd:
  // "title: Title is required, dueDate: Invalid date format"
  if ("error" in data) {
    const shape2 = data as BackendErrorShape2;
    const details = shape2.error?.details;
    if (Array.isArray(details) && details.length > 0) {
      return details.map((d) => `${d.field}: ${d.message}`).join("; ");
    }
    if (shape2.error?.message) {
      return shape2.error.message;
    }
    return fallback;
  }

  // Dạng 1 — lỗi chung
  if ("message" in data) {
    const shape1 = data as BackendErrorShape1;
    if (Array.isArray(shape1.message)) {
      return shape1.message.join("; ");
    }
    if (typeof shape1.message === "string") {
      return shape1.message;
    }
  }

  return fallback;
}

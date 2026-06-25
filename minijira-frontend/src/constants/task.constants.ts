// Giá trị trạng thái hệ thống
export const STATUS_BACKLOG = "backlog";
export const STATUS_TODO = "todo";
export const STATUS_IN_PROGRESS = "in-progress";
export const STATUS_DONE = "done";
export const TASK_STATUS_DONE = "done"; // Trùng lặp, dùng chung STATUS_DONE

// Giá trị mức độ ưu tiên hệ thống
export const PRIORITY_LOW = "low";
export const PRIORITY_MEDIUM = "medium";
export const PRIORITY_HIGH = "high";
export const PRIORITY_CRITICAL = "critical";

// Giá trị khởi tạo mặc định cho Form
export const TASK_FORM_DEFAULT_PRIORITY = "medium";
export const TASK_FORM_DEFAULT_STATUS = "todo";
export const TASK_FORM_DEFAULT_TITLE = "";
export const TASK_FORM_DEFAULT_DUE_DATE = "";

// React Hook Form fields
export const FORM_FIELD_TITLE = "title";
export const FORM_FIELD_STATUS = "status";
export const FORM_FIELD_PRIORITY = "priority";
export const FORM_FIELD_DUE_DATE = "dueDate";
export const FORM_FIELD_ASSIGNEE_ID = "assigneeId";
export const FORM_FIELD_NAME = "name";
export const FORM_FIELD_EMAIL = "email";
export const FORM_FIELD_PASSWORD = "password";
export const FORM_FIELD_CONFIRM_PASSWORD = "confirmPassword";
export const FORM_FIELD_AVATAR_URL = "avatarUrl";
export const FORM_FIELD_REMEMBER_ME = "rememberMe";

// DOM IDs cho Form / Input fields
export const HTML_ID_TASK_TITLE = "task-title";
export const HTML_ID_TITLE_ERROR = "title-error";
export const HTML_ID_TASK_PRIORITY = "task-priority";
export const HTML_ID_TASK_DUE = "task-due";
export const HTML_ID_NAME = "name";
export const HTML_ID_EMAIL = "email";
export const HTML_ID_PASSWORD = "password";
export const HTML_ID_CONFIRM_PASSWORD = "confirmPassword";
export const HTML_ID_IMAGE_URL = "imageUrl";
export const HTML_ID_MAIN_SIDEBAR = "main-sidebar";

// Reducer Action loại Modal Task cũ
export const TASK_MODAL_ACTION_OPEN_CREATE = "OPEN_CREATE";
export const TASK_MODAL_ACTION_OPEN_EDIT = "OPEN_EDIT";
export const TASK_MODAL_ACTION_CLOSE = "CLOSE";
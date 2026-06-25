// Biến thể hiển thị (Variants / Thẩm mỹ)
export const DIALOG_VARIANT_DANGER = "danger";
export const DIALOG_VARIANT_PRIMARY = "primary";
export const COLOR_ACCENT_DEFAULT = "var(--color-accent)";
export const COLOR_ACCENT_HOVER = "var(--color-accent-hover)";

// Loại thông báo Toast
export const TOAST_TYPE_SUCCESS = "success";
export const TOAST_TYPE_ERROR = "error";
export const TOAST_TYPE_INFO = "info";

// Tiêu đề & Văn bản hiển thị tĩnh trên giao diện
export const APP_LAYOUT_TITLE = "Sprint Board";
export const APP_LAYOUT_SEARCH_PLACEHOLDER = "Tìm kiếm tác vụ...";
export const ERROR_BOUNDARY_DEFAULT_TITLE = "Đã có lỗi xảy ra";
export const ERROR_BOUNDARY_DEFAULT_MESSAGE = "Trang gặp lỗi không mong muốn. Bạn có thể thử lại hoặc tải lại trang.";
export const ERROR_BOUNDARY_BTN_RETRY = "Thử lại";
export const ERROR_BOUNDARY_BTN_RELOAD = "Tải lại trang";
export const SIDEBAR_LOG_IN_TEXT = "Log In";
export const SIDEBAR_LOG_OUT_TEXT = "Log out";
export const SIDEBAR_WELCOME_PREFIX = "Hi,";
export const SIDEBAR_AVATAR_FALLBACK_DEFAULT = "U";
export const TITLE_FIELD_LABEL = "Title";
export const TITLE_FIELD_PLACEHOLDER = "What needs to be done?";
export const STATUS_FIELD_LABEL = "Status";
export const PRIORITY_FIELD_LABEL = "Priority";
export const DUE_DATE_FIELD_LABEL = "Due Date";
export const ASSIGNEE_FIELD_LABEL = "Assignee";
export const CREATE_BUTTON_TEXT = "Create";
export const LOGIN_TEXT_SHOW = "Show";
export const LOGIN_TEXT_HIDE = "Hide";
export const LOGIN_TEXT_LOGGING_IN = "Logging in...";
export const LOGIN_TEXT_LOG_IN = "Log In";
export const REGISTER_TEXT_SHOW = "Show";
export const REGISTER_TEXT_HIDE = "Hide";
export const REGISTER_TEXT_CREATING_ACCOUNT = "Creating account...";
export const REGISTER_TEXT_SIGN_UP = "Sign Up";

// Nhãn nút bấm trong Footer / Header các Modal
export const FOOTER_BTN_TEXT_DELETE = "Delete";
export const FOOTER_BTN_TEXT_CANCEL = "Cancel";
export const FOOTER_BTN_TEXT_SAVING = "Saving…";
export const FOOTER_BTN_TEXT_SAVE_CHANGES = "Save changes";
export const FOOTER_BTN_TEXT_CREATE_TASK = "Create task";
export const HEADER_TEXT_EDIT_TASK = "Edit Task";
export const HEADER_TEXT_CREATE_TASK = "Create Task";

// Hiển thị text mức độ ưu tiên trên Card
export const TASK_PRIORITY_CRITICAL = "Critical";
export const TASK_PRIORITY_HIGH = "High";
export const TASK_PRIORITY_MEDIUM = "Medium";
export const TASK_PRIORITY_LOW = "Low";
export const TASK_PRIORITY_NONE = "None";

// Nhãn văn bản cho Dialog xác nhận (Confirm labels)
export const CONFIRM_DIALOG_DEFAULT_CANCEL_LABEL = "Hủy";
export const CONFIRM_DIALOG_DEFAULT_CONFIRM_LABEL = "Xác nhận";
export const MODAL_CONFIRM_LABEL_CANCEL = "Not yet";
export const MODAL_CONFIRM_LABEL_CONFIRM = "Sure";

// Nội dung chuỗi thông điệp Confirm Dialog
export const MODAL_CONFIRM_SAVE_TITLE = "Save task?";
export const MODAL_CONFIRM_SAVE_MESSAGE = "Task data is changed. Are you sure to leave without saving?";
export const MODAL_CONFIRM_UPDATE_TITLE = "Update task";
export const MODAL_CONFIRM_UPDATE_MESSAGE = "Are you sure to update this task";
export const MODAL_CONFIRM_DELETE_TITLE = "Delete task";
export const MODAL_CONFIRM_DELETE_MESSAGE = "Are you sure to delete this task";

// Thông điệp Validation lỗi (Form validation)
export const TITLE_VALIDATION_REQUIRED = "Title is required";
export const LOGIN_VALIDATION_EMAIL_REQUIRED = "Email is required";
export const LOGIN_VALIDATION_EMAIL_INVALID = "Invalid email address";
export const LOGIN_VALIDATION_PASSWORD_REQUIRED = "Password is required";
export const REGISTER_VALIDATION_NAME_REQUIRED = "Full name is required";
export const REGISTER_VALIDATION_EMAIL_REQUIRED = "Email is required";
export const REGISTER_VALIDATION_EMAIL_INVALID = "Invalid email address";
export const REGISTER_VALIDATION_URL_INVALID = "Invalid URL format";
export const REGISTER_VALIDATION_PASSWORD_REQUIRED = "Password is required";
export const REGISTER_VALIDATION_CONFIRM_PASSWORD_REQUIRED = "Please confirm your password";
export const REGISTER_VALIDATION_PASSWORD_MISMATCH = "Passwords do not match";

// Thông báo Toast nội dung
export const TOAST_INFO_NO_CHANGES = "You changed nothing. Dont have to update";
export const TOAST_SUCCESS_TASK_CREATED = "Task created";
export const TOAST_SUCCESS_TASK_UPDATED = "Task updated";
export const TOAST_SUCCESS_TASK_DELETED = "Task deleted";
export const TOAST_SUCCESS_LOGIN = "Logged in successfully";
export const TOAST_SUCCESS_LOGOUT = "Logged out";
export const TOAST_SUCCESS_REGISTER = "Register successfully";
export const TOAST_ERROR_REGISTER_FAILED = "Register failed";

// Lỗi nghiệp vụ hoặc Lỗi Context hệ thống
export const TOAST_ERROR_TASK_CREATE_FAILED = "Failed to create task";
export const TOAST_ERROR_TASK_UPDATE_FAILED = "Failed to update task";
export const TOAST_ERROR_STATUS_UPDATE_FAILED = "Failed to update status";
export const TOAST_ERROR_TASK_DELETE_FAILED = "Failed to delete task";
export const TOAST_ERROR_LOGIN_FAILED = "Login failed";
export const TOAST_ERROR_LOAD_PROFILE_FAILED = "Failed to load profile";
export const ERROR_CONFIRM_DIALOG_CONTEXT_OUTSIDE_PROVIDER = "useConfirm phải đặt trong ConfirmProvider";
export const ERROR_TASK_MODAL_CONTEXT_OUTSIDE_PROVIDER = "useModal must be used inside <ModalProvider>";
export const ERROR_TOAST_CONTEXT_OUTSIDE_PROVIDER = "useToast must be used inside <ToastProvider>";
export const ERROR_UNDEFINED = "Undefined error";
export const ERROR_SESSION_EXPIRED = "Session expired";

// Logs hệ thống trong Console
export const ERROR_BOUNDARY_LOG_PREFIX = "ErrorBoundary caught:";
export const LOG_ERROR_PREFIX = "Error when ";
export const LOG_ERROR_UPDATING = "updating";
export const LOG_ERROR_CREATING = "creating";

// Khối ARIA Roles & Accessibility Attributes
export const ERROR_BOUNDARY_ARIA_ROLE = "alert";
export const ARIA_CURRENT_PAGE = "page";
export const SIDEBAR_ARIA_LABEL = "Main Sidebar";
export const SIDEBAR_NAV_ARIA_LABEL_SUFFIX = "navigation";
export const SIDEBAR_ARIA_LOGIN = "Log in to MiniJira";
export const SIDEBAR_ARIA_LOGOUT_PREFIX = "Log out from account";
export const TASK_CARD_ARIA_PREFIX = "Task";
export const TASK_CARD_ARIA_OVERDUE = "Overdue";
export const TASK_CARD_ARIA_TITLE_LABEL = "Title:";
export const TASK_CARD_ARIA_PRIORITY_LABEL = "Priority:";
export const TASK_CARD_ARIA_ASSIGNED_TO = "Assigned to:";
export const TASK_CARD_ARIA_UNASSIGNED = "Unassigned";
export const TASK_CARD_ARIA_SHORTCUT_HINT = "Press Enter to view details.";
export const TASK_MODAL_ARIA_ROLE = "dialog";
export const TASK_MODAL_ARIA_EDIT = "Edit task";
export const TASK_MODAL_ARIA_CREATE = "Create task";
export const HEADER_ARIA_LABEL_CLOSE = "Close";
export const TOAST_CONTAINER_ARIA_ROLE = "region";
export const TOAST_ARIA_ROLE_ALERT = "alert";
export const TOAST_ARIA_ROLE_STATUS = "status";
export const TOAST_CONTAINER_ARIA_LABEL = "Notifications";
export const TOAST_BTN_ARIA_LABEL_DISMISS = "Dismiss notification";
export const APP_LAYOUT_BANNER_ROLE = "banner";
export const APP_LAYOUT_SEARCH_ROLE = "search";
export const APP_LAYOUT_ARIA_CLOSE_MENU = "Close sidebar menu";
export const APP_LAYOUT_ARIA_OPEN_MENU = "Open sidebar menu";
export const APP_LAYOUT_ARIA_SEARCH_TASKS = "Search tasks";
export const APP_LAYOUT_ARIA_CLEAR_SEARCH = "Clear search text";
export const APP_LAYOUT_ARIA_MAIN_CONTENT = "Main Content Area";
export const APP_LAYOUT_KEY_SHORTCUT_CREATE = "Alt+N";
export const CREATE_BUTTON_ARIA_LABEL = "Create new task";
export const CREATE_BUTTON_KEYSHORTCUTS_DEFAULT = "Alt+N";
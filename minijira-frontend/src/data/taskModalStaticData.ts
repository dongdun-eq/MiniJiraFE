import styles from "../components/TaskModal/TaskModal.module.css"
import type { Priority, Status } from "../types";

/* ---- Static data ---- */
export const ASSIGNEES = [
  { id: "user-123", name: "An Nguyen", initials: "AN", colorIdx: 0 },
  { id: "user-456", name: "Bao Tran", initials: "BT", colorIdx: 1 },
  { id: "user-789", name: "Chi Le", initials: "CL", colorIdx: 2 },
  { id: "user-012", name: "Duc Pham", initials: "DP", colorIdx: 3 },
];

export const STATUS_OPTIONS: { id: Status; label: string; activeClass: string }[] = [
  { id: "backlog", label: "Backlog", activeClass: styles.activeBacklog },
  { id: "todo", label: "To Do", activeClass: styles.activeTodo },
  { id: "in-progress", label: "In Progress", activeClass: styles.activeIp },
  { id: "done", label: "Done", activeClass: styles.activeDone },
];

export const PRIORITY_OPTIONS: {
  value: Priority;
  label: string;
  dotClass: string;
  labelClass: string;
}[] = [
  {
    value: "critical",
    label: "Critical",
    dotClass: styles.dotCritical,
    labelClass: styles.priorityLabelCritical,
  },
  {
    value: "high",
    label: "High",
    dotClass: styles.dotHigh,
    labelClass: styles.priorityLabelHigh,
  },
  {
    value: "medium",
    label: "Medium",
    dotClass: styles.dotMedium,
    labelClass: styles.priorityLabelMedium,
  },
  {
    value: "low",
    label: "Low",
    dotClass: styles.dotLow,
    labelClass: styles.priorityLabelLow,
  },
];
import React from "react";
import { useUsers } from "../../hooks/user.hook";
import useTaskFilters from "../../hooks/useTaskFilters";
import { PRIORITY_ARRAY, STATUS_ARRAY } from "../../types";
import { capitalize } from "../../utils/string";
import { IconClose, IconFilter, IconGrid, IconList } from "../Icons/Icons";
import styles from "./BoardToolBar.module.css";

const BoardToolBar = () => {
  const { data: users } = useUsers();
  const { params, setParams } = useTaskFilters();

  const hasFilters = !!(
    params.status ||
    params.minDueDate ||
    params.maxDueDate ||
    params.assigneeId ||
    params.priority
  );

  const clearFilter = () => {
    setParams({
      status: undefined,
      assigneeId: undefined,
      priority: undefined,
      minDueDate: undefined,
      maxDueDate: undefined,
    });
  };

  const currentStatus = params.status ?? "";
  const handleStatusChange = (status: string) => {
    setParams({ status: status });
  };

  const currentMinDueDate = params.minDueDate ?? "";
  const handleDueDateMinChange = (dueDate: string) => {
    setParams({ minDueDate: dueDate });
  };

  const currentMaxDueDate = params.maxDueDate ?? "";
  const handleDueDateMaxChange = (dueDate: string) => {
    setParams({ maxDueDate: dueDate });
  };

  const currentPriorities = params.priority ? params.priority.split(",") : [];
  const handlePriorityChange = (priority: string) => {
    let nextPriorities = [...currentPriorities];
    if (nextPriorities.find((val) => priority === val))
      nextPriorities = nextPriorities.filter((val) => val !== priority);
    else nextPriorities.push(priority);
    setParams({ priority: nextPriorities.join(",") });
  };

  const currentAssignee = params.assigneeId ?? "";
  const handleAssigneeChange = (assigneeId: string) => {
    setParams({ assigneeId: assigneeId });
  };

  return (
    <div
      className={styles.toolbar}
      role="toolbar"
      aria-label="Board filters and views"
    >
      <div className={styles.filterGroup}>
        <div className={styles.filterLabel} aria-hidden="true">
          <IconFilter />
          <span>Filters:</span>
        </div>

        <div className={styles.selectWrapper}>
          <select
            className={styles.filterSelect}
            onChange={(e) => handleStatusChange(e.target.value ?? undefined)}
            value={currentStatus}
            aria-label="Filter by Status"
          >
            <option value="" disabled hidden>
              Status
            </option>

            {STATUS_ARRAY.map((status) => (
              <option key={status} value={status}>
                {capitalize(status)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            className={styles.filterSelect}
            onChange={(e) => handleAssigneeChange(e.target.value ?? undefined)}
            value={currentAssignee}
            aria-label="Filter by Assignee"
          >
            <option value="" disabled hidden>
              Assignee
            </option>
            {users &&
              users.data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        <fieldset className={styles.priorityGroup}>
          <span className={styles.priorityTitle}>Priority:</span>

          {PRIORITY_ARRAY.map((priority) => (
            <label key={priority} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={priority}
                onChange={(e) =>
                  handlePriorityChange(e.target.value ?? undefined)
                }
                checked={currentPriorities.includes(priority)}
              />
              <span>{capitalize(priority)}</span>
            </label>
          ))}
        </fieldset>

        <div className={styles.dateGroup}>
          <input
            type="date"
            className={styles.filterDate}
            placeholder="Min date"
            value={currentMinDueDate}
            onChange={(e) =>
              handleDueDateMinChange(e.target.value ?? undefined)
            }
            aria-label="Minimum due date"
          />
          <span className={styles.dateSeparator} aria-hidden="true">
            to
          </span>
          <input
            type="date"
            className={styles.filterDate}
            placeholder="Max date"
            value={currentMaxDueDate}
            onChange={(e) =>
              handleDueDateMaxChange(e.target.value ?? undefined)
            }
            aria-label="Maximum due date"
          />
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilter}
            className={styles.clearFiltersBtn}
            aria-label="Clear all applied filters"
          >
            <span aria-hidden="true">
              <IconClose />
            </span>
            Clear Filters
          </button>
        )}
      </div>

      <div className={styles.toolbarSpacer} />

      <div
        className={styles.viewToggle}
        role="group"
        aria-label="View switchers"
      >
        <button
          className={`${styles.viewBtn} ${styles.active}`}
          aria-label="Switch to Grid View"
          aria-pressed={true}
        >
          <span aria-hidden="true">
            <IconGrid />
          </span>
        </button>
        <button
          className={styles.viewBtn}
          aria-label="Switch to List View"
          aria-pressed={false}
        >
          <span aria-hidden="true">
            <IconList />
          </span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(BoardToolBar);

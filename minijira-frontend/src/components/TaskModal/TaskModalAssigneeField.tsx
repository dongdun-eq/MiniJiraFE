import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ASSIGNEES } from "../../data/taskModalStaticData";
import { IconCheck } from "../Icons/Icons";
import styles from "./TaskModal.module.css";

const TaskModalAssigneeField = () => {
  const { control } = useFormContext();

  const assigneeValue = useWatch({
    control,
    name: "assigneeId",
  });

  return (
    <div className={styles.field}>
      <span className={styles.label}>Assignee</span>
      <Controller
        name="assigneeId"
        control={control}
        render={({ field }) => (
          <div
            className={styles.assigneeList}
            role="group"
            aria-label="Assignee"
          >
            {ASSIGNEES.map((a) => {
              const selected = assigneeValue === a.id;
              return (
                <button
                  type="button"
                  key={a.id}
                  className={`${styles.assigneeOption} ${selected ? styles.selected : ""}`}
                  onClick={() =>
                    field.onChange(field.value === a.id ? null : a.id)
                  }
                  aria-pressed={selected}
                >
                  <div
                    className={`${styles.assigneeAvatar} ${styles[`avatarColor${a.colorIdx}`]}`}
                  >
                    {selected ? <IconCheck /> : a.initials}
                  </div>
                  {a.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default TaskModalAssigneeField;

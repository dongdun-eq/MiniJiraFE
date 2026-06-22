import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IconCheck } from "../Icons/Icons";
import styles from "./TaskModal.module.css";
import type { UserType } from "../../types/user.type";
import { getInitials } from "../../utils/nameUtils";

interface Props {
  users: UserType[] | null;
}

const TaskModalAssigneeField = ({ users }: Props) => {
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
            {users && users.map((a) => {
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
                  <div className={`${styles.assigneeAvatar}`}>
                    {selected ? <IconCheck /> : getInitials(a.name)}
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

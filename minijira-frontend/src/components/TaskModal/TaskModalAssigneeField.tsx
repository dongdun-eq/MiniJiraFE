import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IconCheck } from "../Icons/Icons";
import styles from "./TaskModal.module.css";
import type { UserType } from "../../types/user.type";
import { getInitials } from "../../utils/nameUtils";
import { FORM_FIELD_ASSIGNEE_ID, ASSIGNEE_FIELD_LABEL } from "../../constants";

interface Props {
  users: UserType[] | null;
}

const TaskModalAssigneeField = ({ users }: Props) => {
  const { control } = useFormContext();

  const assigneeValue = useWatch({
    control,
    name: FORM_FIELD_ASSIGNEE_ID,
  });

  return (
    <div className={styles.field}>
      <span className={styles.label}>{ASSIGNEE_FIELD_LABEL}</span>{" "}
      <Controller
        name={FORM_FIELD_ASSIGNEE_ID}
        control={control}
        render={({ field }) => (
          <div
            className={styles.assigneeList}
            role="group"
            aria-label={ASSIGNEE_FIELD_LABEL}
          >
            {users &&
              users.map((a) => {
                const selected = assigneeValue === a.id;
                return (
                  <button
                    type="button"
                    key={a.id}
                    className={`${styles.assigneeOption} ${
                      selected ? styles.selected : ""
                    }`}
                    onClick={() =>
                      field.onChange(field.value === a.id ? null : a.id)
                    }
                    aria-pressed={selected}
                  >
                    <div className={`${styles.assigneeAvatar}`}>
                      {selected ? <IconCheck /> : getInitials(a.name)}
                    </div>
                    {/* Giữ nguyên logic split chuỗi xử lý hiển thị First Name */}
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

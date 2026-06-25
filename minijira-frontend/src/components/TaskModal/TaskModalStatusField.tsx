import { Controller, useFormContext, useWatch } from "react-hook-form";
import { STATUS_OPTIONS } from "../../data/taskModalStaticData";
import styles from "./TaskModal.module.css";
import { FORM_FIELD_STATUS, STATUS_FIELD_LABEL } from "../../constants";

const TaskModalStatusField = () => {
  const { control } = useFormContext();

  const statusValue = useWatch({
    control,
    name: FORM_FIELD_STATUS, 
  });

  return (
    <div className={styles.field}>
      <span className={styles.label}>{STATUS_FIELD_LABEL}</span>{" "}
      <Controller
        name={FORM_FIELD_STATUS} 
        control={control}
        render={({ field }) => (
          <div
            className={styles.statusTabs}
            role="group"
            aria-label={STATUS_FIELD_LABEL} 
          >
            {STATUS_OPTIONS.map((opt) => {
              const isActive = statusValue === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  className={`${styles.statusTab} ${
                    isActive ? opt.activeClass : ""
                  }`}
                  onClick={() => field.onChange(opt.id)}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      />
    </div>
  );
};

export default TaskModalStatusField;

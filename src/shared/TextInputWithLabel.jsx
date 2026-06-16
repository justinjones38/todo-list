import styles from "./TextInputWithLabel.module.css";

export default function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
  return (
    <div className={styles.formItem}>
      <label htmlFor={elementId} className={styles.label}>
        {labelText}
      </label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder="Add Todo"
        maxLength={50}
      />
    </div>
  );
}

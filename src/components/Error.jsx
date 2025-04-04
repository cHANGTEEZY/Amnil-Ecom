import styles from "../styles/Error.module.css";

import React from "react";
import { FileWarning } from "lucide-react";

const ErrorPage = ({
  code = 404,
  title = "Page Not Found",
  message = "Sorry, we couldn't find the page you're looking for.",
}) => {
  return (
    <div className={styles["error-page"]}>
      <div className={styles["error-container"]}>
        <div className={styles["error-icon"]}>
          <FileWarning size={80} />
        </div>

        <h1 className={styles["error-title"]}>{title}</h1>
        <p className={styles["error-message"]}>{message}</p>

        <div className={styles["error-actions"]}>
          <button
            onClick={() => window.history.back()}
            className={`${styles["error-button"]} ${styles["secondary"]}`}
          >
            Go Back
          </button>
        </div>

        <div className={styles["error-code"]}>
          <span>{code}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

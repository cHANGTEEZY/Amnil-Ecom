import styles from "../styles/Error.module.css";

import React from "react";
import { FileWarning } from "lucide-react";

const ErrorPage = ({
  code = 500,
  title = "Error",
  message = "An unexpected error occurred.",
}) => {
  return (
    <div className={styles["error-page"]}>
      <div className={styles["error-container"]}>
        <div className={styles["error-icon"]}>
          <FileWarning size={80} />
        </div>
        <h1 className={styles["error-title"]}>
          {title} (Code: {code})
        </h1>
        <p className={styles["error-message"]}>{message}</p>
        <div className={styles["error-actions"]}>
          <button
            onClick={() => window.history.back()}
            className={`${styles["error-button"]} ${styles["secondary"]}`}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

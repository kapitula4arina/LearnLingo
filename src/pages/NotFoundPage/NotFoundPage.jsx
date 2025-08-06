import React from "react";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.message}>Oops! Page not found.</p>
    </div>
  );
};

export default NotFoundPage;

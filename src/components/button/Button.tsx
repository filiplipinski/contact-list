import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Button.module.css";
import { Loader } from "../loader/Loader";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const Button: FC<Props> = ({
  children,
  className = "",
  isLoading,
  ...restProps
}) => {
  return (
    <button {...restProps} className={clsx(styles.button, className)}>
      {children}

      {isLoading && (
        <Loader variant="secondary" className={styles.loaderWrapper} />
      )}
    </button>
  );
};

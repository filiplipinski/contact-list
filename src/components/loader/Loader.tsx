import clsx from "clsx";
import { FC } from "react";

import styles from "./Loader.module.css";

type Props = {
  variant?: "primary" | "secondary";
  className?: string;
};

export const Loader: FC<Props> = ({ variant = "primary", className }) => {
  return (
    <span
      className={clsx([
        styles.loader,
        variant === "secondary" && styles.secondary,
        className,
      ])}
    />
  );
};

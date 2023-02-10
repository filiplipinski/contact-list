import { FC, memo, KeyboardEvent } from "react";
import clsx from "clsx";

import { Person } from "src/types/types";

import styles from "./PersonInfo.module.css";

export enum PersonInfoTestID {
  Container = "PersonInfoTestID.Container",
}

export const getPersonInfoElementId = (id: string) => {
  return `PersonInfo_${id}`;
};

type Props = {
  person: Person;
  isSelected: boolean;
  onSelect: (person: Person) => void;
};

export const PersonInfo: FC<Props> = ({ person, isSelected, onSelect }) => {
  const [firstName, lastName] = person.firstNameLastName.split(" ");
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onSelect(person);
    }
  };

  return (
    <div
      className={clsx(styles.container, isSelected && styles.selected)}
      id={getPersonInfoElementId(person.id)}
      tabIndex={0}
      onClick={() => onSelect(person)}
      onKeyDown={handleKeyDown}
      data-testid={PersonInfoTestID.Container}
    >
      <div className={styles.headerContainer}>
        <div>
          <span className={styles.initials}>{initials}</span>
        </div>

        <div>
          <h2 className={styles.firstNameLastName}>
            {person.firstNameLastName}
          </h2>
          <span className={styles.jobTitle}>{person.jobTitle}</span>
        </div>
      </div>

      <p className={styles.emailAddress}>{person.emailAddress}</p>
    </div>
  );
};

export const MemoizedPersonInfo = memo(PersonInfo);

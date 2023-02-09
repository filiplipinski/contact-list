import { FC, useState, useCallback, useMemo } from "react";

import { Person } from "src/types/types";
import { useFetchPersonsData } from "src/hooks/useFetchPersonsData";
import {
  getPersonInfoElementId,
  MemoizedPersonInfo,
} from "src/components/personInfo/PersonInfo";
import { Loader } from "src/components/loader/Loader";
import { Button } from "src/components/button/Button";
import { partition } from "src/components/utils/partition";

import styles from "./Home.module.css";

export const Home: FC = () => {
  const [selectedPersonIds, setSelectedPersonsIds] = useState<string[]>([]);
  const {
    data: personsData,
    isLoading,
    isError,
    refetch,
    fetchMore,
  } = useFetchPersonsData();

  const isInitialLoading = isLoading && !personsData;

  const { groupedPersons, numberOfSelectedPerson } = useMemo(() => {
    const [selectedPersons, notSelectedPersons] = partition(
      personsData ?? [],
      (person) => selectedPersonIds.includes(person.id)
    );

    return {
      numberOfSelectedPerson: selectedPersons.length,
      groupedPersons: [...selectedPersons, ...notSelectedPersons],
    };
  }, [personsData, selectedPersonIds]);

  const handleToggleItem = useCallback((person: Person) => {
    setSelectedPersonsIds((prevSelected) => {
      if (!prevSelected.includes(person.id)) {
        return [...prevSelected, person.id];
      } else {
        return prevSelected.filter(
          (selectedPersonId) => selectedPersonId !== person.id
        );
      }
    });
  }, []);

  const handleFetchMore = () => {
    fetchMore().then((data) => {
      const firstNewItemId = data?.[0].id;
      if (firstNewItemId) {
        document
          .getElementById(getPersonInfoElementId(firstNewItemId))
          ?.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.selectedText}>
        Selected contacts: {numberOfSelectedPerson}
      </h2>

      <div className={styles.personCardsContainer}>
        {groupedPersons.map((person) => (
          <MemoizedPersonInfo
            key={person.id}
            person={person}
            isSelected={selectedPersonIds.includes(person.id)}
            onSelect={handleToggleItem}
          />
        ))}
      </div>

      {isInitialLoading && <Loader />}

      {personsData?.length === 0 && <h3>No contacts found</h3>}

      {isError && !personsData && !isLoading && (
        <div className={styles.fetchErrorContainer}>
          <h4>Couldn't fetch contacts!</h4>
          <Button onClick={refetch}>Try again</Button>
        </div>
      )}

      {personsData && (
        <Button
          onClick={handleFetchMore}
          disabled={isLoading}
          isLoading={isLoading}
          className={styles.loadMoreButton}
        >
          Load more
        </Button>
      )}

      <div className={styles.fetchMoreErrorWrapper}>
        {isError && !!personsData && !isLoading && (
          <h4 className={styles.fetchMoreErrorText}>
            Couldn't fetch more contacts! Please try again.
          </h4>
        )}
      </div>
    </div>
  );
};

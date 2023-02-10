import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as apiData from "src/api";
import { PersonInfoTestID } from "src/components/personInfo/PersonInfo";
import { personsMock } from "src/testUtils/mocks";

import { Home } from "./Home";

describe("Home", () => {
  it("renders contacts", async () => {
    jest.spyOn(apiData, "default").mockResolvedValue(personsMock);
    render(<Home />);

    const selectedContactsText = screen.getByText("Selected contacts: 0");

    expect(selectedContactsText).toBeInTheDocument();

    await waitFor(() => {
      const person1 = screen.getByText(personsMock[0].firstNameLastName);
      const person2 = screen.getByText(personsMock[1].firstNameLastName);

      expect(person1).toBeInTheDocument();
      expect(person2).toBeInTheDocument();
    });
  });

  it("renders text about no contact", async () => {
    jest.spyOn(apiData, "default").mockResolvedValue([]);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("No contacts found")).toBeInTheDocument();
    });
  });

  it("renders load button", async () => {
    jest.spyOn(apiData, "default").mockResolvedValue(personsMock);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Load more")).toBeInTheDocument();
    });
  });

  it("renders error info that couldn't fetch data", async () => {
    jest.spyOn(apiData, "default").mockRejectedValue(new Error());
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Couldn't fetch contacts!")).toBeInTheDocument();
      expect(screen.getByText("Try again")).toBeInTheDocument();
    });
  });

  it("renders error info that couldn't fetch more data", async () => {
    jest.spyOn(apiData, "default").mockResolvedValueOnce(personsMock);
    render(<Home />);

    const loadMoreBtn = await screen.findByRole("button", {
      name: "Load more",
    });

    jest.spyOn(apiData, "default").mockRejectedValue(new Error());

    userEvent.click(loadMoreBtn);

    expect(
      await screen.findByText("Couldn't fetch more contacts! Please try again.")
    ).toBeInTheDocument();
  });

  it("renders contacts in proper order after selection", async () => {
    jest.spyOn(apiData, "default").mockResolvedValueOnce(personsMock);
    render(<Home />);

    const secondPerson = await screen.findByText(
      personsMock[1].firstNameLastName
    );

    const allPersons = screen.getAllByTestId(PersonInfoTestID.Container);

    expect(screen.getByText("Selected contacts: 0")).toBeInTheDocument();

    expect(allPersons.length).toBe(3);

    expect(allPersons[0].compareDocumentPosition(allPersons[1])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(allPersons[1].compareDocumentPosition(allPersons[2])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );

    userEvent.click(secondPerson);

    expect(screen.getByText("Selected contacts: 1")).toBeInTheDocument();

    expect(allPersons[0].compareDocumentPosition(allPersons[1])).toBe(
      Node.DOCUMENT_POSITION_PRECEDING
    );
    expect(allPersons[1].compareDocumentPosition(allPersons[2])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});

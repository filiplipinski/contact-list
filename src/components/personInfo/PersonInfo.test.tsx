import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  PersonInfo,
  getPersonInfoElementId,
  PersonInfoTestID,
} from "./PersonInfo";

import { personsMock } from "src/testUtils/mocks";

const personMock = personsMock[0];

describe("PersonInfo", () => {
  it("renders with proper texts and initials", () => {
    render(
      <PersonInfo person={personMock} onSelect={() => {}} isSelected={false} />
    );

    expect(screen.getByText(personMock.firstNameLastName)).toBeInTheDocument();
    expect(screen.getByText("FL")).toBeInTheDocument();
    expect(screen.getByText(personMock.jobTitle)).toBeInTheDocument();
    expect(screen.getByText(personMock.emailAddress)).toBeInTheDocument();
  });

  it("renders initials with one letter if only one name is provided", () => {
    render(
      <PersonInfo
        person={{ ...personMock, firstNameLastName: "Filip" }}
        onSelect={() => {}}
        isSelected={false}
      />
    );

    expect(screen.getByText("F")).toBeInTheDocument();
  });

  it("has correct id attribute assigned", () => {
    const { container } = render(
      <PersonInfo person={personMock} onSelect={() => {}} isSelected={false} />
    );

    const personCardElement = container.querySelector(
      `#${getPersonInfoElementId(personMock.id)}`
    );

    expect(personCardElement).toBeInTheDocument();
  });

  it("has proper class if selected", () => {
    render(
      <PersonInfo person={personMock} onSelect={() => {}} isSelected={true} />
    );

    const personCardContainer = screen.getByTestId(PersonInfoTestID.Container);

    expect(personCardContainer).toHaveClass("selected");
  });

  it("fires onSelect event on mouse click", () => {
    const handleSelect = jest.fn();

    render(
      <PersonInfo
        person={personMock}
        onSelect={handleSelect}
        isSelected={false}
      />
    );

    const personCardContainer = screen.getByTestId(PersonInfoTestID.Container);

    userEvent.click(personCardContainer);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("fires onSelect event on keyboard 'Enter' press", () => {
    const handleSelect = jest.fn();

    render(
      <PersonInfo
        person={personMock}
        onSelect={handleSelect}
        isSelected={false}
      />
    );

    userEvent.tab(); // focus element
    userEvent.keyboard("{Enter}");

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});

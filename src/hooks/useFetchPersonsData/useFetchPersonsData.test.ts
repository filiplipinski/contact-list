import { waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import * as apiData from "src/api";
import { personsMock } from "src/testUtils/mocks";

import { useFetchPersonsData } from "./useFetchPersonsData";

describe("useFetchPersonsData", () => {
  it("fetches data and changes loading state to false", async () => {
    jest.spyOn(apiData, "default").mockResolvedValue(personsMock);

    const { result } = renderHook(() => useFetchPersonsData());

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toEqual(personsMock);
    });

    expect(result.current.isLoading).toBeFalsy();
  });

  it("returns true error state on fetch error", async () => {
    jest.spyOn(apiData, "default").mockRejectedValue(new Error());

    const { result } = renderHook(() => useFetchPersonsData());

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });

  it("refetches on 'refetch' method is called", async () => {
    jest.spyOn(apiData, "default").mockRejectedValueOnce(new Error());

    const { result } = renderHook(() => useFetchPersonsData());

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    expect(result.current.data).toBeUndefined();

    jest.spyOn(apiData, "default").mockResolvedValue(personsMock);
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.isError).toBeFalsy();
      expect(result.current.data).toEqual(personsMock);
    });
  });

  it("fetches more contacts if 'fetchMore' method is called", async () => {
    const person1Mock = personsMock[0];
    const person2Mock = personsMock[1];

    jest.spyOn(apiData, "default").mockResolvedValue([person1Mock]);

    const { result } = renderHook(() => useFetchPersonsData());

    await waitFor(() => {
      expect(result.current.data).toEqual([person1Mock]);
    });

    jest.spyOn(apiData, "default").mockResolvedValue([person2Mock]);
    act(() => {
      result.current.fetchMore();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([person1Mock, person2Mock]);
    });
  });
});

import { renderHook } from "@testing-library/react";
import { usePokemonInitializer } from "../hooks/usePokemonInitializer";
import { getId } from "../services/utils";
import { vi, describe, it, expect } from "vitest";

vi.mock("../services/utils", () => ({
  getId: vi.fn(() => [1, 2, 3, 4, 5]), 
}));

describe("usePokemonInitializer", () => {
  it("should call setPokemonIds with the initial IDs", () => {
    const setPokemonIdsMock = vi.fn(); 

    renderHook(() => usePokemonInitializer({ setPokemonIds: setPokemonIdsMock }));

    expect(getId).toHaveBeenCalledWith(10, 1, 700); 
    expect(setPokemonIdsMock).toHaveBeenCalledWith([1, 2, 3, 4, 5]); 
  });
});

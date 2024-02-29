import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import ProductCategory from '../../client/components/ProductCategory';

describe("ProductCategory", () => {
  const mockGetProducts = jest.fn();

  it("should render categories successfully with right class", async () => {
    await act(async () => {
      render(<ProductCategory getProducts= {mockGetProducts}/>, { wrapper: BuildApp })
    })

    const category_wrapper = screen.getByTestId("category_wrapper");
    const category = screen.getAllByTestId("category");
    const resetButton = screen.getByRole("button", {name: "Reset Category"}); 

    expect(category_wrapper).toBeInTheDocument();
    expect(category_wrapper).toHaveClass("bloowatch-category__wrapper");
    expect(resetButton).toBeDisabled();
    expect(resetButton).toHaveClass("bloowatch-category__reset-button-disabled");
    expect(category).toHaveLength(8);

    for (let i = 0; i < category.length; i++){ 
      expect(category[i]).toHaveClass("bloowatch-category__un-selected");
    }
  })

  it("should render select category onClick category and should reset category onClick reset button", async () => {
    await act(async () => {
      render(<ProductCategory getProducts= {mockGetProducts}/>, { wrapper: BuildApp })
    })
    const category = screen.getAllByTestId("category");
    const resetButton = screen.getByRole("button", {name: "Reset Category"}); 

    fireEvent.click(category[0]);
    expect(window.location.search).toBe("?category=tunder");
    expect(category[0]).toHaveClass("bloowatch-category__selected");
    expect(resetButton).not.toBeDisabled();
    expect(resetButton).toHaveClass("bloowatch-category__reset-button");

    fireEvent.click(resetButton);
    expect(window.location.search).toBe("");
    expect(resetButton).toBeDisabled();
    expect(resetButton).toHaveClass("bloowatch-category__reset-button-disabled");
  })
})

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchProduct from '../../client/components/SearchProduct';
import BuildApp from '../helper/ComponentWrapper';

describe("SearchProduct", () => {
  const mockGetProducts = jest.fn();

  it("should render successfully", () => {
    render(<SearchProduct getProducts = {mockGetProducts}/>, {wrapper: BuildApp});

    const searchInput = screen.getByLabelText("search");
    
    expect(screen.getByTestId("searchProduct")).toHaveClass("bloowatch-search-product__wrapper");
    expect(screen.getByText("search")).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument(); 
    expect(searchInput).toHaveProperty("type", "text");

    fireEvent.change(searchInput, {target: {value: "suit"}});
    expect(screen.getByDisplayValue("suit")).toBeInTheDocument();
    expect(window.location.search).toBe("?search=suit");
    fireEvent.change(searchInput, {target: {value: ""}});
    expect(window.location.search).toBe("");

    expect(mockGetProducts).toHaveBeenCalledTimes(2);
  })
});
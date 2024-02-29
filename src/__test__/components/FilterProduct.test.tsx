import React from 'react';
import { render, screen } from '@testing-library/react';
import BuildApp from '../helper/ComponentWrapper';
import FilterProduct from '../../client/components/FilterProduct';

jest.mock('../../client/components/SearchProduct', () => () => <div data-testid="mocked-search-product" />);
jest.mock('../../client/components/RangeSlider', () => () => <div data-testid="mocked-range-slider" />);
jest.mock('../../client/components/ProductCategory', () => () => <div data-testid="mocked-product-category" />);

describe('FilterProduct', () => {

  it('render successfully', () => {
    const mockGetProducts = jest.fn();

    render(<FilterProduct getProducts={mockGetProducts}/>, {wrapper: BuildApp});

    expect(screen.getByTestId("filter_wrapper")).toHaveClass("bloowatch-filter-product__wrapper");
    expect(screen.getByTestId('mocked-search-product')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-range-slider')).toBeInTheDocument(); 
    expect(screen.getByTestId('mocked-product-category')).toBeInTheDocument();
  });
});
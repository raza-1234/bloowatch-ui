import React from 'react';
import { render, screen } from '@testing-library/react';
import RangeSlider from '../../client/components/RangeSlider';
import BuildApp from '../helper/ComponentWrapper';

describe("RangeSlider", () => {
  const mockGetProducts = jest.fn();

  it("should render successfully", () => {
    render(<RangeSlider getProducts = {mockGetProducts}/>, { wrapper: BuildApp});

    expect(screen.getByTestId("priceSlider")).toHaveClass("bloowatch-slider__wrapper");
    expect(screen.getByTestId("slider")).toBeInTheDocument();
    expect(screen.getByTestId("filtered_price_display")).toHaveClass("bloowatch-slider__text");
  })
 
})
import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../../../client/components/shared/Loader';

describe("Loader", () => {

  it("should render successfully", () => {
    render(<Loader/>);

    const loaderWrapper = screen.getByTestId("loaderContainer");
    const loader = screen.getByTestId("loader");

    expect(loaderWrapper).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(loaderWrapper).toHaveClass("bloowatch-loader__container");
    expect(loader).toHaveClass("bloowatch-loader");
  })

})
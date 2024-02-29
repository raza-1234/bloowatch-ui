import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Missing from '../../../client/components/shared/Missing';
import { BrowserRouter } from 'react-router-dom';

const buildApp = () => {
  return (
    render(
      <BrowserRouter>
        <Missing/>
      </BrowserRouter>
  ))
}

describe("Missing", () => {

  it("should render successfully", () => {
    const { container } = buildApp();

    const missingClass = container.getElementsByClassName("bloowatch-404");
    const heading = screen.getAllByRole("heading");
    const linkToHome = screen.getByText("go to our website.");

    expect(missingClass).toHaveLength(1);
    expect(missingClass[0]).toBeInTheDocument();
    expect(heading[0]).toHaveTextContent("404");
    expect(heading[1]).toHaveTextContent("page not found.");
    expect(linkToHome).toBeInTheDocument();

    fireEvent.click(linkToHome);

    expect(window.location.pathname).toBe("/");
  })

})
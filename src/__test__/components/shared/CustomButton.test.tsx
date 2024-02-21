import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '../../../components/shared/CustomButton';

describe("CustomButton", () => {
  const mockClickHandler = jest.fn();

  let defaultProps = {
    text: "FakeText"
  }

  it("should render successfully", () => {
    const props = {...defaultProps, clickHandler: mockClickHandler}
    render(<CustomButton {...props}/>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("FakeText");
    expect(button).toHaveClass("bloowatch-custom-button");
    
    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  })

  test('it should not call "mockClickHandler" on click', () => {
    const props = {...defaultProps}
    render(<CustomButton {...props}/>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClickHandler).not.toHaveBeenCalled();
  })

})

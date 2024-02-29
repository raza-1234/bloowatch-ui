import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../../App';
import BuildApp from '../helper/ComponentWrapper';

describe("App", () => {

  it('should render successfully', async () => {
    let container: any;
    await act(async () => {
      container = render(<App/>, { wrapper: BuildApp})
    })
  
    const linkElement = screen.getByTestId("app");
    expect(linkElement).toBeInTheDocument(); 
  });

})
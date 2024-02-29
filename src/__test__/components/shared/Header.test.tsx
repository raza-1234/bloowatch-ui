import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react';
import api from '../../../client/axios/api';
import { AxiosResponse } from 'axios';
import { jwtDecode } from "jwt-decode";
import Header from '../../../client/components/shared/Header';
import BuildApp from '../../helper/ComponentWrapper';
import { buildMockUserResponse } from '../../helper/Util';

jest.mock('../../../client/axios/api', () => ({
  get: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('Testing Header without accessToken', () => {

  it('should render successfully', () => {
    render(<Header/>, {wrapper: BuildApp});

    const header_wrapper = screen.getByTestId("header_wrapper");
    const header_content = screen.getByTestId("header_content");

    expect(header_content).toBeInTheDocument();
    expect(header_wrapper).toBeInTheDocument();
    expect(header_wrapper).toHaveClass("bloowatch-header__wrapper");
    expect(header_content).toHaveClass("bloowatch-header__content");
  }); 

  it("should render header menu with right class for desktop", () => {
    render(<Header/>, {wrapper: BuildApp});

    const header_menu = screen.getByTestId("header_menu");

    expect(header_menu).toBeInTheDocument();
    expect(header_menu).toHaveClass("bloowatch-header__nav-list");
    expect(screen.queryByTestId("mobile_screen_wrapper")).toBeNull();
  })

  it("should render header menu with right class for mobile view", () => {
    render(<Header/>, {wrapper: BuildApp});

    const hamburgerMenu = screen.getByTestId("hamburger_menu_icon");

    expect(hamburgerMenu).toBeInTheDocument();
    fireEvent.click(hamburgerMenu);

    const mobile_screen_wrapper = screen.getByTestId("mobile_screen_wrapper")

    expect(mobile_screen_wrapper).toBeInTheDocument(); 
    expect(screen.getByTestId("header_menu")).toHaveClass("bloowatch-header__mobile-menu");

    fireEvent.click(mobile_screen_wrapper);
    expect(mobile_screen_wrapper).not.toBeInTheDocument();
  })

  it("should render register and login link and onClick it navigate to the page respectively", () => {
    render(<Header/>, {wrapper: BuildApp});

    const registerLink = screen.getByText("Register");
    const logIn = screen.getByText("Login");

    expect(registerLink).toBeInTheDocument();
    expect(logIn).toBeInTheDocument();

    fireEvent.click(registerLink);
    expect(window.location.pathname).toBe("/register");

    fireEvent.click(logIn);
    expect(window.location.pathname).toBe("/");
  })

});

describe('Testing Header with accessToken', () => {
  let mockResponse: AxiosResponse;
  let userId: { userId: number};
  let accessToken: string; 

  beforeAll(() => {
    accessToken = 'mockAccessToken';
    localStorage.setItem('access_token', accessToken);
  })

  afterAll(() => {
    localStorage.removeItem('access_token');
  })

  beforeEach(() => {
    mockResponse = buildMockUserResponse() as AxiosResponse;
    (api.get as jest.Mock).mockResolvedValue(mockResponse);
    userId = { userId: 1 };
    (jwtDecode as jest.Mock).mockReturnValue(userId);
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render cartlink and navigate to cart page onClick cart link', async () => {
    await act(async () => {
      render(<Header/>, {wrapper: BuildApp});
    });

    const cartLink = screen.getByText("Cart");
    const cartBadge = screen.getByTestId("cartBadge");

    expect(cartLink).toBeInTheDocument();
    expect(screen.queryByTestId("dropDown")).toBeNull();
    expect(cartBadge).toBeInTheDocument();
    expect(cartBadge).toHaveTextContent("0");

    fireEvent.click(cartLink);
    expect(window.location.pathname).toBe("/cart");
  }); 

  it('should render userName and open drop down on click userName', async () => {
    await act(async () => {
      render(<Header/>, {wrapper: BuildApp});
    });

    const userName = screen.getByText("Test User");

    fireEvent.click(userName);
    expect(screen.getByTestId("dropDown")).toBeInTheDocument();
    expect(screen.getByTestId("screen_wrapper")).toBeInTheDocument();

    //checking edit profile link
    const edit_profile_link = screen.getByText("Edit Profile");
    expect(edit_profile_link).toBeInTheDocument();

    fireEvent.click(edit_profile_link);
    expect(window.location.pathname).toBe("/edit-user"); 
    expect(screen.queryByTestId("dropDown")).toBeNull();

    //checking log out link
    fireEvent.click(userName);
    const log_out = screen.getByText("Log Out");
    expect(log_out).toBeInTheDocument();

    fireEvent.click(log_out);
    expect(window.location.pathname).toBe("/"); 
    expect(screen.queryByTestId("dropDown")).toBeNull();
  });

  it("should render logo and onClick logo navigate to dashboard", async () => {
    await act(async () => {
      render(<Header/>, {wrapper: BuildApp});
    });

    const logo = screen.getByTestId("logo");

    expect(logo).toBeInTheDocument();

    fireEvent.click(logo);
    expect(window.location.pathname).toBe("/shop"); 
  })

});
 
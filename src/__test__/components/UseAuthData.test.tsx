import { act, renderHook, waitFor } from '@testing-library/react';
import useAuthData from '../../client/context/AuthProvider';
import api from '../../client/axios/api';
import { buildMockUserResponse } from '../helper/Util';
import { jwtDecode } from 'jwt-decode';
import { AuthProvider } from '../../client/context/AuthProvider';
import { AxiosResponse } from 'axios';

jest.mock('../../client/axios/api', () => ({
  get: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

let mockUserResponse: AxiosResponse = buildMockUserResponse() as AxiosResponse;

describe("UseAuthData with access_token", () => {
  let accessToken = "mockAccessToken" ;

  beforeEach(() => {
    localStorage.setItem("access_token", accessToken);
    (jwtDecode as jest.Mock).mockReturnValue({ userId: 1 });
    (api.get as jest.Mock).mockResolvedValueOnce(mockUserResponse);
  })

  afterEach(() => {
    localStorage.removeItem("access_token");
    jest.clearAllMocks();
  })

  it("should return userData", async () => {    
    const { result } = renderHook(() => useAuthData(), { wrapper: AuthProvider }); 

    await waitFor(() => { 
      expect(result.current.userData).toEqual({ accessToken, ...mockUserResponse.data});
    })

    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockAccessToken"}});
  }) 
})

describe("UseAuthData without access_token", () => {

  it("should return userData", async () => {    
    (api.get as jest.Mock).mockResolvedValueOnce(mockUserResponse);

    const { result } = renderHook(() => useAuthData(), { wrapper: AuthProvider }); 
    const { getUserData } = result.current;

    await act(async () => {
      getUserData("mockAccessToken", 1);
    })

    expect(result.current.userData).toEqual({ accessToken: null, ...mockUserResponse.data});
    expect(api.get).toHaveBeenCalledWith("user-detail/1", {"headers": {"Authorization": "Bearer mockAccessToken"}}); 
  })
})
 
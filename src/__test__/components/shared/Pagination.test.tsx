import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../components/shared/Pagination';
import { BrowserRouter } from 'react-router-dom';
import { Paging } from "../../../types/types"

const mockGetProduct = jest.fn(() => {});

const buildApp = (props: any) => {
  return (
    render(
      <BrowserRouter>
        <Pagination {...props}/> 
      </BrowserRouter>
    )
  )
}

describe("Pagination", () => {
let mockPagingInfo: Paging;

let defaultProps = {
  getProducts: mockGetProduct
}

  beforeEach(() => {
    mockPagingInfo = {
      currentDataCount: 3,
      currentPage: 1,
      limit: 3,
      moreData: true,
      nextPage: 2,
      totalCount: 10,
      totalPage: 4
    }
  })

  it("should render successfully with disabled previous button", () => {
    const props = {...defaultProps, pagingInfo: mockPagingInfo}
    buildApp(props);

    const pagination_wrapper = screen.getByTestId("pagination-wrapper");
    const buttons = screen.getAllByRole("button");

    expect(pagination_wrapper).toBeInTheDocument();
    expect(pagination_wrapper).toHaveClass("bloowatch-pagination__wrapper");

    expect(buttons[0]).toBeDisabled();
    expect(buttons[0]).toHaveClass("bloowatch-button__disabled");

    expect(buttons[1]).toHaveTextContent("1");
    expect(buttons[1]).toHaveClass("bloowatch-button");

    expect(buttons[2]).not.toBeDisabled();
    expect(buttons[2]).toHaveClass("bloowatch-button");

    fireEvent.click(buttons[2]);
    expect(mockGetProduct).toHaveBeenCalledWith({"page": `${mockPagingInfo.nextPage}`});
    expect(window.location.search).toBe("?page=2")
  })

  it("should add page number in url", () => {
    const props = {...defaultProps, pagingInfo: mockPagingInfo}
    buildApp(props);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[2]);
    expect(mockGetProduct).toHaveBeenCalledWith({"page": `${mockPagingInfo.nextPage}`});
    expect(window.location.search).toBe("?page=2")
  })

  it("should not add page number in url if page number is '1' ", () => {
    mockPagingInfo.currentPage = 2;

    const props = {...defaultProps, pagingInfo: mockPagingInfo}
    buildApp(props);

    const buttons = screen.getAllByRole("button");

    expect(buttons[1]).toHaveTextContent("2");
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[0]).toHaveClass("bloowatch-button");

    fireEvent.click(buttons[0]); 
    expect(mockGetProduct).toHaveBeenCalledWith({"page": `${mockPagingInfo.currentPage - 1}`});
    expect(window.location.search).toBe("");
  })
  

   it("should render successfully with disabled next button", () => {
    mockPagingInfo.currentPage = 4;
    mockPagingInfo .moreData = false

    const props = {...defaultProps, pagingInfo: mockPagingInfo}
    buildApp(props);

    const buttons = screen.getAllByRole("button");

    expect(buttons[1]).toHaveTextContent("4");
    expect(buttons[2]).toBeDisabled();
    expect(buttons[2]).toHaveClass("bloowatch-button__disabled")
  })

})
import "../../css/Pagination.css"
import React from 'react'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

import { Paging, QueryParam } from '../../types/types'

type ParentProp = {
  pagingInfo: Paging
  getProducts: (data: QueryParam) => void
}

const Pagination = ({pagingInfo, getProducts}: ParentProp) => {
  
  const { currentPage, moreData, nextPage } = pagingInfo!;

  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);
  const [params, setParams] = useSearchParams();

  const handlePage = (pageNumber: number): void => {
    
    let page = pageNumber.toString();
    parsedQuery.page = page;
    setParams((prevParams) => {
      if (pageNumber === 1){
        prevParams.delete("page"); 
      }
      else {
        prevParams.set("page", page); 
      }
      return prevParams;
    });
    getProducts(parsedQuery);
  }
  
  return (
    <div data-testid = "pagination-wrapper" className='bloowatch-pagination__wrapper'>
      <button disabled = {currentPage === 1} onClick={() => handlePage(currentPage - 1)}
        className ={currentPage === 1 ? "bloowatch-button__disabled": "bloowatch-button"}
      >
        <GrFormPrevious />
      </button>
      <button className='bloowatch-button'>{currentPage}</button>
      <button disabled = {!moreData} onClick={() => handlePage(nextPage)}
        className={!moreData ? "bloowatch-button__disabled" : "bloowatch-button"}
      >
        <MdNavigateNext />
      </button>
    </div>
  )
}

export default Pagination


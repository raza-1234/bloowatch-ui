import React from 'react'
import { Paging } from '../../types/types'
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import "../../css/Pagination.css"

type ParentProp = {
  pagingInfo: Paging,
  handlePage: (Number: number) => void
}

const Pagination = ({pagingInfo, handlePage}: ParentProp) => {
  const { currentPage, moreData, nextPage} = pagingInfo;
  
  return (
    <div className='bloowatch-pagination__wrapper'>
      <button disabled = {currentPage === 1} onClick={() => handlePage(currentPage - 1)} className ={currentPage === 1 ? "bloowatch-button__disabled": "bloowatch-button"}>
        <GrFormPrevious />
      </button>
      <button className='bloowatch-button'>{currentPage}</button>
      <button disabled = {!moreData} onClick={() => handlePage(nextPage)} className={!moreData ? "bloowatch-button__disabled" : "bloowatch-button "}>
        <MdNavigateNext />
      </button>
    </div>
  )
}

export default Pagination


import React from 'react'
import "../../css/CustomButton.css"

type ParentProp = {
  text: string,
  clickHandler?: () => void
}

const CustomButton = ({text, clickHandler}: ParentProp) => {
  return (
    <button className='bloowatch-custom-button' onClick={clickHandler} >{text}</button>
  )
}

export default CustomButton

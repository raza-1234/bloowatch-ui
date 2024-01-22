import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "../css/RangeSlider.css"
import { dashboardContext } from '../context/DashboardContext';
import { useContext } from 'react';
import { DashboardContextValue } from '../types/types';

export default function RangeSlider() {
  const {fetchProducts, category, page, search, setPrice, price }: DashboardContextValue = useContext(dashboardContext)!  

  const handleChange = (event: Event, newValue: number[]): void => {
    console.log("in proiduct priceee", newValue);
    setPrice(newValue);
    fetchProducts(newValue, category, search, page)
  };

  return (
    <Box className = "bloowatch-slider__wrapper">
      <p>price</p>
      <div>
        <Slider
          min={0}
          max={100}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          size="small"
        />
      </div>
      <p className='bloowatch-slider__text'>price: {`$${price[0]} - $${price[1]}`}</p>
    </Box>
  );
}
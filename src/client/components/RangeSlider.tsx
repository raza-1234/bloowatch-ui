import "../css/RangeSlider.css"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { QueryParam } from '../types/types';

type ParentProp = {
  getProducts: (data: QueryParam) => void
}

export default function RangeSlider({getProducts}: ParentProp) {
  const location = useLocation();
  const parsedQuery = queryString.parse(location.search);  
  const [params, setParams] = useSearchParams();
  const priceRange = params.get("price")?.split(",")
  const [price, setPrice] = useState<number[]>([Number(priceRange?.[0] || 0), Number(priceRange?.[1] || 100)]);

  const handleChange = (event: Event, newValue: number[]): void => {
    let priceFilter = newValue.toString();
    parsedQuery.price = priceFilter;
    delete parsedQuery.page
    
    setParams((prevParams) => {
      prevParams.delete("page")
      prevParams.set("price", priceFilter)
      return prevParams;
    });
    setPrice(newValue);
    getProducts(parsedQuery)
  };

  return (
    <Box data-testid = "priceSlider" className = "bloowatch-slider__wrapper">
      <p>price</p>
      <div>
        <Slider
          data-testid = "slider"
          min={0}
          max={100}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          size="small"
        />
      </div>
      <p data-testid = "filtered_price_display" className='bloowatch-slider__text'>price: {`$${price[0]} - $${price[1]}`}</p>
    </Box>
  );
}
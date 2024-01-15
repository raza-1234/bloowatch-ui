import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import "../css/RangeSlider.css"

export default function RangeSlider() {
  const [price, setPrice] = React.useState<number[]>([0, 100000]);

  const handleChange = (event: Event, newValue: number[]) => {
    setPrice(newValue);
  };

  return (
    <Box className = "bloowatch-slider__wrapper">
      <p>price</p>
      <div>
        <Slider
          min={0}
          max={100000}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          size="small"
        />
      </div>
      <p className='bloowatch-slider__text'>price: $0 - $100000</p>
    </Box>
  );
}
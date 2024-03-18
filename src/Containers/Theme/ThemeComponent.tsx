'use client'
import React, { useContext } from 'react';
import ThemeContext from '../../Context/Theme/ThemeContext';
import { Box, Switch, alpha, styled } from '@mui/material';
import { pink, red } from '@mui/material/colors';

const PinkSwitch = styled(Switch)(({ theme }) => ({  
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[50],
    '&:hover': {
      backgroundColor: alpha(pink[50], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[50],
  },
}));

const SwitchStyle = {
  border: 'solid',
  borderRadius: '10px', 
  margin: '0 0 0 20px',
  p: '4px 14px'
}

export default function ThemeComponent() {

  const { toggleTheme } = useContext(ThemeContext);

  return (  
    <>
      <Box sx={ SwitchStyle }>
        <PinkSwitch onChange={toggleTheme} />
      </Box>    
    </>
  );
};



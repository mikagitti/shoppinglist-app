'use client'
import Link from "next/link";
import ThemeComponent from "@/Containers/Theme/ThemeComponent";
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BungalowIcon from '@mui/icons-material/Bungalow';
import InfoIcon from '@mui/icons-material/Info';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material';
import React, { useState } from "react";

const AppBarIconLink = styled(Link)(({ theme }) => ({      
    
    display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.primary, // Use the theme for color
  gap: theme.spacing(1), // Use the theme for spacing
    
}));

const iconStyle = { 
    fontSize: '45px',
}

export default function MainNavBar() {
    
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    const iconStyle = { 
        fontSize: isPhone ? '25px' : '45px',
    }
    
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
          return;
        }
        setDrawerOpen(open);
      };

    const drawer = (
        <Box            
            sx={{ width: '100%', backgroundColor: 'brown' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >          
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1, flexDirection: 'column', margin: '10px'}}>
                <AppBarIconLink href="/home">                
                    <BungalowIcon sx={iconStyle} />                    
                    <Typography variant="body1">Home</Typography>
                </AppBarIconLink>
                
                <AppBarIconLink href="/shoppinglist">
                    <ShoppingCartIcon sx={iconStyle}/>
                    <Typography variant="body1">(Old) Shopping list</Typography>                    
                </AppBarIconLink>
            
                <AppBarIconLink href="/shoppinglist_v2">
                    <EngineeringIcon sx={iconStyle}/>
                    <Typography variant="body1">(New) Shopping list</Typography>
                </AppBarIconLink>                

                <AppBarIconLink href="/about">
                    <InfoIcon sx={iconStyle}/>
                    <Typography variant="body1">About this</Typography>
                </AppBarIconLink>
            </Box>

        </Box>
      );



    return (
        <AppBar position="static">            
            <Toolbar sx={{ justifyContent: isPhone?'left':'right',  flexDirection: 'row'  }}>
                
                {isPhone ? (
                <>
                 <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, justifyContent: 'left'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                
                    <Drawer
                        anchor={'right'}
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}                        
                    >
                        {drawer}
                    </Drawer>
                </Box>
                
                <Box sx={{ position: 'absolute', right: 16 }}>
                    <ThemeComponent  />
                </Box>
                </>
                ) : (
                    <>
                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 3, justifyContent: 'center'}}>
                            <AppBarIconLink href="/home">
                                <BungalowIcon sx={iconStyle} />
                            </AppBarIconLink>
                            
                            <AppBarIconLink href="/shoppinglist">
                                <ShoppingCartIcon sx={iconStyle}/>
                            </AppBarIconLink>
                        
                            <AppBarIconLink href="/shoppinglist_v2">
                                <EngineeringIcon sx={iconStyle}/>
                            </AppBarIconLink>

                            <AppBarIconLink href="/about">
                                <InfoIcon sx={iconStyle}/>
                            </AppBarIconLink>
            
                        </Box>                    
                        <Box sx={{ position: 'absolute', right: 16 }}>
                            <ThemeComponent  />
                        </Box>  
                        </>              
                )}
            </Toolbar>                 
        </AppBar>
    );
}
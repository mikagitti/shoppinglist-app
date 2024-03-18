import React, { ElementType } from "react";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";

export type iconType = {
  icon: ElementType;
  color: string;
}

type ProductProps = {
    icon: iconType;
    name: string;
    iconAction: () => void;
}

export default function ProductListItem({icon: Icon, name, iconAction} : ProductProps) {

  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const iconStyle = {
    fontSize: isPhone ? '27' : '40',
    color: Icon.color,
  }

  return (   
      <Box sx={ {border: 'solid 1px', borderRadius: 6}}>
        <List disablePadding>
          <ListItem disablePadding sx={ {
                        ":hover": {
                        backgroundColor: '#DEB887',
                        cursor: 'pointer',
                        borderRadius: 6,
                        },                        
                        }}>
            <ListItemButton sx={ {
                        ":hover": {
                        backgroundColor: 'transparent',
                        },
                        }}>
              
              <ListItemText primary={name} />
              
              <ListItemIcon>
                
                  <Icon.icon style={ iconStyle } onClick={iconAction}/>
                
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  )
}

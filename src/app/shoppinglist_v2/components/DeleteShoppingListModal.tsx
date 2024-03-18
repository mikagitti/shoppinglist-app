import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { AddNewShoppingListForUser, RemoveShoppingList, ShoppingListsType } from '@/Database/dbConnectionV2';


interface ModalProps {  
  onClose: () => void;  
  shoppingList: ShoppingListsType | null;
}

const modalStyle : CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
}
    

const backgroundStyle = {    
    bgcolor: 'background.paper',
    padding: '15px 25px 35px 25px',
    borderRadius: '30px',    
}


export const DeleteShoppingListModal = ({ onClose, shoppingList } : ModalProps) => {

  if(shoppingList == null)
    return;

  const deleteShoppingList = async() => {
    if (shoppingList != null) {
      await RemoveShoppingList(shoppingList.id);
    }
    onClose();
  }

  return (
    <div style={ modalStyle }>      
      <Box sx={backgroundStyle}>
        <Typography variant='h5' color={'secondary'}>Delete shopping list</Typography>
        <Typography variant='h3'>{shoppingList.name}</Typography>
        
        <Stack spacing={2}>              
          <Button variant="outlined" onClick={() => deleteShoppingList()}>Yes</Button>
          <Button variant="outlined" onClick={() => onClose()}>No</Button>
        </Stack>
      </Box>      
    </div>

  );
};




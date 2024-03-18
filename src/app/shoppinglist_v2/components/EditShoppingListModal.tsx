import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { ShoppingListsType, UpdateShoppingListName } from '@/Database/dbConnectionV2';
import { RestaurantMenu } from '@mui/icons-material';

interface ModalProps {
  onClose: () => void;
  shoppingList: ShoppingListsType | null;
}

const modalStyle : CSSProperties = {
    position: 'fixed',
    top: -150,
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


export const EditShoppingListModal = ({ onClose, shoppingList } : ModalProps) => {
  
  useEffect(() => {
    if (shoppingList == null) {      
      return;
    }
    else {
      setNewName(shoppingList.name);
    }
  }, [shoppingList]); 
 

  const [newName, setNewName] = useState<string>('');
  const [helperText, setHelperText] = useState('');

  const saveShoppingListName = async() => {
    if(newName.length < 5){
      setHelperText('Name minimun is 5 letters!');     
      return;
    }   

    if (shoppingList != null) {
      await UpdateShoppingListName(shoppingList.id, newName);
    }
    onClose();
  }
  
  const closeModal = () => {
    setNewName('');
    onClose();
  }
  
  return (
    <div style={ modalStyle}>      
      <Box sx={backgroundStyle}>
      <Typography>Modify shopping list name</Typography>                            
          
          <TextField  id="product-name"
                      variant="standard" 
                      style={ {fontSize: '30px'}}                          
                      onChange={(e) => setNewName(e.target.value)} 
                      value={newName}                          
                      helperText={helperText}
                      sx={ {marginTop: '10px', marginBottom: '20px'}}
                      />
                      <Stack gap={2}>
              <Button variant="outlined" onClick={() => saveShoppingListName()} disabled={newName.length > 5 ? false : true} >Yes</Button>
              <Button variant="outlined" onClick={() => closeModal()}>No</Button>
          </Stack>
        </Box>      
    </div>

  );
};




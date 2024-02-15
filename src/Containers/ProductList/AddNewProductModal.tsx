import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { CSSProperties } from '@mui/material/styles/createMixins';
import { ProductType, AddNewProduct } from '@/Database/dbConnection';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalStyle : CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
  }

const backgroundStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
}


export const AddNewModal = ({ isOpen, onClose, children } : ModalProps) => {
  
  const [productName, setProductName] = useState<string>('');

  const saveNewProduct = () => {
    const product : ProductType = {id:0, productName:productName, shoppingList:false}
    AddNewProduct(product);    
    onClose();
  }
  
  
  if (!isOpen) return null;

  return (
    <div style={( modalStyle)}>      
      <div style={backgroundStyle}>
        <h1>Add new product and press</h1>
        <Stack spacing={2}>
            <TextField id="product-name" variant="standard" value={productName} onChange={(e) => setProductName(e.target.value)} label="Product name"/>
            <Button variant="outlined" onClick={() => saveNewProduct()}>Save</Button>
        </Stack>
      </div>
    </div>
  );
};



import ProductListContext, { ProductListType } from '@/Context/ProductList/ProductListContext';
import ShoppingListContext from '@/Context/ShoppingList/ShoppingListContext';
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, Modal, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';

import { deleteProductFromDB } from "../../Database/dbConnection";

import { AddNewModal } from './AddNewProductModal';

const style = {
    py: 0,
    width: '100%',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    marginBottom: '14px'
};

const iconStyle = {
    fontSize: '40px',
    marginRight: '40px'   
}



type ProductListProps = {
    productList: ProductListType[];
    onDelete: (id: number) => void; 
    onModify: (id: number, name: string) => void;
    onDeleteDB: (id: number) => void;
}


const ProductList = ({ productList, onDelete, onModify, onDeleteDB }: ProductListProps) => {
  return (
    <div>      
        {productList.map((product, index) => (
        <List key={index} sx={style} >
            <ListItem
            sx={ {
                ":hover": {
                backgroundColor: '#DEB887',
                cursor: 'pointer', 
                borderRadius: 3,                   
                }}}>
            
                <ListItemText primary={product.productName} />
            
                <ListItemIcon onClick={() => onModify(product.id, product.productName)}>
                    <ModeEditOutlineIcon sx={iconStyle}/>
                </ListItemIcon>                                         
    
                <ListItemIcon onClick={() => onDelete(product.id)}>
                    <DeleteIcon sx={iconStyle}/>
                </ListItemIcon>

            </ListItem>
        </List> 
        ))}
    </div>
  );
};




type ProductDetailProps = {
    product: ProductListType; 
    onSave: (id: number, name: string) => void;
}

const ProductDetail = ({ product, onSave } : ProductDetailProps) => {
  
    const [newProductName, setNewProductName] = useState<string>(product.productName);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductName(event.target.value);
      };
  
    return (
    <>
    <Grid container spacing={2} alignItems="center">
      
          <Grid item xs>
            <TextField fullWidth value={newProductName} variant="outlined" onChange={handleChange}  />
          </Grid>
      
          <Grid item>            
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => onSave(product.id, newProductName)}>
              <SaveAsTwoToneIcon />
            </Button>
          </Grid>
          
        </Grid>
    </>
  );
};

export default function ProductEditingComponent() {

    const {productList, deleteProductFromProductList, updateProductNameById} = useContext(ProductListContext);
    const {deleteProductFromShoppingList, updateShoppingListProductName} = useContext(ShoppingListContext);

    const [showEditProductComponent, setShowEditProductComponent] = useState<boolean>(false);
    const [selectedproduct, setSelectedproduct] = useState<ProductListType>({id: 0, productName: '', productInShoppingList: false});    

    const handleDelete = (productId: number) => {
        deleteProductFromProductList(productId);
        deleteProductFromShoppingList(productId);
        deleteProductFromDB(productId);
    };

    const handleModify = (productId: number, productName: string) => {
        const product: ProductListType = {id: productId, productName: productName, productInShoppingList: false}
        setSelectedproduct(product);
        setShowEditProductComponent(true);
    };

    const handleSave = (id: number, name: string) => {
        updateProductNameById(id, name);
        updateShoppingListProductName(id, name);
        setShowEditProductComponent(false);
    };

    const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] = useState<boolean>(false);

    const handleDatabadeDelete = (id: number) => {
        deleteProductFromDB(id);
      };

    return (
        <div>
            {showEditProductComponent === false ? (
            <>
                <button onClick={() => setIsAddNewProductModalOpen(true)}>Add New Product</button>                

                <ProductList productList={productList} onDelete={handleDelete} onModify={handleModify} onDeleteDB={handleDatabadeDelete}/>
            </>
            ) : (
                <ProductDetail product={selectedproduct} onSave={handleSave} />
            )}

            <AddNewModal isOpen={isAddNewProductModalOpen} onClose={() => setIsAddNewProductModalOpen(false)}>
                    <p>This is a modal dialog!</p>
                </AddNewModal>


        </div>
    );
};





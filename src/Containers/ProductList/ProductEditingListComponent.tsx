import ProductListContext, { ProductListType } from '@/Context/ProductList/ProductListContext';
import ShoppingListContext from '@/Context/ShoppingList/ShoppingListContext';
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';

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
    marginRight: '40px',
}



type ProductListProps= {
    productList: ProductListType[]
    onDelete: (id: number) => void; 
    onModify: (id: number, name: string) => void;
}

const ProductList = ({ productList, onDelete, onModify }: ProductListProps) => {
  return (
    <div>      
        {productList.map((product, index) => (
        <List key={index} sx={style} >
            <ListItem
            sx={ {
                ":hover": {
                backgroundColor: '#DEB887',
                cursor: 'pointer',                    
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
    };

    const handleModify = (productId: number, productName: string) => {
        const product: ProductListType = {id: productId, productName: productName, productInShoppingList: false}
        setSelectedproduct(product);
        setShowEditProductComponent(true);
    };

    const handleSave = (id: number, name: string) => {
        console.log('dd');
        updateProductNameById(id, name);
        updateShoppingListProductName(id, name);
        setShowEditProductComponent(false);
    };

    return (
        <div>
        {showEditProductComponent === false ? (
            <ProductList productList={productList} onDelete={handleDelete} onModify={handleModify} />
        ) : (
            <ProductDetail product={selectedproduct} onSave={handleSave} />
        )}
        </div>
    );
};





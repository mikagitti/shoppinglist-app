import ProductListContext, { ProductListType } from '@/Context/ProductList/ProductListContext';
import ShoppingListContext from '@/Context/ShoppingList/ShoppingListContext';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

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
    onSave: (id: number, name: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductDetail = ({ product, onSave } : ProductDetailProps) => {
  return (
    <div>
      <div>{product.productName}</div>
      <button onClick={(event) => onSave(product.id, product.productName, event)}>Save</button>
    </div>
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

    const handleSave = (id: number, name: string, event: React.MouseEvent<HTMLButtonElement>) => {
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





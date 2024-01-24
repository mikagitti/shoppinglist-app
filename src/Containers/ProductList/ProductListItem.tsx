import React, { useContext } from 'react';

import { List, ListItemIcon, ListItemButton, Typography, ListItem, ListItemText  } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import ProductListContext, { ProductListType } from '../../Context/ProductList/ProductListContext';
import ShoppingListContext from '../../Context/ShoppingList/ShoppingListContext';

const style = {
    py: 0,
    width: '100%',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};


type ProductListItemType = {
    product: ProductListType    
}

const getIcon = (product: ProductListType) => {
    return (
        product.productInShoppingList == false ? 
        <AddCircleIcon className='add-icon' /> : //If product is not in shoppinglist, show plus icon.
        <RemoveCircleIcon className='remove-icon' /> //Otherwise show minus icon. 
    )
}

export default function ProductListItem({ product } : ProductListItemType) {

    const {checkProductListProduct} = useContext(ProductListContext)
    const {ModifyShoppingList} = useContext(ShoppingListContext)

    function handleCheckProduct(id: number, product: string) {
        checkProductListProduct(id);
        ModifyShoppingList(id, product);
    }

    return (
            <List sx={style}>
                <ListItem 
                    onClick={() => handleCheckProduct(product.id, product.productName)}
                    sx={ {
                        ":hover": {
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer'
                        }}}
                >
                <ListItemIcon>                        
                {
                    getIcon(product)
                }
                </ListItemIcon>                                         
                <ListItemText primary={product.productName} />
            </ListItem>
        </List>    
    );
}
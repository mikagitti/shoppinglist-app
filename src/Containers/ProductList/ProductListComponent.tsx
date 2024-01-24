
import React, { useContext } from 'react';

import { List, ListItemIcon, ListItemButton, Typography  } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import ProductListContext from '../../Context/ProductList/ProductListContext';
import ShoppingListContext from '../../Context/ShoppingList/ShoppingListContext';

export default function ProductListComponent () {

    const {productList, checkProductListProduct} = useContext(ProductListContext)
    const {ModifyShoppingList} = useContext(ShoppingListContext)

    function handleCheckProduct(id: number, product: string) {
        checkProductListProduct(id);
        ModifyShoppingList(id, product);
    }

    return (
    <>
    <div style={ {padding: '10px'}}>
        <Typography variant="h5">
            Product List
        </Typography>
        <Typography variant="body1">
            Check product in shopping list
        </Typography>

        <List>
        {
            productList.map( (x, index) => (
                <ListItemButton  key={index} onClick={() => handleCheckProduct(x.id, x.productName)}>
                    <ListItemIcon>                        
                        {
                            x.productInShoppingList == false ? 
                            <AddCircleIcon className='add-icon' /> : //If product is not in shoppinglist, show plus icon.
                            <RemoveCircleIcon className='remove-icon' /> //Otherwise show minus icon. 
                        }
                    </ListItemIcon>                                         
                    {x.productName}
                </ListItemButton >
                
            ))
        }
        </List>
    </div>
    </>
    )
};

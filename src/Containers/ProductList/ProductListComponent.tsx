
import React, { useContext } from 'react';

import { List, ListItemIcon, ListItemButton, Typography  } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import ProductListContext from '../../Context/ProductList/ProductListContext';
import ShoppingListContext from '../../Context/ShoppingList/ShoppingListContext';
import ProductListItem from './ProductListItem';


const style = {listStyleType:'none', margin: '10px' }


export default function ProductListComponent () {

    const {productList} = useContext(ProductListContext)

    return (
    <>
    <div style={ {padding: '10px'}}>
        <Typography variant="h5">
            Product List
        </Typography>
        <Typography variant="body1">
            Check product in shopping list
        </Typography>
        
        {
            productList.map( (product, keyIndex) => (
                <div key={keyIndex} style={style}>
                    <ProductListItem product={product}/>
                </div>
            ))
        }
        
    </div>
    </>
    )
};

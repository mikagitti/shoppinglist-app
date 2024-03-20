'use client'
import React, { useEffect, useState } from "react";

import { Box, Button, Divider, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { 
    GetShoppingListById,
    GetShoppingListProductsByShoppingListId, 
    ShoppingListProductsType,
    ShoppingListType, 
} from "@/Database/dbConnectionV2";

import { BoxStyle, ButtonStyle } from "../components/Styles";
import ProductListItem, { iconType } from "../components/productListItem";

const IconPropsForAddingProduct : iconType = {
    icon: AddCircleIcon,
    color: 'green',
};
const IconPropsForDeletingProduct : iconType = {
    icon: RemoveCircleIcon,
    color: 'red',    
};

export default function Page({ params }: { params: { id: number, name: string } }) {

    const [showCheckedList, setShowCheckedList] = useState<boolean>(false)
    const [shoppingListProducts, setShoppingListProducts] = useState<ShoppingListProductsType[]>([]);
    
    useEffect( () => {
        fetchShoppingListProductsToMemory();        
    }, []);



    const fetchShoppingListProductsToMemory = async() => {
        const result : ShoppingListProductsType[] = await GetShoppingListProductsByShoppingListId(params.id);
        setShoppingListProducts(result);
    }

    const checkProduct = (product: ShoppingListProductsType) => {
        setShoppingListProducts((products) => 
        products.map( (item) => item.id === product.id ? {...item, is_checked: !item.is_checked } : item) )
    }

    return (
        <>        
        {
            <>            
            <Box sx={ {maxWidth: '500px'}}>
            {
                shoppingListProducts.map((product, index) => (                    
                        product.is_checked == false &&                    
                        <div key={index} style={ {margin: '10px'}}>                            
                            <ProductListItem icon={IconPropsForAddingProduct} name={product.name} iconAction={() => checkProduct(product)} />
                            {'false'}
                        </div>                    
                    )
                )
            }
            </Box>

            <Divider />
            <Button sx={ {} } onClick={() => setShowCheckedList(!showCheckedList)}>
                {showCheckedList ? 'Hide in Cart' : 'Show in Cart'}
            </Button>
        
            { showCheckedList &&
            <Box sx={ {maxWidth: '500px'}}>
            {
                shoppingListProducts.map((product, index) => (
                    product.is_checked == true &&
                 
                        <div key={index} style={ {margin: '10px'}}>                            
                            <ProductListItem icon={IconPropsForAddingProduct} name={product.name} iconAction={() => checkProduct(product)} />
                            {'trueee'}
                        </div>                 
                    )                    
                )
            }
            </Box>
            }
            </>
        }

        </>
    )
}
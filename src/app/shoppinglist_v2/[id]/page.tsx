'use client'
import React, { useEffect, useState } from "react";
import { 
    GetShoppingListProductsByShoppingListId, 
    ShoppingListProductsType, 
    RemoveProductFromShoppingList, 
    GetAllProducts, 
    ProductType, 
    AddNewProductToShoppingList 
} from "@/Database/dbConnectionV2";
import { Box, Button, Typography } from "@mui/material";
import { BoxStyle, ButtonStyle } from "../components/Styles";
import AddProduct from "../components/AddProduct";
import ProductListItem, { iconType } from "../components/productListItem";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function Page({ params }: { params: { id: number } }) {

    const IconPropsForAddingProduct : iconType = {
        icon: AddShoppingCartIcon,
        color: 'green',
    };

    const IconPropsForDeletingProduct : iconType = {
        icon: DeleteIcon,
        color: 'red',    
    };
      
    const shoppingListId : number = params.id;

    const [shoppingListProducts, setShoppingListProducts] = useState<ShoppingListProductsType[]>([]);        
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);

    useEffect( () => {
        fetchShoppingListProductsToMemory();        
    }, []);

    useEffect( () => {
        fetchAwailableProductsToMemory();  
    }, [shoppingListProducts]);

    //Open/Close adding more products to shopping list
    const openAddProduct = async() => {
        if(!addingProduct) {            
            const productList : ProductType[] = await GetAllProducts();
            const filteredProducts: ProductType[] = productList.filter(product => !shoppingListProducts.some(b => b.product_id === product.id));            
            setAllProducts(filteredProducts);
        }
        setAddingProduct(!addingProduct);
    }

    const fetchShoppingListProductsToMemory = async() => {        
        const shoppingListProducts : ShoppingListProductsType[] = await GetShoppingListProductsByShoppingListId(params.id);
        setShoppingListProducts(shoppingListProducts);        
    }

    const fetchAwailableProductsToMemory = () => {        
        const filteredProducts: ProductType[] = allProducts.filter(product => !shoppingListProducts.some(b => b.product_id === product.id));            
        setAllProducts(filteredProducts);        
    }

    //REMOVE
    const removeProductFromList = async(id : number) => {
        console.log('remove');
        await RemoveProductFromShoppingList(id);
        await fetchShoppingListProductsToMemory();
    }

    //ADD
    const addProductToShoppingList = async(id: number) => {
        await AddNewProductToShoppingList(shoppingListId, id);
        await fetchShoppingListProductsToMemory();        
    }
        

    return (
        <>      
        {
        shoppingListProducts.length <= 0 && (
        <>
            <Box sx={BoxStyle} m={3}> <Typography variant="h4" component="div"> Shopping list is empty. Add products</Typography></Box>
        </>
        )
        }      
        
        <Box sx={BoxStyle} m={1}>            
            <Button 
                color="primary" 
                sx={ButtonStyle}
                onClick={openAddProduct}
            >
                {addingProduct ? 'Close' : 'Add more products to list' }                
            </Button>
        </Box>
        
        {
        addingProduct ? (
            <Box sx={ {maxWidth: '500px'}}>
                {
                allProducts.map((product, index) => {
                    return (
                        <div key={index} style={ {margin: '10px'}}>
                            <ProductListItem icon={IconPropsForAddingProduct} name={product.name} iconAction={() => addProductToShoppingList(product.id)} />
                        </div>
                    )
                })
                }
            </Box>
            ) : (            
            
            <Box sx={ {maxWidth: '500px'}}>
            {            
                shoppingListProducts.map((product, index) => {
                    return (
                        <div key={index} style={ {margin: '10px'}}>
                            <ProductListItem icon={IconPropsForDeletingProduct} name={product.name} iconAction={() => removeProductFromList(product.id)} />
                        </div>                    
                    )
                })
            }
            </Box>            
        )}

        </>
    )
}
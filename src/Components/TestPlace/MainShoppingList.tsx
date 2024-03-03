import { useEffect, useRef, useState } from "react";
import { Autocomplete, Box, Button, Grid, Input, Tab, TextField, Typography } from "@mui/material";
import { 
    DbHealthCheck, 
    GetProducts, 
    GetTestitaulu, 
    GetToken, 
    deleteToken 
} from "@/Database/dbConnection";
import {    
    GetAllProducts, 
    GetShoppingListProductsByShoppingListId, 
    GetShoppingListsByUserId,     
    UpdateProductCheckedInShoppingListByShoppingListIdAndProductId, 
    UpdateProductNameById,      
    AddNewProductToShoppingList,
    RemoveProductFromShoppingList,
    AddNewProduct,
    DeleteProduct
} from "@/Database/dbConnectionV2";
import { ProductType, ShoppingListsType, ShoppingListProductsType } from "@/Database/dbConnectionV2";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from '@mui/material';
import TableButton from "./TableButton";

const labelStyle =  {
    fontSize: '25px',
    width: '250px',
}

const boxStyle = {
    display: 'flex', 
    alignItems: 'center',    
}


export default function MainSL() {
    
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>('Login')
    
    let token = useRef('');

    const [productList, setProductList] = useState<ProductType[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    const [shoppingLists, setShoppingLists] = useState<ShoppingListsType[]>([]);
    const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListsType | null>();

    const [shoppingListProducts, setShoppingListProducts] = useState<ShoppingListProductsType[]>([]);
    const [updateProductName, setUpdateProductName] = useState<string>('');
    const [newProductInput, setNewProductInput] = useState<string>('');


     

    useEffect( () => {
        
        console.log('UseEffect');

        const fetchAllProducts = async() => {
            
            const productList: ProductType[] = await GetAllProducts();
            setProductList(productList);

            const shoppingLists: ShoppingListsType[] = await GetShoppingListsByUserId(1);
            setShoppingLists(shoppingLists);
            
        }

        fetchAllProducts();        
        
    }, [])


    const handleLogin = async () => {
        
        setLoggedIn(loggedIn => !loggedIn)        
        
        if(loggedIn) {
            setButtonText('LogOut');
            token.current = 'Logged IN'
        }
        else
        {
            setButtonText('LogIn');
            token.current = 'Logged OUT'
        }            

        console.log(token.current);
    }
    
    //////////////////////////////
    const getMe = async () => {        
        type dataType = {
            id: number;
            nimi: string;
       };
        
        const result:dataType[] = await GetTestitaulu();
        console.log(result);
    };

    const handleChange = (event: { target: { value: string; name: string; }; }) => {        
        const {value, name} = event.target;
        if(name == 'updateName')
            setUpdateProductName(value);

        if(name == 'newProduct')
            setNewProductInput(value);
    };

    //Get products added to shoppinglist
    const getProductListToTable = async() => {
        console.log(selectedShoppingList);

        if (selectedShoppingList)
            setShoppingListProducts(await GetShoppingListProductsByShoppingListId(selectedShoppingList?.id));
    }

    //Update product name
    const handleUpdate = async() => {
        await UpdateProductNameById(1, updateProductName);
        if (selectedShoppingList)
        {
            setShoppingListProducts(await GetShoppingListProductsByShoppingListId(selectedShoppingList?.id));
        }
        setUpdateProductName('');
    }

    //Check/unCheck product in shoppinglist
    const checkButton = async(shoppingListId: number, productId:number, isChecked: boolean) => {
        await UpdateProductCheckedInShoppingListByShoppingListIdAndProductId(shoppingListId, productId, isChecked);
        if (selectedShoppingList != null)
            setShoppingListProducts(await GetShoppingListProductsByShoppingListId(selectedShoppingList.id));
    }

    //Delete product from shoppinglist
    const deleteButton = async(id: number) => {
        await RemoveProductFromShoppingList(id);
        if (selectedShoppingList != null)
            setShoppingListProducts(await GetShoppingListProductsByShoppingListId(selectedShoppingList?.id));
    }

    //ADD to shoppinglist
    const handleAddProductToShoppingList = async() => {
        const productId:number = selectedProduct != null ? selectedProduct.id : 0;
        
        if(productId > 0 && selectedShoppingList != null) {
            await AddNewProductToShoppingList(selectedShoppingList.id, productId);
            setShoppingListProducts(await GetShoppingListProductsByShoppingListId(selectedShoppingList.id));
            setSelectedProduct(null);
        }
    }


    const handleAddNewProduct = async() => {
        await AddNewProduct(newProductInput);

        const productList = await GetAllProducts();
        setProductList(productList);
        setNewProductInput('');
    }

    const updateShoppingListChanged = async(shoppingList: ShoppingListsType | null) => {
        if (shoppingList)
        {
            setSelectedShoppingList(shoppingList);
            getProductListToTable();
            
            if (shoppingList?.id)
                setShoppingListProducts(await GetShoppingListProductsByShoppingListId(shoppingList?.id));
    
        }
        console.log(shoppingList);
    }

    const deleteProductFromDB = async() => {
        if (selectedProduct != null) {                                
            await DeleteProduct(selectedProduct.id);

            const productList = await GetAllProducts();
            setProductList(productList);            

            setSelectedProduct(null);
        }
    }

    return (
    <div>
    
        {/* ******************************************************************************************** */}
        {/* Select shopping list */}
        <Box style={boxStyle} >
            <Typography style={labelStyle}>Select shopping list</Typography>
            
            <Autocomplete 
                sx={{margin: '20px', width: '300px', backgroundColor: 'wheat'}}
                disablePortal
                id="combo-box-shoppinglists"
                options={shoppingLists}
                getOptionLabel={(option) => option.name}                
                
                renderInput={(params) => 
                    <TextField {...params} label="Select shopping list" />
                }                
                onChange={(event: any, newValue: ShoppingListsType | null) => {
                            updateShoppingListChanged(newValue);
                         }
                    }                
                
            />

                           
        </Box>


        {/* ******************************************************************************************** */}
        {/* ADD new product */}
        <Box style={boxStyle}>
            <Typography style={labelStyle}>Add new product</Typography>
            <TextField
                name="newProduct"
                label="New Product"
                variant="outlined"
                value={newProductInput}
                onChange={handleChange}
                sx={ {margin: '20px', backgroundColor: 'wheat'}}
            />
            <Button sx={ {border: "solid", backgroundColor: "black" }} onClick={handleAddNewProduct}>Add new product</Button>
        </Box>


        {/* ******************************************************************************************** */}
        {/* CHOOSE and ADD product to shopping list */}
        <Box style={boxStyle} >
            <Typography style={labelStyle}>Select product to add to shopping list</Typography>
            <Autocomplete sx={ {margin: '20px', width: '300px', backgroundColor: 'wheat'}}
                options={productList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => <TextField {...params} variant="filled"
                fullWidth label="Select a product" />}
                clearText="clear"
                onChange={(event: any, newValue: ProductType | null) => {                    
                    setSelectedProduct(newValue);
                }}
                value={selectedProduct}
            />

            <Button sx={ {border: "solid", backgroundColor: "black" }} onClick={handleAddProductToShoppingList}>Add to list</Button>
            <Button sx={ {border: "solid", backgroundColor: "black", marginLeft: "10px"}} onClick={deleteProductFromDB}>Delete Product from DB</Button>            
        </Box>


        {/* ******************************************************************************************** */}
        {/* SHOW shopping list as a list */}
        <Box sx={ {display: 'flex', marginTop: '30px'}}>
          {shoppingListProducts.length > 0 && <ShoppingListProducts /> }
        </Box>


    </div>    
    );


    function ShoppingListProducts() {
        return (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              
              <TableHead>
                <TableRow>
                  <TableCell>ShoppingList Id</TableCell>
                  <TableCell align="right">Product_id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Is Checked</TableCell>                  
                  <TableCell align="right"></TableCell>  
                </TableRow>
              </TableHead>
              
              <TableBody>
                {shoppingListProducts.map((row) => (
                  <TableRow key={row.id}>
                    
                    <TableCell component="th" scope="row">
                      {row.shoppinglist_id}
                    </TableCell>
                    
                    <TableCell align="right">{row.product_id}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.is_checked}</TableCell>
                    <TableCell align="right">
                        <div style={ {  display: 'flex',                    
                                        justifyContent: 'right', 
                                        alignItems: 'center',
                                        }}>
                            <Box sx={ {display: 'flex', gap: '10px'} }>
                                <TableButton onClick={() => checkButton(row.shoppinglist_id, row.product_id, row.is_checked)}> {row.is_checked == true ? 'UnCheck' : 'Check' }</TableButton>                        
                                <TableButton onClick={() => deleteButton(row.id)}>Delete</TableButton>
                            </Box>
                        </div>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
        );
    }
}
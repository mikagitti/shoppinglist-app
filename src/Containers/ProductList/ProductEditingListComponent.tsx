
import ProductListContext from "@/Context/ProductList/ProductListContext";
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { Avatar, Box, Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, colors } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useRef, useState } from "react"
import EditProductComponent from "./EditProductComponent";

export default function ProductEditingComponent() {

    const {productList, deleteProductFromProductList} = useContext(ProductListContext);
    const {deleteProductFromShoppingList} = useContext(ShoppingListContext);

    const [showEditProductComponent, setShowEditProductComponent] = useState<boolean>(false);

    const [chosenProductId, setChosenProductId] = useState<number>(0);

    function editProduct(productId: number): void {
        setChosenProductId(productId)
        setShowEditProductComponent(true);
    }

    function deleteFromProductList(productId: number): void {
        deleteProductFromProductList(productId);
        deleteProductFromShoppingList(productId);
    }

    return (
    <>
        {
            
            showEditProductComponent === true ? 
            <EditProductComponent onClose={() => setShowEditProductComponent(false)} productId = {chosenProductId} /> : 

            <List>
            {
                productList.map( (x, index) => (
                    <ListItem key={index}>
                        <Grid container alignItems="center">
                            
                            <Grid item xs={8}>
                                <Box>
                                    {x.productName}
                                </Box>
                            </Grid>
                            
                            <Grid item xs={3}>
                                <Box>
                                    <Button onClick={() => editProduct(x.id)}>Edit</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box>
                                    <DeleteIcon sx={ {color: 'red'}} onClick={() => deleteFromProductList(x.id)}/>
                                </Box>
                            </Grid>
                            
                        </Grid>
                    </ListItem>
                    
                ))
            }
            </List>
        }
    </>
    )
}
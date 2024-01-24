
import ProductListContext from "@/Context/ProductList/ProductListContext";
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useContext, useRef, useState } from "react"
import EditProductComponent from "./EditProductComponent";


const style = {
    py: 0,
    width: '100%',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    margin: '10px,'
};

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
 
            productList.map( (x, index) => (
                <div  style={style} key={index}>
                <List>
                    <ListItem >                
                        {x.productName}                    
                        
                        <Box >
                            <ListItemIcon onClick={() => editProduct(x.id)}>
                                <ModeEditOutlineIcon/>
                            </ListItemIcon>                                         
                        </Box>

                        <Box>
                            <ListItemIcon onClick={() => deleteFromProductList(x.id)}>
                                <DeleteIcon/>
                            </ListItemIcon>     
                        </Box>
                    </ListItem>
                </List> 
                </div>
            ))
         }
    </>
    )
}
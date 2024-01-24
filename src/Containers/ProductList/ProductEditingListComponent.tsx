
import ProductListContext from "@/Context/ProductList/ProductListContext";
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
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
    backgroundColor: 'background.paper'    
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

    const SetHeaderText = () => {
        return (
            <>
                <Typography variant="h5">
                    Edit products 
                </Typography>

                <Typography variant="body1">
                    Or remove products
                </Typography>
                
            </>
        )
    }

    return (
    <>    
        {   
            showEditProductComponent ===false && <SetHeaderText />
        }
        {
            showEditProductComponent === true ? 
                <EditProductComponent onClose={() => setShowEditProductComponent(false)} productId = {chosenProductId} /> :
                productList.map( (x, index) => (
                    <List key={index} >                        
                        <ListItem style={style}>
                            <ListItemText primary={x.productName} />
                        
                            <ListItemIcon onClick={() => editProduct(x.id)}>
                                <ModeEditOutlineIcon/>
                            </ListItemIcon>                                         
                
                            <ListItemIcon onClick={() => deleteFromProductList(x.id)}>
                                <DeleteIcon/>
                            </ListItemIcon>                                 
                        </ListItem>
                    </List> 
                ))
                
            
         }
    </>
    )
}
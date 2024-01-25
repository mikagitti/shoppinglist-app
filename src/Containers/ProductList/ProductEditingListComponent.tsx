
import ProductListContext from "@/Context/ProductList/ProductListContext";
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material"
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
    marginBottom: '14px'
};


export default function ProductEditingComponent() {

    const {productList, deleteProductFromProductList} = useContext(ProductListContext);
    const {deleteProductFromShoppingList} = useContext(ShoppingListContext);
    const [showEditProductComponent, setShowEditProductComponent] = useState<boolean>(false);
    const [chosenProductId, setChosenProductId] = useState<number>(0);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    function editProduct(productId: number): void {        
        setChosenProductId(productId);        
        setShowEditProductComponent(true);
    }

    function deleteFromProductList(productId: number): void {
        deleteProductFromProductList(productId);
        deleteProductFromShoppingList(productId);
    }

    const iconStyle = {
        fontSize: matches ? '30px' : '40px',
        marginRight: matches ? '0' : '40px',
    }

    return (
    <>  <div style={{} }>
        {
            showEditProductComponent === true ? 
            <EditProductComponent onClose={() => setShowEditProductComponent(false)} productId = {chosenProductId} /> :
            productList.map( (product, index) => (                
            <List key={index} sx={style} >
                <ListItem
                sx={ {
                    ":hover": {
                    backgroundColor: '#DEB887',
                    cursor: 'pointer',                    
                    }}}>
                
                    <ListItemText primary={product.productName} />
                
                    <ListItemIcon onClick={() => editProduct(product.id)}>
                        <ModeEditOutlineIcon sx={iconStyle}/>
                    </ListItemIcon>                                         
        
                    <ListItemIcon onClick={() => deleteFromProductList(product.id)}>
                        <DeleteIcon sx={iconStyle}/>
                    </ListItemIcon>                                 

                </ListItem>
            </List> 
                
            ))
         }
         </div>
    </>
    )
}
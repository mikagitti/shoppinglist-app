
import ProductListContext from "@/Context/ProductList/ProductListContext";
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useContext, useRef, useState } from "react"
import EditProductComponent from "./EditProductComponent";
import ProductEditingListItem from "./ProductEditingListItem";




export default function ProductEditingComponent() {

    const {productList, deleteProductFromProductList} = useContext(ProductListContext);
    const {deleteProductFromShoppingList} = useContext(ShoppingListContext);

    const [showEditProductComponent, setShowEditProductComponent] = useState<boolean>(false);

    const [chosenProductId, setChosenProductId] = useState<number>(0);


    return (
    <>  
        {
            showEditProductComponent === true ? 
                <EditProductComponent onClose={() => setShowEditProductComponent(false)} productId = {chosenProductId} /> :
                productList.map( (x, index) => (
                    <div key={index}>
                        <ProductEditingListItem 
                                product={x} 
                                setChosenProductId={() => setChosenProductId} 
                                setShowEditProductComponent={() => setShowEditProductComponent(true)}/>
                    </div>
                ))
                
            
         }
    </>
    )
}
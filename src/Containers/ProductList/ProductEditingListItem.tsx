import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ProductListContext, { ProductListType } from "@/Context/ProductList/ProductListContext";
import { useContext } from "react";
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";

const style = {
    py: 0,
    width: '100%',
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper'    
};

type ProductItemProps = {
    product: ProductListType;
    setChosenProductId: (productId: number) => void;
    setShowEditProductComponent: () => void; 
}

export default function ProductEditingListItem({product, setChosenProductId, setShowEditProductComponent} : ProductItemProps) {

    const {deleteProductFromProductList} = useContext(ProductListContext);
    const {deleteProductFromShoppingList} = useContext(ShoppingListContext);

    function editProduct(productId: number): void {
        setShowEditProductComponent();
        setChosenProductId(productId);        
    }

    function deleteFromProductList(productId: number): void {
        deleteProductFromProductList(productId);
        deleteProductFromShoppingList(productId);
    }

    return (
        
        <List sx={style} >
            <ListItem>
                
                <ListItemText primary={product.productName} />
            
                <ListItemIcon onClick={() => editProduct(product.id)}>
                    <ModeEditOutlineIcon/>
                </ListItemIcon>                                         
    
                <ListItemIcon onClick={() => deleteFromProductList(product.id)}>
                    <DeleteIcon/>
                </ListItemIcon>                                 

            </ListItem>
        </List> 

    )
}
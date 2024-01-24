
import ProductListContext from "@/Context/ProductList/ProductListContext"
import ShoppingListContext from "@/Context/ShoppingList/ShoppingListContext";
import { useContext, useEffect, useState } from "react";

import { Grid, Card, CardContent, Typography, Button, TextField, Box, styled, Paper  } from '@mui/material';

type CurrentComponentProps = {
    onClose: () => void;
    productId: number;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'grey',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'blue',
  }));

export default function EditProductComponent( {onClose, productId} : CurrentComponentProps) {

    const { productList, updateProductNameById } = useContext(ProductListContext);
    const { updateShoppingListProductName } = useContext(ShoppingListContext);

    const [ productName, setProductName ] = useState<string>('');

    useEffect(() => {
        const product = productList.find(item => item.id === productId) ?? null;
        setProductName(product ? product.productName : "");
        
    }, []);

    function saveProductChanges(id: number, name: string) {
        updateProductNameById(id, name);
        updateShoppingListProductName(id, name);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value)
      setProductName(event.target.value);
    };

    return (

        <Grid container spacing={2}>      
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Change product name
                </Typography>
                
                <TextField  value={productName} onChange={handleChange}/>
                  
                <Button sx={{border: 'solid'}} onClick={() => saveProductChanges(productId, productName)}>
                  Save
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8} >
            <Item>aa</Item>
          </Grid>
      </Grid>

    )
}
import React from 'react';
import Box from '@mui/material/Box';

import { CardContent, Paper, Typography, styled, Card, CardActions, Button, Link } from '@mui/material';
import { ShoppingListsType } from '@/Database/dbConnectionV2';


const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',    
    color: theme.palette.text.secondary,
    height: 120,
    lineHeight: '60px',
    fontSize: 20,    
  }));

type CardProps = {
    shoppingList: ShoppingListsType;
    deleteShoppingList: () => void;
    edit: () => void;
}

export default function ShoppingListCard({shoppingList, deleteShoppingList, edit} : CardProps) {
        
  return (
    <Box width='300px'>
      <Card>
        <CardContent>   
        <Link href={`/shoppinglist_v2/${shoppingList.id}`}>     
            <Typography gutterBottom variant="h5" component="div" align='center'>
              {shoppingList.name}            
            </Typography>          
            </Link>
        </CardContent>
        <CardActions >        
          <Button onClick={() => edit()}>Edit</Button>
          <Button onClick={() => deleteShoppingList()}>Delete</Button>        
        </CardActions>        
      </Card>
    </Box>
  );
}
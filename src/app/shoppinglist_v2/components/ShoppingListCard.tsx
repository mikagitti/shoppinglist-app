import React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link'

import { CardContent, Paper, Typography, styled, Card, CardActions, Button, Icon, IconButton } from '@mui/material';
import { ShoppingListType } from '@/Database/dbConnectionV2';


const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',    
    color: theme.palette.text.secondary,
    height: 120,
    lineHeight: '60px',
    fontSize: 20,    
  }));

type CardProps = {
    shoppingList: ShoppingListType;
    deleteShoppingList: () => void;
    edit: () => void;
}

export default function ShoppingListCard({shoppingList, deleteShoppingList, edit} : CardProps) {
        
  return (
    <Box width='300px'>
      <Card>
        <CardContent>   
        
            <Box display="flex" flexDirection={'row'}>
            
              <Link href={`/shoppinglist_v2/${shoppingList.id}`}>                
                <Typography variant="h5">
                  {shoppingList.name}
                </Typography>
              </Link>

              <Box sx={ {marginTop: '-10px'}}>
                <IconButton onClick={() => edit()} color="primary" >
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>

            </Box>
            
        </CardContent>
 
        <CardActions >        
          <Link href={`/shoppinglist_v2/${shoppingList.id}/manageshoppinglist`}>     
            <Button>
              Edit
            </Button>
          </Link>
          <Button onClick={() => deleteShoppingList()}>
            Delete
          </Button>        
        </CardActions>        

      </Card>
    </Box>
  );
}
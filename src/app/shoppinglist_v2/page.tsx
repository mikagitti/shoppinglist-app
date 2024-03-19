'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

import { GetShoppingListsByUserId, ShoppingListType } from "@/Database/dbConnectionV2";
import { NewShoppingListModal } from "./components/NewShoppingListModal";
import { DeleteShoppingListModal } from "./components/DeleteShoppingListModal";
import { EditShoppingListNameModal } from "./components/EditShoppingListNameModal";
import ShoppingListCard from "./components/ShoppingListCard";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsIcon from '@mui/icons-material/Settings';

type UserProps = {
    userId: number;
}

export default function ShoppingListV2( {userId = 1} : UserProps) {

    const [isNewShoppingListModelOpen, setIsNewShoppingListModelOpen] = useState<boolean>(false);
    const [isDeleteShoppingListModelOpen, setIsDeleteShoppingListModelOpen] = useState<boolean>(false);
    const [isEditShoppingListModelOpen, setIsEditShoppingListModelOpen] = useState<boolean>(false);    
    const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListType | null>(null);
    const [shoppingLists, setShoppingLists] = useState<ShoppingListType[]>([]);


    useEffect( () => {
        updateUserShoppingListView();
    }, [isNewShoppingListModelOpen, isDeleteShoppingListModelOpen, isEditShoppingListModelOpen]);

    const editShoppingListName = (shoppingList: ShoppingListType) => {
        setIsEditShoppingListModelOpen(true);
        setSelectedShoppingList(shoppingList);    
    }

    const onCloseEdit = () => {
        updateUserShoppingListView();
        setIsEditShoppingListModelOpen(false);
    }

    const deleteShoppingList = (shoppingList: ShoppingListType) =>{        
        setSelectedShoppingList(shoppingList);
        setIsDeleteShoppingListModelOpen(true);        
    }

    const onCloseDelete = () => {
        updateUserShoppingListView();
        setIsDeleteShoppingListModelOpen(false);
    }

    const updateUserShoppingListView = async() => {        
        const result:ShoppingListType[] = await GetShoppingListsByUserId(userId);
        setShoppingLists(result);
    }

    const addNewShoppingList = () => {
        setIsNewShoppingListModelOpen(false)
        updateUserShoppingListView();
    }
    
    return (
        <Box>
            <Box display='flex' justifyContent="center" m={3} >                
                <Grid container spacing={2} >
                    
                    { /* ADD NEW SHOPPING LIST */ }
                    <Grid item xs={12} sm={6}>
                        <IconButton onClick={() => setIsNewShoppingListModelOpen(true)}>
                            <NoteAddIcon /> 
                            <Typography sx={ {marginLeft: 1}}>
                                Add new shopping list
                            </Typography>
                        </IconButton>
                    </Grid>
                    
                    { /* MANAGE PRODUCTS */ }
                    <Grid item xs={12} sm={6}>
                        <Link href="/shoppinglist_v2/manageproducts">
                            <IconButton>
                                <SettingsIcon/> 
                                <Typography sx={ {marginLeft: 1}}>
                                    Manage all products
                                </Typography>
                            </IconButton>
                        </Link>
                    </Grid>
                    
                    { /*LIST ALL SHOPPING LISTS*/ }
                    {
                    shoppingLists?.map((x, index) => {
                        return(    
                            <Grid key={index} item xs={12} sm={6} xl={3}>                                
                                <ShoppingListCard shoppingList={x} deleteShoppingList={() => deleteShoppingList(x)} edit={() => {editShoppingListName(x)}} />
                            </Grid>
                        )
                    })
                    }                    
                </Grid>
            </Box>
            
            { /* ADD new shopping list */ }
            {isNewShoppingListModelOpen && <NewShoppingListModal onClose={() => addNewShoppingList()} userId={userId} />}
            
            { /* DELETE shopping list */ }
            {isDeleteShoppingListModelOpen && <DeleteShoppingListModal onClose={() => onCloseDelete()} shoppingList={selectedShoppingList} />}
            
            { /* EDIT shopping list name */ }
            {isEditShoppingListModelOpen && <EditShoppingListNameModal onClose={() => onCloseEdit()} shoppingList={selectedShoppingList} />}
            
        </Box>
    )
}
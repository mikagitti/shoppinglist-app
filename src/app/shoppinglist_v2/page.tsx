'use client'

import ShoppingListCard from "./components/Card";
import { useEffect, useState } from "react";
import { GetShoppingListsByUserId, ShoppingListsType } from "@/Database/dbConnectionV2";
import { NewShoppingListModal } from "./components/NewShoppingListModal";
import { DeleteShoppingListModal } from "./components/DeleteShoppingListModal";
import { EditShoppingListModal } from "./components/EditShoppingListModal";
import Link from "next/link";
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
    const [oldName, setOldName] = useState<string>('');
    const [selectedShoppingList, setSelectedShoppingList] = useState<ShoppingListsType | null>(null);
    const [shoppingLists, setShoppingLists] = useState<ShoppingListsType[]>([]);


    useEffect( () => {
        updateUserShoppingListView();
    }, [isNewShoppingListModelOpen, isDeleteShoppingListModelOpen, isEditShoppingListModelOpen]);

    const editShoppingListName = (shoppingList: ShoppingListsType) => {
        setIsEditShoppingListModelOpen(true);
        setSelectedShoppingList(shoppingList);
        setOldName(shoppingList.name);        
    }

    const onCloseEdit = () => {
        updateUserShoppingListView();
        setIsEditShoppingListModelOpen(false);
    }

    const deleteShoppingList = (shoppingList: ShoppingListsType) =>{        
        setSelectedShoppingList(shoppingList);
        setIsDeleteShoppingListModelOpen(true);        
    }

    const onCloseDelete = () => {
        updateUserShoppingListView();
        setIsDeleteShoppingListModelOpen(false);
    }

    const updateUserShoppingListView = async() => {        
        const result:ShoppingListsType[] = await GetShoppingListsByUserId(userId);
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
                    <Grid item xs={12} sm={6}>
                        <IconButton onClick={() => setIsNewShoppingListModelOpen(true)}>
                            <NoteAddIcon /> 
                            <Typography sx={ {marginLeft: 1}}>
                                Add new shopping list
                            </Typography>
                        </IconButton>
                    </Grid>
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
                    {
                    shoppingLists?.map((x, index) => {
                        return(    
                            <Grid key={index} item xs={12} sm={6}>                                
                                <ShoppingListCard shoppingList={x} deleteShoppingList={() => deleteShoppingList(x)} edit={() => {editShoppingListName(x)}} />
                            </Grid>
                        )
                    })
                    }                    
                </Grid>
            </Box>
            
            {isNewShoppingListModelOpen && <NewShoppingListModal onClose={() => addNewShoppingList()} userId={userId} />}
            {isDeleteShoppingListModelOpen && <DeleteShoppingListModal onClose={() => onCloseDelete()} shoppingList={selectedShoppingList} />}
            {isEditShoppingListModelOpen && <EditShoppingListModal onClose={() => onCloseEdit()} shoppingList={selectedShoppingList} />}
            
        </Box>
    )
}
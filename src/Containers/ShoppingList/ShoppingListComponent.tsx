import React, { useContext, useState } from "react";

import ShoppingListContext from "../../Context/ShoppingList/ShoppingListContext";
import ShoppingListItemComponent from "./ShoppingListItemComponent";
import { Button, Typography } from "@mui/material";

export default function ShoppinListComponent() {

    const {shoppingList} = useContext(ShoppingListContext);
    const [showCheckedList, setShowCheckedList] = useState<boolean>(false)


    return (
    <>
    <div style={ {padding: '10px'}}>
        <Typography variant="h5">
            Shopping List    
        </Typography>
        <Typography variant="body1">
            Check products you have found
        </Typography>
            

        <ul>
        { shoppingList.map((x, index) => (            
            x.productChecked == false &&
                <li key={index} style={ {listStyleType:'none' }}>
                    <ShoppingListItemComponent item={x} />
                </li>
                ))
        }
        </ul>        
        <Button onClick={() => setShowCheckedList(!showCheckedList)}>Show</Button>
        
        {showCheckedList ? 
        <ul>
            {            
            shoppingList.map((x, index) => 
                x.productChecked == true &&
                    <li key={index} style={ {listStyleType:'none' }}>
                        <ShoppingListItemComponent item={x} />
                    </li>            
                )
            }
        </ul> : 
        null
        }
    
    </div>
    </>
    )
}


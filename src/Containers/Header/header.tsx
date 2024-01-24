import { useContext } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import HeaderListContext, { ActiveHeaderType, HeaderType } from '../../Context/Header/HeaderContext';
import PositionedMenu from "./MenuButton";
import MenuButton from "./MenuButton";

export default function NavBar() {

    const {headerList, chooseHeader } = useContext(HeaderListContext);

    function handleHeaderClick(header: HeaderType) {
        
        const activatedHeader: ActiveHeaderType = {id: header.id}
        chooseHeader(activatedHeader);        
    }

    return (
        <AppBar position="static">
            <Toolbar>            
                <Typography sx={{ flexGrow: 1 }}>
                    <ShoppingCartIcon sx={ {fontSize: '45px'}} onClick={() => handleHeaderClick({id: 1, headerName: 'Home'})}/>
                </Typography>                
                {
                    headerList.map((header, index) => (
                        <Button key={index} sx={ {border: 'solid 1px', margin: '0 5px' }} color="inherit" onClick={() => handleHeaderClick(header)}>{header.headerName}</Button>
                    ))
                }
                
            </Toolbar>            
        </AppBar>
    );
}
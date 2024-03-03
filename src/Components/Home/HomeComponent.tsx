import { Box, Typography } from "@mui/material";

import MainSL from "../TestPlace/MainShoppingList";


export default function Home() {
    
    return (
    <>
        <Box sx={{ padding: 3, border: 'solid' }}> 
            <Typography variant="h2" component={'h1'}>
                Welcome Shopping!
            </Typography>
            
            <Typography paragraph>    
                This is shopping list app!            
            </Typography>

            <Typography>    
                Check, edit, remove products as you wish!
            </Typography>            
        </Box>

        <Box sx={ {border: "solid 1px", margin: '20px 0 0 0'}}>
            <Typography sx={ { textAlign: 'center', margin: '0 0 20px 0', border: 'solid 1px', color: 'red'}}>    
                This is TESTING COMPONENT for API V2 calls and for future version of .... SHOPPING LIST! :D 
            </Typography>            

            <MainSL />
        </Box>
        
    </>
    );

   


  }


  
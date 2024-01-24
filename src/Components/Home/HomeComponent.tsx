import { Box, Typography } from "@mui/material";

export default function MainContent() {
    return (
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
    );
  }
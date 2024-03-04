import { Button } from "@mui/material";
import { ReactNode } from "react";

type ButtonProps = {
    onClick: () => void;
    value: any;
    children: ReactNode;    
}

const ButtonStyle = {
    border: '1px solid #0066cc',
    backgroundColor: '#0099cc',
    color: '#ffffff',
    padding: '15px 10px',
    '&:disabled': {
        border: '1px solid #999999',
        backgroundColor: '#cccccc',
        color: '#666666'
      },
      '&:hover': {
        bgcolor: '#0055ff', // Maintain the same color on hover
      },
}

export default function ShoppingListButton({children, onClick, value}: ButtonProps) {

    return (
        <>
            <Button onClick={onClick} disabled={!value} sx={ButtonStyle}>
                {children}
            </Button>
        </>
    )
}
import { Button } from "@mui/material";
import { ReactNode } from "react";

type ButtonProps = {
    onClick: () => void;
    children: ReactNode;    
}

export default function TableButton({children, onClick}: ButtonProps) {

    return (
        <>
            <Button onClick={onClick} sx={ {border: 'solid', backgroundColor: 'cornsilk'}}>
                {children}
            </Button>
        </>
    )
}
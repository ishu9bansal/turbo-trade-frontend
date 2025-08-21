import { Container } from "@mui/material";
import type { PropsWithChildren } from "react";
import { containerStyles } from "./Layout.styles";

export default function ContainerLayout({children}: PropsWithChildren){
    return (
        <Container sx={containerStyles}>
            {children}
        </Container>
    );
}
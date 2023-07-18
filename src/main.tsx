import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import { Home } from "./Home";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ContactListProvider } from "./hooks/useContactList";

import "./styles/main.css";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ContactListProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Container
                    maxWidth={"sm"}
                    sx={{
                        mt: "55px",
                        mb: "70px",
                    }}
                >
                    <Routes>
                        <Route path="/contacts" element={<Home />} />
                        <Route path="/contacts/:id" element={<Home />} />
                        <Route path="*" element={<Navigate to="/contacts" replace />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    </ContactListProvider>
);

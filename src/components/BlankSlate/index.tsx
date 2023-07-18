import React from "react";
import { Button, styled, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const Container = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    [`> div`]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 14,
    },
}));

interface BlankSlateProps {
    title?: string;
    message: React.ReactNode;
    onActionClick?: () => void;
    actionIcon?: React.ReactNode;
    actionLabel?: string;
}

export const BlankSlate = ({ title, message, onActionClick, actionIcon, actionLabel }: BlankSlateProps) => {
    return (
        <Container>
            <TravelExploreIcon fontSize="large" />
            <div>
                {!!title ? <Typography variant="h6">{title}</Typography> : null}
                <Typography textAlign="center" sx={{ mb: "10px" }}>
                    {message}
                </Typography>
                {!!onActionClick ? (
                    <Button variant="outlined" onClick={onActionClick} startIcon={!!actionIcon ? actionIcon : null}>
                        {actionLabel}
                    </Button>
                ) : null}
            </div>
        </Container>
    );
};

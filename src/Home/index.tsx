import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Typography, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useContactList } from "../hooks/useContactList";
import { ContactList } from "./ContactList";
import { ContactFormDialog } from "./ContactFormDialog";

import "./style.css";

export const Home = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { onChangeFilter } = useContactList();

    const contactFormId = useMemo(() => {
        if (!id) return null;
        if (id === "new") {
            return "new";
        }
        const idValue = parseInt(id);
        if (idValue > 0) return idValue;
        return null;
    }, [id]);

    const handleNewContactClick = () => {
        navigate("new");
    };

    return (
        <div>
            <Typography variant="h2" sx={{ mb: "50px", textAlign: "center" }}>
                <PermContactCalendarIcon sx={{ mb: "-10px" }} />
                Phone Book App
            </Typography>
            <div className="header">
                <div>
                    <Typography variant="h5">Contacts</Typography>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon sx={{ mb: "2px" }} />}
                        onClick={handleNewContactClick}
                    >
                        Add Contact
                    </Button>
                </div>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    placeholder="Search for contact by last name..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => onChangeFilter(e.target.value)}
                />
            </div>
            <ContactList />
            <ContactFormDialog open={!!contactFormId} id={contactFormId} />
        </div>
    );
};

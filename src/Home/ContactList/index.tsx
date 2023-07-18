import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography, ListItem, ListItemButton, List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import { BlankSlate, ConfirmDialog } from "../../components";
import { useContactList } from "../../hooks/useContactList";
import { ContactDTO } from "../../interfaces";

import "./style.css";

interface ContactProps {
    contact: ContactDTO;
    onDelete: (id: number) => void;
    onClick: (id: number) => void;
}

const Contact = ({ contact: { id, name, lastName, phoneNumber }, onDelete, onClick }: ContactProps) => {
    const handleDeleteClick = (id: number) => {
        onDelete(id);
    };

    return (
        <ListItem
            secondaryAction={
                <IconButton aria-label="delete" onClick={() => handleDeleteClick(id as number)}>
                    <DeleteIcon />
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton onClick={() => onClick(id as number)}>
                <div className="contactInfoContainer">
                    <Typography variant="body2">
                        {name} {lastName}
                    </Typography>
                    <Typography variant="caption">
                        <PhoneIcon sx={{ mr: "5px", mb: "-2px" }} />
                        {phoneNumber}
                    </Typography>
                </div>
            </ListItemButton>
        </ListItem>
    );
};

export const ContactList = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [idMarkedForDeletion, setIdMarkedForDeletion] = useState<number | null>(null);

    const navigate = useNavigate();
    const { data, deleteContact } = useContactList();

    const handleDelete = (id: number) => {
        setIdMarkedForDeletion(id);
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        setOpen(false);
        if (!idMarkedForDeletion) return;
        deleteContact(idMarkedForDeletion);
        setIdMarkedForDeletion(null);
    };

    const handleUpdateClick = (id: number) => {
        navigate(`${id}`);
    };

    const handleNewContactClick = () => {
        navigate("new");
    };

    return (
        <>
            {data && data.length > 0 ? (
                <List disablePadding>
                    {data.map((contact) => (
                        <Contact
                            key={contact.id}
                            contact={contact}
                            onDelete={handleDelete}
                            onClick={handleUpdateClick}
                        />
                    ))}
                </List>
            ) : (
                <BlankSlate
                    title="No results"
                    message="No contact was found with the specified filter."
                    onActionClick={handleNewContactClick}
                    actionIcon={<AddIcon sx={{ mb: "2px" }} />}
                    actionLabel="Add Contact"
                />
            )}

            <ConfirmDialog
                open={open}
                title="Remove this contact?"
                content="Are you sure you want to delete this contact info ?"
                onClose={() => setOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

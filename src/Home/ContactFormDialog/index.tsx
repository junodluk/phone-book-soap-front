import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useContactList } from "../../hooks/useContactList";
import { contactService } from "../../services";
import { Input, InputMask } from "../../components";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface ContactFormDialogProps {
    open: boolean;
    id: number | "new" | null;
}

interface ContactFormSchema {
    name: string;
    lastName: string;
    phoneNumber: string;
}

export const ContactFormDialog: React.FC<ContactFormDialogProps> = ({ open, id }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { saveContact } = useContactList();

    const schema = object().shape({
        name: string().required("'Name' is required."),
        lastName: string().required("'Last name' is required."),
        phoneNumber: string()
            .matches(phoneRegExp, "'Phone number' is not valid.")
            .required("'Phone number' is required."),
    });

    const methods = useForm<ContactFormSchema>({
        resolver: yupResolver(schema),
    });

    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = methods;

    const handleFormSubmit = async ({ name, lastName, phoneNumber }: ContactFormSchema) => {
        setLoading(true);
        await saveContact({ id: id && id !== "new" ? id : undefined, name, lastName, phoneNumber });
        setLoading(false);

        handleClose();
    };

    useEffect(() => {
        setLoading(false);
        if (!id) return;
        if (id !== "new") {
            getData(id);
        }
    }, [id]);

    const getData = async (id: number) => {
        setLoading(true);
        const contact = await contactService.get(id);

        setValue("name", contact.name);
        setValue("lastName", contact.lastName);
        setValue("phoneNumber", contact.phoneNumber);

        setLoading(false);
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{id === "new" ? "New contact" : "Update contact info"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} style={{ marginTop: 16 }}>
                    <Grid container flexDirection="column" spacing={2}>
                        <Grid item md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        size="small"
                                        disabled={loading}
                                        error={!!errors.name}
                                        helperText={errors?.name?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Controller
                                control={control}
                                name="lastName"
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        label="Last name"
                                        variant="outlined"
                                        size="small"
                                        disabled={loading}
                                        error={!!errors.lastName}
                                        helperText={errors?.lastName?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <InputMask control={control} name="phoneNumber" mask="999-999-9999">
                                <Input
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    label="Phone number"
                                    size="small"
                                    error={!!errors?.phoneNumber}
                                    helperText={errors?.phoneNumber?.message}
                                />
                            </InputMask>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(handleFormSubmit)} disabled={loading}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

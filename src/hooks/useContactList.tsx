import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { contactService } from "../services";
import { ContactDTO } from "../interfaces";

interface ContactListContextData {
    data: Array<ContactDTO>;
    filter: string | undefined;
    onChangeFilter(filter: string): void;
    saveContact(data: ContactDTO): Promise<void>;
    deleteContact(id: number): Promise<void>;
}

const ContactListContext = createContext<ContactListContextData>({} as ContactListContextData);

export const ContactListProvider = ({ children }: any): JSX.Element => {
    const [data, setData] = useState<ContactDTO[]>([]);
    const [filter, setFilter] = useState<string>();

    const list = async (filterValue?: string) => {
        try {
            const result = await contactService.list({ lastName: filterValue });
            setData(result);
        } catch (error) {
            console.error("Error: " + error);
        }
    };

    const saveContact = useCallback(
        async ({ id, ...data }: ContactDTO) => {
            try {
                if (id) {
                    await contactService.update(id, data);
                } else {
                    await contactService.create({ id, ...data });
                }
                await list(filter);
            } catch (error) {
                console.error("Error: " + error);
            }
        },
        [filter]
    );

    const deleteContact = useCallback(
        async (id: number) => {
            try {
                await contactService.delete(id);
                await list(filter);
            } catch (error) {
                console.error("Error: " + error);
            }
        },
        [filter]
    );

    const onChangeFilter = (filterValue: string) => {
        setFilter(filterValue);
    };

    useEffect(() => {
        list(filter);
    }, [filter]);

    return (
        <ContactListContext.Provider
            value={{
                data: data,
                filter,
                onChangeFilter,
                saveContact,
                deleteContact,
            }}
        >
            {children}
        </ContactListContext.Provider>
    );
};

export const useContactList: () => ContactListContextData = () => {
    return useContext(ContactListContext);
};

import { ContactDTO } from "../interfaces";
import { AbstractService } from "./AbstractService";

class ContactService extends AbstractService<ContactDTO> {
    protected route = "/contact";
}

export const contactService = new ContactService();

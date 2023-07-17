import { FaAddressBook, FaPlus, FaPhoneAlt, FaTrash } from "react-icons/fa";

export const Home = () => {
    return (
        <div>
            <h1>
                <FaAddressBook />
                Phone Book App
            </h1>

            <div>
                <h2>Contacts</h2>
                <button>
                    <FaPlus /> Add Contact
                </button>
            </div>

            <div>
                <input type="text" placeholder="Search for contact by last name..." name="" id="" />
            </div>

            <div>
                <ul>
                    <li className="contato">
                        <span>Eric Elliot</span>
                        <span>
                            <FaPhoneAlt />
                            222-555-6575
                        </span>
                        <button>
                            <FaTrash />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

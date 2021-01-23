import { FormButton } from "../Form/FormStyled";
import { Contacts, ContactsListitem } from "./ContactsListStyled";

const ContactsList = ({ contactsList, filter, handleRemoveContact }) => {
  let list = contactsList.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  if (!list.length) list = contactsList;
  return (
    <Contacts>
      {list.map((li) => (
        <ContactsListitem key={li.id} name={li.name} number={li.number}>
          <span>{[li.name, li.number].join(", ")}</span>
          <FormButton data-id={li.id} onClick={handleRemoveContact}>
            Delete
          </FormButton>
        </ContactsListitem>
      ))}
    </Contacts>
  );
};

export default ContactsList;

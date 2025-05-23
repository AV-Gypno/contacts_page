import type { IComponent } from '../../types/component';
import LocalStorage from '../../db/localStorage';
import type { IContact } from '../../types/contact';
import { generateComponent } from '../../utils/componentGenerator';

const getContactStructure = (id: string, contactName: string, contactPhone: string): IComponent => ({
  tag: 'li',
  options: { className: 'contact-li' },
  children: [
    {
      tag: 'span',
      options: { className: 'contact-li__name', textContent: contactName },
    },
    {
      tag: 'div',
      options: { className: 'contact-li__controls' },
      children: [
        {
          tag: 'span',
          options: { className: 'contact-li__phone', textContent: contactPhone },
        },
        {
          tag: 'button',
          options: { className: 'contact-li__phone', textContent: contactPhone, id: `edit-${id}` },
        },
        {
          tag: 'button',
          options: { className: 'contact-li__phone', textContent: contactPhone, id: `delete-${id}` },
        },
      ],
    },
  ],
});

const getContacts = () => {
  const contacts = LocalStorage.getContacts();
  contacts.map((e: IContact) => getContactStructure(e.id, e.name, e.phone));

  return contacts;
};

const contacts: IComponent = {
  tag: 'ul',
  children: getContacts(),
};

const Contacts = () => {
  return generateComponent(contacts);
};

export default Contacts;

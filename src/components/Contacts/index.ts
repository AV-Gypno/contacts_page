import type { IComponent } from '../../types/component';
import LocalStorage from '../../db/localStorage';
import type { IContact } from '../../types/contact';
import { generateComponent } from '../../utils/componentGenerator';

import editImg from './../../assets/icons/edit.svg';
import deleteImg from './../../assets/icons/delete.svg';

import './style.scss';
import forceUpdate from '../../utils/forceUpdate';

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
          options: { className: 'contact-button edit', id: `edit--${id}` },
          children: [
            {
              tag: 'img',
              options: { src: editImg },
            },
          ],
        },
        {
          tag: 'button',
          options: { className: 'contact-button delete', id: `delete--${id}` },
          listeners: { click: deleteClickHandler },
          children: [
            {
              tag: 'img',
              options: { src: deleteImg },
            },
          ],
        },
      ],
    },
  ],
});

function deleteClickHandler(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const id = target.id.split('--')[1];
  LocalStorage.deleteContact(id);

  forceUpdate(document.querySelector('#contacts-list')!, Contacts);
}

const getContacts = (): IComponent[] => {
  const contacts = LocalStorage.getContacts();

  return contacts.length > 0
    ? contacts.map((e: IContact) => getContactStructure(e.id, e.name, e.phone))
    : [{ tag: 'p', options: { textContent: 'Список контактов пуст', className: 'empty-text' } }];
};

const getContactListStructure = (): IComponent => ({
  tag: 'ul',
  options: { className: 'contacts', id: 'contacts-list' },
  children: getContacts(),
});

const Contacts = () => {
  return generateComponent(getContactListStructure());
};

export default Contacts;

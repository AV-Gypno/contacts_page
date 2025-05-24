import type { IComponent } from '../../types/component';
import LocalStorage from '../../db/localStorage';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import DeleteSVG from '../../ui/icons/delete';
import EditIcon from '../../ui/icons/edit';

import './style.scss';

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
              tag: '',
              component: EditIcon('edit-svg'),
            },
          ],
        },
        {
          tag: 'button',
          options: { className: 'contact-button delete', id: `delete--${id}` },
          listeners: { click: deleteClickHandler },
          children: [
            {
              tag: '',
              component: DeleteSVG('delete-svg'),
            },
          ],
        },
      ],
    },
  ],
});

const getAccordeonItemStructure = (group: string, items: IComponent[]): IComponent => {
  return {
    tag: 'div',
    options: { className: 'accordeon-item' },
    children: [
      {
        tag: 'button',
        options: { className: 'accordeon-header' },
        children: [{ tag: 'h3', options: { className: 'accordeon-h', textContent: group } }],
        listeners: { click: toggleAccordion },
      },
      {
        tag: 'ul',
        options: { className: 'accordeon-content' },
        children: items,
      },
    ],
  };
};

function toggleAccordion(e: MouseEvent) {
  const target = e.target as HTMLButtonElement;
  const accordionItem = target.parentElement!;
  const isActive = accordionItem.classList.contains('active');
  console.log(accordionItem);

  document.querySelectorAll('.accordeon-item').forEach((item) => {
    item.classList.remove('active');
  });

  if (!isActive) {
    accordionItem.classList.add('active');
  }
}

function deleteClickHandler(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const id = target.id.split('--')[1];
  LocalStorage.deleteContact(id);

  forceUpdate(document.querySelector('#contacts-list')!, Contacts);
}

const getContactListStructure = (): IComponent => {
  const groups = LocalStorage.getGroups();
  const groupContacts = groups.map((group) => ({ group: group, data: LocalStorage.getGroupContact(group) }));

  const contacts = LocalStorage.getContacts();
  const isContactsEmpty = !contacts.length && !groups.length;
  const emptyText = [{ tag: 'p', options: { textContent: 'Список контактов пуст', className: 'empty-text' } }];

  const children = isContactsEmpty
    ? emptyText
    : groupContacts.map(({ group, data }) =>
        getAccordeonItemStructure(
          group,
          data.map((contact) => getContactStructure(contact.id, contact.name, contact.phone))
        )
      );

  return {
    tag: 'ul',
    options: { className: 'accordeon contacts', id: 'contacts-list' },
    children: children,
  };
};

const Contacts = () => {
  return generateComponent(getContactListStructure());
};

export default Contacts;

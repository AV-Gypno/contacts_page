import type { IComponent } from '../../types/component';
import LocalStorage from '../../db/localStorage';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import DeleteSVG from '../../ui/icons/delete';
import EditIcon from '../../ui/icons/edit';

import './style.scss';
import NameInput from '../../ui/inputs/Name';
import PhoneInput from '../../ui/inputs/Phone';
import openToast from '../../utils/openToast';

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
          tag: 'div',
          options: { className: 'contact-li__buttons' },
          children: [
            {
              tag: 'button',
              options: { className: 'contact-button edit', id: `edit--${id}` },
              children: [
                {
                  tag: '',
                  component: EditIcon('edit-svg'),
                },
              ],

              listeners: { click: editClickHandler },
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
    },
  ],
});

function editClickHandler(e: MouseEvent) {
  const target = e.target as HTMLButtonElement;
  const container = target.parentElement?.parentElement?.parentElement;

  const nameComponent = container?.querySelector('.contact-li__name') as HTMLElement;
  const oldName = nameComponent.textContent!;

  const phoneComponent = container?.querySelector('.contact-li__phone') as HTMLElement;
  const oldPhone = phoneComponent.textContent!;

  const editButton = container?.querySelector('.contact-button.edit') as HTMLElement;
  const deleteButton = container?.querySelector('.contact-button.delete') as HTMLElement;

  const inputName: IComponent = {
    tag: '',
    component: NameInput(oldName, '', 'edit-name'),
  };

  const inputPhone: IComponent = {
    tag: '',
    component: PhoneInput(oldPhone, '', 'edit-phone'),
  };

  const agreeButtonStructure: IComponent = {
    tag: 'button',
    options: { className: 'contact-button agree' },
    listeners: { click: agreeHandler },
  };

  const denyButtonStructure: IComponent = {
    tag: 'button',
    options: { className: 'contact-button deny' },
    listeners: { click: denyHandler },
  };

  const newNameComponent = generateComponent(inputName);
  const newPhoneComponent = generateComponent(inputPhone);
  const agreeButton = generateComponent(agreeButtonStructure);
  const denyButton = generateComponent(denyButtonStructure);

  nameComponent.replaceWith(newNameComponent);
  phoneComponent.replaceWith(newPhoneComponent);
  editButton.replaceWith(agreeButton);
  deleteButton.replaceWith(denyButton);

  function denyHandler() {
    newNameComponent.replaceWith(nameComponent);
    newPhoneComponent.replaceWith(phoneComponent);
    agreeButton.replaceWith(editButton);
    denyButton.replaceWith(deleteButton);
  }

  function agreeHandler() {
    const newName = (newNameComponent as HTMLInputElement).value;
    const newPhone = (newPhoneComponent as HTMLInputElement).value;
    if (newName && newPhone) {
      const newContact = LocalStorage.createDTO(newName, newPhone, LocalStorage.getContactById(oldPhone)?.group);
      LocalStorage.editContact(oldPhone, newContact);

      nameComponent.textContent = newName;
      phoneComponent.textContent = newPhone;

      newNameComponent.replaceWith(nameComponent);
      newPhoneComponent.replaceWith(phoneComponent);
      agreeButton.replaceWith(editButton);
      denyButton.replaceWith(deleteButton);

      openToast('Контакт успешно изменен');
    }
  }
}

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

  openToast('Контакт успешно удален');
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

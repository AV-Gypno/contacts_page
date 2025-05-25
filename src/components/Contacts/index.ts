import type { IComponent } from '../../types/component';
import LocalStorage from '../../db/localStorage';
import { generateComponent } from '../../utils/componentGenerator';
import forceUpdate from '../../utils/forceUpdate';
import openToast from '../../utils/openToast';

import {
  getAccordeonItemStructure,
  getAgreeButtonStructure,
  getContactStructure,
  getDenyButtonStructure,
  getEmptyTextStructure,
  getInputNameStructure,
  getInputPhone,
} from './structures';

import './style.scss';

const editClickHandler = (e: MouseEvent): void => {
  const target = e.target as HTMLButtonElement;
  const container = target.parentElement?.parentElement?.parentElement;

  const nameComponent = container?.querySelector('.contact-li__name') as HTMLElement;
  const oldName = nameComponent.textContent!;

  const phoneComponent = container?.querySelector('.contact-li__phone') as HTMLElement;
  const oldPhone = phoneComponent.textContent!;

  const editButton = container?.querySelector('.contact-button.edit') as HTMLElement;
  const deleteButton = container?.querySelector('.contact-button.delete') as HTMLElement;

  const closeEditMode = () => {
    newNameComponent.replaceWith(nameComponent);
    newPhoneComponent.replaceWith(phoneComponent);
    agreeButton.replaceWith(editButton);
    denyButton.replaceWith(deleteButton);
  };

  const agreeHandler = () => {
    const newName = (newNameComponent as HTMLInputElement).value;
    const newPhone = (newPhoneComponent as HTMLInputElement).value;
    if (newName && newPhone) {
      const newContact = LocalStorage.createDTO(newName, newPhone, LocalStorage.getContactById(oldPhone)?.group);
      LocalStorage.editContact(oldPhone, newContact);

      nameComponent.textContent = newName;
      phoneComponent.textContent = newPhone;

      closeEditMode();

      openToast('Контакт успешно изменен');
    }
  };

  const newNameComponent = generateComponent(getInputNameStructure(oldName));
  const newPhoneComponent = generateComponent(getInputPhone(oldPhone));
  const agreeButton = generateComponent(getAgreeButtonStructure(agreeHandler));
  const denyButton = generateComponent(getDenyButtonStructure(closeEditMode));

  nameComponent.replaceWith(newNameComponent);
  phoneComponent.replaceWith(newPhoneComponent);
  editButton.replaceWith(agreeButton);
  deleteButton.replaceWith(denyButton);
};

const deleteClickHandler = (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  const id = target.id.split('--')[1];
  LocalStorage.deleteContact(id);

  forceUpdate(document.querySelector('#contacts-list')!, Contacts);

  openToast('Контакт успешно удален');
};

const getContactListStructure = (): IComponent => {
  const groups = LocalStorage.getGroups();
  const groupContacts = groups.map((group) => ({ group: group, data: LocalStorage.getGroupContact(group) }));

  const contacts = LocalStorage.getContacts();
  const isContactsEmpty = !contacts.length && !groups.length;

  const children = isContactsEmpty
    ? getEmptyTextStructure()
    : groupContacts.map(({ group, data }) => {
        const itemsStructure = data.map((contact) =>
          getContactStructure(contact.id, contact.name, contact.phone, editClickHandler, deleteClickHandler)
        );

        return getAccordeonItemStructure(group, itemsStructure);
      });

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

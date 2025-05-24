import type { IContact } from '../types/contact';

class LocalStorage {
  static __saveContactsLS(data: IContact[]) {
    localStorage.setItem('contacts', JSON.stringify(data));
  }

  static __saveGroupsLS(data: string[]) {
    localStorage.setItem('groups', JSON.stringify(data));
  }

  static getContacts() {
    if (localStorage.getItem('contacts')) {
      return JSON.parse(localStorage.getItem('contacts') || '[]');
    }

    localStorage.setItem('contacts', JSON.stringify([]));

    return [];
  }

  static saveContact(newContact: IContact) {
    const items: IContact[] = this.getContacts();
    if (items.find((contact: IContact) => contact.phone === newContact.phone)) return 'Такой номер уже существует';

    items.push(newContact);
    this.__saveContactsLS(items);
  }

  static getGroups() {
    if (localStorage.getItem('groups')) {
      return JSON.parse(localStorage.getItem('groups') || '[]');
    }

    localStorage.setItem('groups', JSON.stringify([]));

    return [];
  }

  static saveGroup(newGroup: string) {
    const items: string[] = this.getGroups();
    if (items.find((group: string) => group === newGroup)) return 'Такая группа уже существует';

    items.push(newGroup);
    this.__saveGroupsLS(items);
  }

  static deleteContact(id: string) {
    const items = this.getContacts();
    const newItems = items.filter((e: IContact) => e.id !== id);
    this.__saveContactsLS(newItems);
  }
}

export default LocalStorage;

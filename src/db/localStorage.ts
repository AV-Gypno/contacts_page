import type { IContact } from '../types/contact';

class LocalStorage {
  static __saveContactsLS(data: IContact[]): void {
    localStorage.setItem('contacts', JSON.stringify(data));
  }

  static __saveGroupsLS(data: string[]): void {
    localStorage.setItem('groups', JSON.stringify(data));
  }

  static getContacts(): IContact[] {
    if (localStorage.getItem('contacts')) {
      return JSON.parse(localStorage.getItem('contacts') || '[]');
    }

    localStorage.setItem('contacts', JSON.stringify([]));

    return [];
  }

  static saveContact(newContact: IContact): string | void {
    const items: IContact[] = this.getContacts();
    if (items.find((contact: IContact) => contact.phone === newContact.phone)) return 'Такой номер уже существует';

    items.push(newContact);
    this.__saveContactsLS(items);
  }

  static deleteContact(id: string): void {
    const items = this.getContacts();
    const newItems = items.filter((e: IContact) => e.id !== id);
    this.__saveContactsLS(newItems);
  }

  static getGroups(): string[] {
    if (!localStorage.getItem('groups')) {
      localStorage.setItem('groups', JSON.stringify([]));
      return [];
    }

    return JSON.parse(localStorage.getItem('groups') || '[]');
  }

  static saveGroup(newGroup: string): string | void {
    const items: string[] = this.getGroups();
    if (items.find((group: string) => group === newGroup)) return 'Такая группа уже существует';

    items.push(newGroup);
    this.__saveGroupsLS(items);
  }

  static deleteGroup(deletedGroup: string): void {
    const items = this.getGroups();
    const newItems = items.filter((group: string) => group !== deletedGroup);
    this.__saveGroupsLS(newItems);
  }
}

export default LocalStorage;

import type { IContact } from '../types/contact';

class LocalStorage {
  private static __saveContactsLS(data: IContact[]): void {
    localStorage.setItem('contacts', JSON.stringify(data));
  }

  private static __saveGroupsLS(data: string[]): void {
    localStorage.setItem('groups', JSON.stringify(data));
  }

  static createDTO(name: string, phone: string, group?: string): IContact {
    return {
      id: phone,
      name: name,
      phone: phone,
      group: group || 'Bce',
    };
  }

  static getContacts(): IContact[] {
    if (localStorage.getItem('contacts')) {
      return JSON.parse(localStorage.getItem('contacts') || '[]');
    }

    localStorage.setItem('contacts', JSON.stringify([]));

    return [];
  }

  static getContactById(id: string): IContact | undefined {
    const items = this.getContacts();

    return items.find((item) => item.id === id);
  }

  static getGroupContact(group: string): IContact[] {
    const contacts = this.getContacts();

    return contacts.filter((contact) => contact.group.toLowerCase() === group.toLowerCase());
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
    if (items.find((group: string) => group.toLowerCase() === newGroup.toLowerCase())) return 'Такая группа уже существует';

    items.push(newGroup);
    this.__saveGroupsLS(items);
  }

  static deleteGroup(deletedGroup: string): void {
    const items = this.getGroups();
    const newItems = items.filter((group: string) => group.toLowerCase() !== deletedGroup.toLowerCase());
    this.__saveGroupsLS(newItems);

    const contacts = this.getContacts();
    const newContacts = contacts.filter((contact: IContact) => contact.group.toLowerCase() !== deletedGroup.toLowerCase());
    console.log(deletedGroup, newContacts);
    this.__saveContactsLS(newContacts);
  }

  static editContact(oldId: string, contact: IContact) {
    this.deleteContact(oldId);
    this.saveContact(contact);
  }
}

export default LocalStorage;

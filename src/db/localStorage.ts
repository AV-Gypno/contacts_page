import type { IContact } from '../types/contact';

class LocalStorage {
  static getContacts() {
    if (localStorage.getItem('contacts')) {
      return JSON.parse(localStorage.getItem('contacts') || '[]');
    }

    localStorage.setItem('contacts', JSON.stringify([]));

    return [];
  }

  static __saveLS(data: IContact[]) {
    localStorage.setItem('contacts', JSON.stringify(data));
  }

  static saveContact(contact: IContact) {
    const items = this.getContacts();
    if (items.find((e: IContact) => contact.phone === e.phone)) return 'Такой номер уже существует';

    items.push(contact);
    this.__saveLS(items);
  }

  static deleteContact(id: string) {
    const items = this.getContacts();
    const newItems = items.filter((e: IContact) => e.id !== id);
    this.__saveLS(newItems);
  }
}

export default LocalStorage;

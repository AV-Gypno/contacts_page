import type { IComponent } from '../../types/component';
import DeleteSVG from '../../ui/icons/delete';
import EditIcon from '../../ui/icons/edit';
import NameInput from '../../ui/inputs/Name';
import PhoneInput from '../../ui/inputs/Phone';

const getContactStructure = (
  id: string,
  contactName: string,
  contactPhone: string,
  editClickHandler: (e: MouseEvent) => void,
  deleteClickHandler: (e: MouseEvent) => void
): IComponent => ({
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

const getInputNameStructure = (oldName: string): IComponent => ({
  tag: '',
  component: NameInput(oldName, '', 'edit-name'),
});

const getInputPhone = (oldPhone: string): IComponent => ({
  tag: '',
  component: PhoneInput(oldPhone, '', 'edit-phone'),
});

const getAgreeButtonStructure = (agreeHandler: () => void): IComponent => ({
  tag: 'button',
  options: { className: 'contact-button agree' },
  listeners: { click: agreeHandler },
});

const getDenyButtonStructure = (denyHandler: () => void): IComponent => ({
  tag: 'button',
  options: { className: 'contact-button deny' },
  listeners: { click: denyHandler },
});

const getAccordeonItemStructure = (group: string, items: IComponent[]): IComponent => {
  const toggleAccordion = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const accordionItem = target.parentElement!;
    const isActive = accordionItem.classList.contains('active');

    document.querySelectorAll('.accordeon-item').forEach((item) => {
      item.classList.remove('active');
    });

    if (!isActive) {
      accordionItem.classList.add('active');
    }
  };

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

const getEmptyTextStructure = () => {
  return [{ tag: 'p', options: { textContent: 'Список контактов пуст', className: 'empty-text' } }];
};

export {
  getContactStructure,
  getInputNameStructure,
  getInputPhone,
  getAgreeButtonStructure,
  getDenyButtonStructure,
  getAccordeonItemStructure,
  getEmptyTextStructure,
};

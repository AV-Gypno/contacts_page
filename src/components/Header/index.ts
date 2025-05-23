import styles from './style.module.scss';

import { generateComponent } from '../../utils/componentGenerator';
import icon from './../../assets/icons/contact-book 1 (Traced).jpg';
import type { IComponent } from '../../types/component';
import ContactButton from '../../ui/buttons/Contact';
import MainButton from '../../ui/buttons/Main';

const header: IComponent = {
  tag: 'header',
  options: { className: styles['header'] },
  children: [
    {
      tag: 'div',
      options: { className: styles['contacts-book'] },
      children: [
        { tag: 'img', options: { className: styles['contacts-book__img'], src: icon } },
        { tag: 'h2', options: { className: styles['contacts-book__text'], textContent: 'Книга контактов' } },
      ],
    },

    {
      tag: 'div',
      options: {
        className: styles['controls'],
      },
      children: [
        { tag: '', component: ContactButton() },
        { tag: '', component: MainButton('Группы') },
      ],
    },
  ],
};

const Header = generateComponent(header);

export default Header;

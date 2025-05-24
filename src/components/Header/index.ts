import './style.scss';

import { generateComponent } from '../../utils/componentGenerator';
import icon from './../../assets/icons/contact-book 1 (Traced).jpg';
import type { IComponent } from '../../types/component';
import ContactButton from '../../ui/buttons/Contact';
import GroupButton from '../../ui/buttons/Group';

const header: IComponent = {
  tag: 'header',
  options: { className: 'header' },
  children: [
    {
      tag: 'div',
      options: { className: 'contacts-book' },
      children: [
        { tag: 'img', options: { className: 'contacts-book__img', src: icon } },
        { tag: 'h2', options: { className: 'contacts-book__text', textContent: 'Книга контактов' } },
      ],
    },
    {
      tag: 'div',
      options: {
        className: 'controls',
      },
      children: [
        { tag: '', component: ContactButton },
        { tag: '', component: GroupButton },
      ],
    },
  ],
};

const Header = generateComponent(header);

export default Header;

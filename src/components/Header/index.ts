import { generateComponent } from '../../utils/componentGenerator';
import { getHeaderStructure } from './structures';

import icon from './../../assets/icons/contact-book 1 (Traced).jpg';

import './style.scss';

const Header = (): HTMLElement => {
  const Header = generateComponent(getHeaderStructure(icon));

  return Header;
};

export default Header;

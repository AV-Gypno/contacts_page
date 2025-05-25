import { generateComponent } from '../../utils/componentGenerator';
import img from './../../assets/icons/check.svg';
import { getToastStructure } from './structures';

import './style.scss';

const Toast = (text: string = 'Контакт успешно создан') => {
  const Toast = generateComponent(getToastStructure(text, img));

  return Toast;
};

export default Toast;

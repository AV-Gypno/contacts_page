import { generateComponent } from '../../utils/componentGenerator';
import checkImg from './../../assets/icons/check.svg';
import './style.scss';

const getToastStructure = (text: string) => {
  return {
    tag: 'div',
    options: { className: 'toast', id: 'toast' },
    children: [
      {
        tag: 'img',
        options: { className: 'toast-img', src: checkImg },
      },
      { tag: 'p', options: { className: 'toast-text', textContent: text } },
    ],
  };
};

const Toast = (text: string = 'Контакт успешно создан') => {
  const Toast = generateComponent(getToastStructure(text));

  return Toast;
};

export default Toast;

import Popup from '../components/Popup';

export default function openPopup(group: string) {
  const popup = document.querySelector('#popup');
  popup?.remove();

  document.querySelector('#top-blackout')?.classList.add('active');
  document.querySelector('#app')?.append(Popup(group));
}

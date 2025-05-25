import imgGood from './../assets/icons/check.svg';
import imgBad from './../assets/icons/cross.png';

export default function openToast(text: string = 'Контакт успешно создан', isGood: boolean = true) {
  const toast = document.querySelector('#toast');
  const toastText = document.querySelector('.toast-text');

  const toastImg = document.querySelector('.toast-img') as HTMLImageElement;
  const img = isGood ? imgGood : imgBad;
  if (toastImg) toastImg.src = img;

  if (toastText) toastText.textContent = text;
  toast?.classList.add('active');

  const hideToast = () => toast?.classList.remove('active');

  setTimeout(hideToast, 3000);
}

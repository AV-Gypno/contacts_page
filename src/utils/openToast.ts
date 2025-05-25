export default function openToast(text: string = 'Контакт успешно создан') {
  const toast = document.querySelector('#toast');
  const toastText = document.querySelector('.toast-text');
  toastText!.textContent = text;
  toast?.classList.add('active');

  const hideToast = () => toast?.classList.remove('active');

  setTimeout(hideToast, 3000);
}

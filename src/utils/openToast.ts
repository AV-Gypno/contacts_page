export default function openToast() {
  const toast = document.querySelector('#toast');
  toast?.classList.add('active');

  const hideToast = () => toast?.classList.remove('active');

  setTimeout(hideToast, 3000);
}

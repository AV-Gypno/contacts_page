export default function closePopup() {
  document.querySelector('#popup')?.remove();
  document.querySelector('#top-blackout')?.classList.remove('active');
}

export default function closeAll() {
  document.querySelector('#popup')?.remove();
  document.querySelector('#top-blackout')?.classList.remove('active');
  document.querySelector('#blackout')?.classList.remove('active');
  document.querySelector('#group-aside')?.classList.remove('active');
  document.querySelector('#contact-aside')?.classList.remove('active');
}

import styles from './wave.module.scss';

export const waveAnimation = (ctx: HTMLButtonElement, event: MouseEvent) => {
  let size = Math.max(ctx.offsetWidth, ctx.offsetHeight),
    x = event.offsetX - size / 2,
    y = event.offsetY - size / 2,
    wave = ctx.querySelector('.wave');
  if (!wave) {
    wave = document.createElement('span');
    wave.className = styles['wave'];
  }

  (wave as HTMLElement).style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px`;
  ctx.appendChild(wave);
};

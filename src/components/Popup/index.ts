import { generateComponent } from '../../utils/componentGenerator';
import { getPopupStructure } from './structure';

import './style.scss';

const Popup = (group: string) => {
  const popup = generateComponent(getPopupStructure(group));

  return popup;
};

export default Popup;

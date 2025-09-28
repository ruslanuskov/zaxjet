import { Fancybox } from '@fancyapps/ui';
import ModalsClass from './modals';

const BASKET_BTN_SELECTOR = 'js-basket-btn';
const BASKET_ADD_SELECTOR = '#basket-add';

export default class HeaderClass {
  static init() {
    this.initBasketAddPopup();
  }

  static initBasketAddPopup() {
    const popup = document.querySelector(BASKET_ADD_SELECTOR);
    const parentEl = popup ? popup.parentElement : document.body;

    document.addEventListener('click', event => {
      if (!popup) return;

      const btn = event.target.closest(`.${BASKET_BTN_SELECTOR}`);
      const instance = Fancybox.getInstance();

      if (!btn) return;

      event.preventDefault();

      if (instance) {
        instance.close();

        if (instance.userSlides[0].src === BASKET_ADD_SELECTOR) return;
      }

      ModalsClass.showModal(BASKET_ADD_SELECTOR, {
        parentEl,
      });
    });
  }
}

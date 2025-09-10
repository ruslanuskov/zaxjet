import { throttle } from 'lodash';
import ModalsClass from './modals';
import { ACTIVE_CLASS } from '../utils/modificators';
import { THROTTLE_TIME } from '../utils/data';

const MOBINAV_SELECTOR = 'js-mobinav';
const MOBINAV_BTN_SELECTOR = 'js-mobinav-btn';

export default class MobinavClass {
  constructor() {
    this.btn = document.querySelector(`.${MOBINAV_BTN_SELECTOR}`);
    this.mobinav = document.querySelector(`.${MOBINAV_SELECTOR}`);
  }

  static init() {
    const instance = new this();

    instance.initMobinav();
  }

  initMobinav() {
    if (!this.btn && !this.mobinav) return;

    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.app.isLaptop || window.app.isDesktop) {
          this.mobinavClose();
        }
      }, THROTTLE_TIME),
    );

    this.btn.addEventListener('click', () => {
      if (this.btn.classList.contains(ACTIVE_CLASS)) {
        this.mobinavClose();

        return;
      }

      this.btn.classList.add(ACTIVE_CLASS);

      ModalsClass.showModal(this.mobinav, {
        mainClass: '_mobinav',
        autoFocus: false,
        dragToClose: false,
        on: {
          close: () => {
            this.btn.classList.remove(ACTIVE_CLASS);
          },
        },
      });
    });
  }

  mobinavClose() {
    if (!this.mobinav) return;

    const { id } = this.mobinav;

    if (!id) return;

    ModalsClass.closeModal(id);
  }
}

import { throttle } from 'lodash';
import ModalsClass from './classes/modals';
import MobinavClass from './classes/mobinav';
import CounterClass from './classes/counter';
import TooltipClass from './classes/toottip';
import DetailClass from './classes/detail';
import {
  MEDIA_SM,
  MEDIA_MD,
  MEDIA_LG,
  MEDIA_XL,
  THROTTLE_TIME,
} from './utils/data';

class MainClass {
  constructor(config) {
    if (typeof config === 'object') {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      });
    }

    this.mediaQuery = MainClass.getMediaQuery();

    this.init();
  }

  init() {
    this.changeMediaQuery();

    setTimeout(() => {
      ModalsClass.init();
      MobinavClass.init();
      CounterClass.init();
      TooltipClass.init();
      DetailClass.init();
    }, 0);
  }

  changeMediaQuery() {
    window.addEventListener(
      'resize',
      throttle(() => {
        this.mediaQuery = MainClass.getMediaQuery();
      }, THROTTLE_TIME),
    );
  }

  static getMediaQuery() {
    const clientWidth = window.innerWidth;

    switch (true) {
      case clientWidth >= MEDIA_XL.value:
        return MEDIA_XL.name;

      case clientWidth >= MEDIA_LG.value:
        return MEDIA_LG.name;

      case clientWidth >= MEDIA_MD.value:
        return MEDIA_MD.name;

      default:
        return MEDIA_SM.name;
    }
  }

  get isMobile() {
    return MEDIA_SM.name === this.mediaQuery;
  }

  get isTablet() {
    return MEDIA_MD.name === this.mediaQuery;
  }

  get isLaptop() {
    return MEDIA_LG.name === this.mediaQuery;
  }

  get isDesktop() {
    return MEDIA_XL.name === this.mediaQuery;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new MainClass(window.appConfig || {});
});

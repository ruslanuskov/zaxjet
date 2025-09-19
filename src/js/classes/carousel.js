import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import {
  SWIPER_PREV_BTN_SELECTOR,
  SWIPER_NEXT_BTN_SELECTOR,
} from '../utils/selectors';
import { DISABLED_CLASS, LOCK_CLASS } from '../utils/modificators';

export default class CarouselClass {
  static initCarousel(selector, options = {}) {
    if (!selector) return null;

    const {
      navigation = {
        nextEl: selector.querySelector(`.${SWIPER_NEXT_BTN_SELECTOR}`),
        prevEl: selector.querySelector(`.${SWIPER_PREV_BTN_SELECTOR}`),
        disabledClass: DISABLED_CLASS,
        lockClass: LOCK_CLASS,
      },
      ...params
    } = options;

    return new Swiper(selector, {
      modules: [Navigation, Thumbs],
      watchSlidesProgress: true,
      navigation,
      ...params,
    });
  }
}

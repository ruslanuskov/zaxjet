import { SELECTED_CLASS } from '../utils/modificators';
import CarouselClass from './carousel';

const DETAIL_GALLERY_SELECTOR = 'js-detail-gallery';
const DETAIL_THUMBS_SELECTOR = 'js-detail-thumbs';
const SETTINGS_CONTENT_SELECTOR = 'js-settings-content';
const SETTING_INPUT_SELECTOR = 'js-setting-input';

export default class DetailClass {
  static init() {
    this.initGallery();
    this.initSettings();
  }

  static initGallery() {
    const carouselEl = document.querySelector(`.${DETAIL_GALLERY_SELECTOR}`);

    if (!carouselEl) return;

    let thumbs;
    const thumbsEl = document.querySelector(`.${DETAIL_THUMBS_SELECTOR}`);

    if (thumbsEl) {
      thumbs = CarouselClass.initCarousel(thumbsEl, {
        slidesPerView: 3,
      });
    }

    CarouselClass.initCarousel(carouselEl, {
      slidesPerView: 1,
      thumbs: thumbs
        ? {
            swiper: thumbs,
            autoScrollOffset: 1,
          }
        : undefined,
    });
  }

  static initSettings() {
    const settings = document.querySelectorAll(`.${SETTING_INPUT_SELECTOR}`);

    if (!settings.length) return;

    settings.forEach(item => {
      this.initSettingsValue(item);

      item.addEventListener('change', () => {
        this.initSettingsValue(item);
      });
    });
  }

  static initSettingsValue(input) {
    if (!input) return;

    const parent = input.closest(`.${SETTINGS_CONTENT_SELECTOR}`);

    if (!parent) return;

    if (input.checked) {
      if (parent.classList.contains(SELECTED_CLASS)) return;

      parent.classList.add(SELECTED_CLASS);
    } else {
      const selected = parent.querySelector(
        `.${SETTING_INPUT_SELECTOR}:checked`,
      );

      if (selected) return;

      parent.classList.remove(SELECTED_CLASS);
    }
  }
}

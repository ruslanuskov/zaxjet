import { throttle } from 'lodash';
import ModalsClass from './modals';
import { ACTIVE_CLASS } from '../utils/modificators';
import { THROTTLE_TIME } from '../utils/data';

const FILTER_SELECTOR = 'js-filter';
const FILTER_BTN_SELECTOR = 'js-filter-btn';

export default class CatalogClass {
  constructor() {
    this.btnFilter = document.querySelector(`.${FILTER_BTN_SELECTOR}`);
    this.filter = document.querySelector(`.${FILTER_SELECTOR}`);
  }

  static init() {
    const instance = new this();

    instance.initFilter();
  }

  initFilter() {
    if (!this.btnFilter && !this.filter) return;

    window.addEventListener(
      'resize',
      throttle(() => {
        if (window.app.isLaptop || window.app.isDesktop) {
          this.filterClose();
        }
      }, THROTTLE_TIME),
    );

    this.btnFilter.addEventListener('click', () => {
      if (this.btnFilter.classList.contains(ACTIVE_CLASS)) {
        this.filterClose();

        return;
      }

      this.btnFilter.classList.add(ACTIVE_CLASS);

      ModalsClass.showModal(this.filter, {
        mainClass: '_filter',
        autoFocus: false,
        on: {
          close: () => {
            this.btnFilter.classList.remove(ACTIVE_CLASS);
          },
        },
      });
    });
  }

  filterClose() {
    if (!this.filter) return;

    const { id } = this.filter;

    if (!id) return;

    ModalsClass.closeModal(id);
  }
}

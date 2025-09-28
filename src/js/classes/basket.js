import { LOCK_CLASS } from '../utils/modificators';

const SELECTED_ALL_SELECTOR = 'js-selected-all';
const REMOVE_BTN_SELECTOR = 'js-remove-btn';
const SELECTED_ONE_SELECTOR = 'js-selected-one';

export default class BasketClass {
  constructor() {
    this.togglerAll = document.querySelector(`.${SELECTED_ALL_SELECTOR}`);
    this.removeBtn = document.querySelector(`.${REMOVE_BTN_SELECTOR}`);
  }

  static init() {
    const instance = new this();

    instance.toggleSelectedProducts();
  }

  toggleSelectedProducts() {
    if (this.togglerAll) {
      this.togglerAll.addEventListener('change', () => {
        this.toggleAllCheckboxes();
      });
    }

    document.addEventListener('change', event => {
      const checkbox = event.target.closest(`.${SELECTED_ONE_SELECTOR}`);

      if (!checkbox) return;

      const checkboxes = document.querySelectorAll(`.${SELECTED_ONE_SELECTOR}`);

      this.visibilitySwitchBtnRemove(checkboxes);

      if (checkbox.checked) {
        const notActiveCheckbox = Array.from(checkboxes).find(
          node => node.checked !== true,
        );

        if (!notActiveCheckbox) {
          this.togglerAll.checked = true;
        }

        checkbox.checked = true;

        return;
      }

      this.togglerAll.checked = false;
    });
  }

  toggleAllCheckboxes() {
    if (!this.togglerAll) return;

    const togglersOne = document.querySelectorAll(`.${SELECTED_ONE_SELECTOR}`);

    if (!togglersOne.length) return;

    togglersOne.forEach(item => {
      if (this.togglerAll.checked) {
        item.checked = true;
        this.showBtnRemove();
      } else {
        item.checked = false;
        this.hideBtnRemove();
      }
    });
  }

  visibilitySwitchBtnRemove(checkboxes) {
    if (!checkboxes.length) return;

    const activeCheckbox = Array.from(checkboxes).find(
      node => node.checked === true,
    );

    if (!activeCheckbox) {
      this.hideBtnRemove();
    } else {
      this.showBtnRemove();
    }
  }

  showBtnRemove() {
    if (!this.removeBtn) return;

    this.removeBtn.classList.remove(LOCK_CLASS);
  }

  hideBtnRemove() {
    if (!this.removeBtn) return;

    this.removeBtn.classList.add(LOCK_CLASS);
  }
}

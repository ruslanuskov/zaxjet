import { SELECTED_CLASS } from '../utils/modificators';

const SETTINGS_CONTENT_SELECTOR = 'js-settings-content';
const SETTING_INPUT_SELECTOR = 'js-setting-input';

export default class DetailClass {
  static init() {
    this.initSettings();
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

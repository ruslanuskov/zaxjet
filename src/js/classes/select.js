import TomSelect from 'tom-select';

const DEFAULT_SELECT_SELECTOR = 'js-default-select';
const AUTOCOMPLETE_SELECT_SELECTOR = 'js-autocomplete-select';

export default class SelectClass {
  static init() {
    this.initDefaultSelect();
    this.initAutocompleteSelect();
  }

  static initDefaultSelect() {
    const selects = document.querySelectorAll(`.${DEFAULT_SELECT_SELECTOR}`);

    if (!selects.length) return;

    selects.forEach(item => {
      this.initTomSelect(item, {
        controlInput: null,
      });
    });
  }

  static initAutocompleteSelect() {
    const selects = document.querySelectorAll(
      `.${AUTOCOMPLETE_SELECT_SELECTOR}`,
    );

    if (!selects.length) return;

    selects.forEach(item => {
      this.initTomSelect(item);
    });
  }

  static initTomSelect(selector = null, options = {}) {
    if (!selector) return {};

    return new TomSelect(selector, {
      maxOptions: null,
      highlight: false,
      render: {
        no_results() {
          return `<div class="no-results">Ничего не найдено</div>`;
        },
      },
      ...options,
    });
  }
}

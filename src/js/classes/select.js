import TomSelect from 'tom-select';

const DEFAULT_SELECT_SELECTOR = 'js-default-select';
const AUTOCOMPLETE_SELECT_SELECTOR = 'js-autocomplete-select';
const SORT_SELECT_SELECTOR = 'js-sort-select';

export default class SelectClass {
  static init() {
    this.initDefaultSelect();
    this.initAutocompleteSelect();
    this.initSortSelect();
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
      this.initTomSelect(item, {
        openOnFocus: false,
      });
    });
  }

  static initSortSelect() {
    const select = document.querySelector(`.${SORT_SELECT_SELECTOR}`);

    if (!select) return;

    this.initTomSelect(select, {
      hideSelected: true,
      controlInput: null,
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

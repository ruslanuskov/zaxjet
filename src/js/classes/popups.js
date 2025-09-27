import ModalsClass from './modals';

const BTN_POPUP_SELECTOR = '[data-popup]';

export default class PopupsClass {
  static init() {
    document.addEventListener('click', event => {
      const btn = event.target.closest(BTN_POPUP_SELECTOR);

      if (!btn) return;

      const { popup } = btn.dataset;

      if (!popup) return;

      ModalsClass.showModal(popup);
    });
  }
}

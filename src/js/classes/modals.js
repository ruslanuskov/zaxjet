import { Fancybox } from '@fancyapps/ui';

const FANCYBOX_SELECTOR = '[data-fancybox]';

export default class ModalsClass {
  static init() {
    this.initDefaultModals();
  }

  static initDefaultModals() {
    Fancybox.bind(FANCYBOX_SELECTOR, {
      Hash: false,
      showClass: 'f-fadeIn',
      hideClass: 'f-fadeOut',
      closeExisting: true,
    });
  }

  static showModal(content, options = {}) {
    if (!content) return;

    Fancybox.show(
      [
        {
          src: content,
          type: 'inline',
        },
      ],
      {
        Hash: false,
        showClass: 'f-fadeIn',
        hideClass: 'f-fadeOut',
        closeButton: false,
        closeExisting: true,
        ...options,
      },
    );
  }

  static closeModal(idModal = null) {
    if (!idModal) return;

    const instance = Fancybox.getInstance();

    if (instance && instance.userSlides[0].src.id === idModal) {
      instance.close();
    }
  }
}

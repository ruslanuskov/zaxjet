import { Fancybox } from '@fancyapps/ui';

export default class ModalsClass {
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

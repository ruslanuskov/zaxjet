import Inputmask from 'inputmask';

const TEL_FIELD_SELECTOR = 'js-tel-field';

export default class MaskClass {
  static async init() {
    this.initMaskTel();
  }

  static initMaskTel() {
    const fields = document.querySelectorAll(`.${TEL_FIELD_SELECTOR}`);

    this.initMask(fields, '+7 999 999-99-99');
  }

  static initMask(selectors, mask) {
    if (!selectors.length || !mask) return;

    const im = new Inputmask(mask, {
      showMaskOnHover: false,
    });

    im.mask(selectors);
  }
}

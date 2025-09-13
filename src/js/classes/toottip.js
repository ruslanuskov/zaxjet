import tippy from 'tippy.js';

const TIPPY_SELECTOR = '[data-tippy-content]';
const INFO_SELECTOR = 'js-info';
const INFO_TEXT_SELECTOR = 'js-info-text';

export default class TooltipClass {
  static init() {
    this.initTippyDefault();
    this.initTippyInfo();
  }

  static initTippyDefault() {
    tippy(TIPPY_SELECTOR);
  }

  static initTippyInfo(container = null) {
    const parent = container || document;
    const info = parent.querySelectorAll(`.${INFO_SELECTOR}`);

    if (!info.length) return;

    info.forEach(item => {
      const content = item.querySelector(`.${INFO_TEXT_SELECTOR}`);

      if (!content) return;

      tippy(`.${INFO_SELECTOR}`, {
        trigger: 'click',
        content: content.innerHTML,
        allowHTML: true,
        interactive: true,
      });
    });
  }
}

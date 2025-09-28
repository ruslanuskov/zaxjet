import { toggle } from 'slide-element';
import { SHOWN_CLASS } from '../utils/modificators';

const ACCORDION_TRIGGER_SELECTOR = 'js-accordion-trigger';

export default class AccordionClass {
  static init() {
    const instance = new this();

    instance.initAccordion();
  }

  initAccordion() {
    document.addEventListener('click', event => {
      const trigger = event.target.closest(
        this.selector || `.${ACCORDION_TRIGGER_SELECTOR}`,
      );

      if (
        !trigger ||
        (this.breakpoint !== null && window.innerWidth >= this.breakpoint)
      )
        return;

      const { id } = trigger.dataset;
      const content = id
        ? document.getElementById(id)
        : trigger.nextElementSibling;

      if (!content) return;

      trigger.classList.toggle(SHOWN_CLASS);
      toggle(content).then(() => {
        content.classList.toggle(SHOWN_CLASS);
      });
    });
  }
}

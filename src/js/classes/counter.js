const BTN_PLUS_SELECTOR = 'js-btn-plus';
const BTN_MINUS_SELECTOR = 'js-btn-minus';
const COUNTER_SELECTOR = 'js-counter';

export default class CounterClass {
  constructor(container) {
    if (!container) return;

    this.input = container.querySelector('input');
    this.plusBtn = container.querySelector(`.${BTN_PLUS_SELECTOR}`);
    this.minusBtn = container.querySelector(`.${BTN_MINUS_SELECTOR}`);
    this.min = this.getMinValue();
    this.max = this.getMaxValue();
    this.value = this.getValue();
  }

  static init() {
    const counters = document.querySelectorAll(`.${COUNTER_SELECTOR}`);

    if (!counters.length) return;

    counters.forEach(item => {
      const instance = new this(item);

      instance.initCounter();
    });
  }

  initCounter() {
    if (!this.input && !this.plusBtn && !this.minusBtn) return;

    this.input.value = this.getMinMax();

    this.input.addEventListener('input', () => {
      this.input.value = this.input.value.replace(/\D/g, '');

      if (this.input.value !== '') {
        this.input.value = this.getMinMax();
      }
    });

    this.input.addEventListener('blur', () => {
      this.input.value = this.getMinMax();
    });

    this.plusBtn.addEventListener('click', () => {
      this.increment();
    });

    this.minusBtn.addEventListener('click', () => {
      this.decrement();
    });
  }

  increment() {
    if (!this.input || this.getValue() >= this.max) return;

    this.input.value = this.getValue() + 1;
  }

  decrement() {
    if (!this.input || this.getValue() <= this.min) return;

    this.input.value = this.getValue() - 1;
  }

  getMinValue() {
    if (!this.input) return 1;

    const { min } = this.input;
    const result = parseInt(min, 10);

    return !Number.isNaN(Number(result)) ? result : 1;
  }

  getMaxValue() {
    if (!this.input) return 999;

    const { max } = this.input;
    const result = parseInt(max, 10);

    return !Number.isNaN(Number(result)) ? result : 999;
  }

  getValue() {
    if (!this.input) return this.getMinValue();

    const { value } = this.input;
    const result = parseInt(value, 10);

    return !Number.isNaN(Number(result)) ? result : this.getMinValue();
  }

  getMinMax() {
    if (!this.input) return this.value;

    let { value } = this.input;

    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }

    return value;
  }
}

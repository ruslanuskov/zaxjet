import GraphTabs from 'graph-tabs';

const TABS_SELECTOR = '[data-tabs]';

export default class TabsClass {
  static async init() {
    const tabsEl = document.querySelectorAll(TABS_SELECTOR);

    if (!tabsEl.length) return;

    tabsEl.forEach(item => {
      const { tabs } = item.dataset;

      if (!tabs) return {};

      return new GraphTabs(tabs);
    });
  }
}

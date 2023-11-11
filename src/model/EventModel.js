class EventModel {
  #date;
  #menu;

  setDate(date) {
    this.#date = date;
  }

  getDate() {
    return this.#date;
  }

  setMenu(menu) {
    this.#menu = menu;
  }

  getMenu() {
    return this.#menu;
  }

  summarizeOrder(order) {
    const mockOrder = '해산물파스타-2,레드와인-1,초코케이크-1';
    const summary = mockOrder
      .split(',')
      .map((el) => el.trim())
      .map((el = el.split('-')));

    return summary;
  }
}

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
    this.#menu = this.summarizeOrder(menu);
  }

  getMenu() {
    return this.#menu;
  }

  summarizeOrder(order) {
    const summary = order
      .split(',')
      .map((el) => el.trim())
      .map((el) => el.split('-'));

    return summary;
  }
}

export default EventModel;

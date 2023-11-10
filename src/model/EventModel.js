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
}

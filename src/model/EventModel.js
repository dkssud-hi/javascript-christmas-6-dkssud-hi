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
      .map((el) => {
        const menuInfo = el.split('-');
        return { name: menuInfo[0], quantity: menuInfo[1] };
      });
    /* 
     주문 정렬 형식
     : [[{name:메뉴1, quantity:주문수}],[{name:메뉴1, quantity:주문수}], ...]
     */
    return summary;
  }
}

export default EventModel;

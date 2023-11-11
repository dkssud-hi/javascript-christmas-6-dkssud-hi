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
    /* 
     주문 정렬 형식
     : [['메뉴1','메뉴1의 수량'],['메뉴2','메뉴2의 수량'],['메뉴3','메뉴3의 수량']]
     */
    return summary;
  }
}

export default EventModel;

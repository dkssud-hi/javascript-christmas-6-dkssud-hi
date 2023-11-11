import { PRICE_OF_MENUS } from '../constants/MenuInfo';

class EventController {
  calculateTotalAmountBeforeDiscount(menus) {
    let amount = 0;
    menus.forEach((menu) => {
      amount += Number(PRICE_OF_MENUS[menu.name]) * Number(menu.quantity);
    });

    return amount;
  }

  ConvertAmountToString(amount) {
    const insertPoint = 3;
    let countPoint = 0;
    const convertToArray = [];

    [...amount].forEach((syllable) => {
      convertToArray.push(syllable);

      countPoint = +1;
      if (countPoint === insertPoint) {
        convertToArray.push(',');
        countPoint = 0;
      }
    });

    return String(convertToArray);
  }
}

export default EventController;

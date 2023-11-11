import { Console } from '@woowacourse/mission-utils';
import { PRICE_OF_MENUS } from './constants/MenuInfo';

const OutputView = {
  printMenu(menus) {
    Console.print('<주문 메뉴>');
    menus.forEach((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });

    Console.print('\n\n');
  },

  printTotalAmountBeforeDiscount(amount) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${amount}원`);
  },
};

export default OutputView;

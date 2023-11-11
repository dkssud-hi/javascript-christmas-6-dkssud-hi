import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(menus) {
    Console.print('<주문 메뉴>');
    menus.forEach((menu) => {
      Console.print(`${menu.name} ${menu.quantity}개`);
    });

    Console.print('\n\n');
  },

  printTotalAmountBeforeDiscount(amount) {
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${amount}원`);
  },
};

export default OutputView;

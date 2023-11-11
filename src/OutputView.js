import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(menus) {
    Console.print('<주문 메뉴>');
    menus.forEach((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });

    Console.print('\n\n');
  },
};

export default OutputView;

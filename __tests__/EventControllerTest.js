import EventController from '../src/controller/EventController';
import { STATUS } from '../src/constants/EventConstants';
import { PRICE_OF_MENUS } from '../src/constants/MenuInfo';

describe('EventController 클래스 테스트', () => {
  test('할인 전 총 주문 금액을 계산하는 기능 테스트', () => {
    //given
    const mockMenus = [
      { name: '해산물파스타', quantity: '2' },
      { name: '레드와인', quantity: '1' },
      { name: '초코케이크', quantity: '1' },
    ];
    const controller = new EventController();

    //when
    const result = controller.calculateTotalAmountBeforeDiscount(mockMenus);

    //then
    expect(result).toEqual(145000);
  });

  test('증정이벤트에 해당하는지 판별하는 기능 테스트', () => {
    //given
    const mockAmount = [50000, 150000];
    const expectResult = [STATUS.NON_APPLICABLE_AMOUNT, PRICE_OF_MENUS.샴페인];
    const controller = new EventController();

    mockAmount.forEach((amount, idx) => {
      //when
      const result = controller.checkGiveawayEvent(amount);
      //then
      expect(result).toEqual(expectResult[idx]);
    });
  });

  test('크리스마스 디데이 할인 내역 반환하는 기능 테스트', () => {
    //given
    const mockDate = [3, 26];
    const expectResult = [1200, STATUS.NON_APPLICABLE_AMOUNT];
    const controller = new EventController();

    mockDate.forEach((date, idx) => {
      //when
      const result = controller.checkChirsmasDdayEvent(date);
      //then
      expect(result).toEqual(expectResult[idx]);
    });
  });

  test('평일이벤트 할인 내역을 반환하는 기능 테스트', () => {
    //given
    const expectResult = 2023;
    const controller = new EventController();

    //when
    const result = controller.checkWeekdayDiscountEvent(25, [
      { name: '해산물파스타', quantity: '2' },
      { name: '레드와인', quantity: '1' },
      { name: '초코케이크', quantity: '1' },
    ]);

    //then
    expect(result).toEqual(expectResult);
  });

  test('주말이벤트 할인 내역을 반환하는 기능 테스트', () => {
    //given
    const expectResult = 4046;
    const controller = new EventController();

    //when
    const result = controller.checkWeekendDiscountEvent(15, [
      { name: '해산물파스타', quantity: '2' },
      { name: '레드와인', quantity: '1' },
      { name: '초코케이크', quantity: '1' },
    ]);

    //then
    expect(result).toEqual(expectResult);
  });

  test('특별 할인 이벤트 내역을 반환하는 기능 테스트 ', () => {
    //given
    const expectResult = [1000, STATUS.NON_APPLICABLE_AMOUNT];
    const mockDate = [3, 11];
    const controller = new EventController();

    mockDate.forEach((date, idx) => {
      //when
      const result = controller.checkSpecialDiscountEvent(date);

      //then
      expect(result).toEqual(expectResult[idx]);
    });
  });

  test('할인 혜택 총 금액을 계산해주는 기능 테스트', () => {
    //given
    const expectResult = [
      ['크리스마스 디데이 할인', 1200],
      ['평일 할인', 4046],
      ['주말 할인', 0],
      ['특별 할인', 1000],
      ['증정 이벤트', 25000],
    ];
    const controller = new EventController();

    const result = controller.calculateBenefitAmountList(142000, 3, [
      { name: '티본스테이크', quantity: '1' },
      { name: '바비큐립', quantity: '1' },
      { name: '초코케이크', quantity: '2' },
      { name: '제로콜라', quantity: '1' },
    ]);

    expect(result).toEqual(expectResult);
  });
});

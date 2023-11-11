import EventController from '../src/controller/EventController';
import { STATUS } from '../src/constants/EventConstants';

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

  test('금액을 , 단위로 나누어주는 기능 테스트', () => {
    //given
    const mockAmount = 10000000000;
    const controller = new EventController();

    //when
    const result = controller.convertAmountToString(mockAmount);

    //then
    expect(result).toEqual('10,000,000,000');
  });

  test('증정이벤트에 해당하는지 판별하는 기능 테스트', () => {
    //given
    const mockAmount = [50000, 150000];
    const expectResult = [false, true];
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
    const expectResult = [1200, STATUS.NON_APPLICABLE];
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
});

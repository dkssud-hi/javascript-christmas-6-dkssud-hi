import EventController from '../src/controller/EventController';

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
    const result = controller.ConvertAmountToString(mockAmount);

    //then
    expect(result).toEqual('10,000,000,000');
  });
});

import EventModel from '../src/model/EventModel';

describe('EventModel 클래스 테스트', () => {
  test('summarizeOrder 메소드 테스트', () => {
    const mockModel = new EventModel();
    const result = mockModel.summarizeOrder(
      '해산물파스타-2,레드와인-1,초코케이크-1'
    );

    expect(result).toEqual([
      { name: '해산물파스타', quantity: '2' },
      { name: '레드와인', quantity: '1' },
      { name: '초코케이크', quantity: '1' },
    ]);
  });
});

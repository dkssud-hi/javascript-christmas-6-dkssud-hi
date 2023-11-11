import EventModel from '../src/model/EventModel';

describe('EventModel 클래스 테스트', () => {
  test('summarizeOrder 메소드 테스트', () => {
    const mockModel = new EventModel();
    const result = mockModel.summarizeOrder();

    expect(result).toEqual([
      ['해산물파스타', '2'],
      ['레드와인', '1'],
      ['초코케이크', '1'],
    ]);
  });
});

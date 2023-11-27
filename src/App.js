import EventModel from './model/EventModel';
import EventController from './controller/EventController';

class App {
  async run() {
    const model = new EventModel();
    const controller = new EventController(model);
    await controller.startEvent();
  }
}

export default App;

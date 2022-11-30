import { ModulePicker } from "./ModulePicker";
import { ModuleWithMock } from './element'
import { listenEvents, sendEvents } from '../constants/bridge'

export default class Bridge {
  modulePicker: ModulePicker;
  inIframe: boolean;
  selectedEl: ModuleWithMock | null = null

  constructor(modulePicker: ModulePicker) {
    this.modulePicker = modulePicker;
    this.inIframe = window.parent !== window;
    this.listenParent()
  }

  listenParent() {
    // if current page is in iframe, add listener to parent window
    if (this.inIframe) {
      window.addEventListener("message", (e) => {
        const data = e.data;
        if (!data) return;
        switch (data.type) {
          case listenEvents.START_SELECTING:
            this.modulePicker.startSelecting({
              onSelected: (id, el) => {
                this.selectedEl = el
                this.sendToParent(sendEvents.SELECTED, id);
              }
            });
            break;

          case listenEvents.STOP_SELECTING:
            this.modulePicker.stopSelecting();
            break;

          case listenEvents.UPDATE_MODULE:
            this.updateModule();
            break;

          default:
            break;
        }
      });
    }
  }

  sendToParent(event: string, data: any = {}) {
    if (this.inIframe) {
      window.parent.postMessage(
        {
          type: event,
          data,
        },
        "*"
      );
    }
  }

  updateModule() {
    this.selectedEl?.__mock_cb__ && this.selectedEl.__mock_cb__()
  }
}
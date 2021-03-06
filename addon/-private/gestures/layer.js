
export default class Layer {

  constructor(element) {
    this.element = element;
    this.recognizers = [];
    this._handlers = {};
  }

  recognize(input, streams, streamEvent) {
    let { recognizers } = this;

    for (let i = 0; i < recognizers.length; i++) {
      let recognizer = recognizers[i];

      if (recognizer.recognize(input, streams, streamEvent)) {
        input.handler = recognizer;
        return true;
      }
    }

    return false;
  }

  addRecognizer(recognizerInstance) {
    recognizerInstance.layer = this;
    this.recognizers.push(recognizerInstance);
  }

  emit(e) {
    let { name, event } = e;
    let handlers = (this._handlers['*'] || []).concat(this._handlers[name] || []);

    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(null, e);
    }
  }

  on(event, handler) {
    this._handlers[event] = this._handlers[event] || [];
    this._handlers[event].push(handler);
  }

  off() {}

}

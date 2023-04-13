import mitt from 'mitt';

type Events = {
  data: { data: unknown }
}

export class JsonStreamBuffer {
  public $e = mitt<Events>();
  private _decoder = new TextDecoder();
  private _buffer: string = '';

  private update() {
    let newlineIndex = -1;
    do {
      newlineIndex = this._buffer.indexOf('\n');
      // slice is exclusive - meaning the newline will not be included inside the slice
      const stringSlice = newlineIndex === -1 ? this._buffer : this._buffer.slice(0, newlineIndex);
      try {
        const data = JSON.parse(stringSlice);
        this.$e.emit('data', { data });
        // if the parsing is successfull -> remove the slice from the buffer (but skip the newline)
        this._buffer = this._buffer.slice(newlineIndex + 1);
      } catch {
        // we won't be handling any errors since we should expect
        // non-parsable JSON to come through
      }
    } while(newlineIndex > -1)
  }

  public feed(input: string | Uint8Array) {
    const chunk = (typeof input === 'string') ? input : this._decoder.decode(input);
    this._buffer += chunk;
    this.update();
  }

  public reset() {
    this._buffer = '';
  }
}

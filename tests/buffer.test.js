const { JsonStreamBuffer } = require('../');

describe('JsonStreamBuffer', () => {
  it('should work', () => {
    const buffer = new JsonStreamBuffer();

    const firstHandler = ({ data }) => {
      expect(data).toEqual({name:'John'});
      buffer.$e.off(firstHandler);
      buffer.$e.on('data', secondHandler);
    }

    const secondHandler = ({ data }) => {
      expect(data).toEqual({name:'Jane'});
      buffer.$e.off(secondHandler);
    }

    buffer.$e.on('data', firstHandler);

    buffer.feed('{"name":"');
    buffer.feed('John"}\n{');
    buffer.feed('"name":"');
    buffer.feed('Jane"}');
  });
});

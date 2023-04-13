# NDJSON Stream Parser

Example
```js
import { JsonStreamBuffer } from 'ndjson-stream-parser';

const buff = new JsonStreamBuffer();
buff.$e.on('data', console.log);
buff.feed('{"name":"');
buff.feed('Liam"}\n{');
```

Output:
```json
{"data": {"name": "Liam"}}
```

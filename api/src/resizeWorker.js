const { parentPort, workerData } = require('worker_threads');
const gm = require('gm');

gm(workerData.source)
  .resize(100, 100)
  .write(workerData.destination, (err) => {
    if (err) {
      throw new Error(err);
      return;
    }
    parentPort.postMessage({
      resized: true,
    });
  });

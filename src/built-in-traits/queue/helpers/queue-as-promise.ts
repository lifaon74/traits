import { TraitQueue } from '../trait-queue/trait-queue';

/**
 * Returns a Promise:
 *  - resolved when promise.queue triggers, which calls 'callback'
 *  - with callback's result
 *  - rejected if callback fails
 *
 *  INFO: different than
 *   - QueueToPromise(target).then(callback) => here callback is called in a different event loop
 */
export function QueueAsPromise<GValue>(
  target: TraitQueue<any>,
  callback: () => (Promise<GValue> | GValue),
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: Promise<GValue> | GValue) => void,
    reject: (reason?: any) => void
  ) => {
    target.queue(() => {
      try {
        resolve(callback());
      } catch (error: any) {
        reject(error);
      }
    });
  });
}

import { TraitQueue } from '../trait-queue/trait-queue';

/**
 * Returns a Promise resolved when the queue triggers
 */
export function QueueToPromise(
  target: TraitQueue<any>,
): Promise<void> {
  return new Promise<void>((
    resolve: () => void,
  ) => {
    target.queue(resolve);
  });
}


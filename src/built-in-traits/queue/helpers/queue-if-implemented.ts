import { TraitIsImplementedBy } from '../../../core/traits/trait-is-implemented-by';
import { TQueueCallback, TraitQueue } from '../trait-queue/trait-queue';


export function QueueIfImplemented(
  target: any,
  callback: TQueueCallback,
  noQueue: TQueueCallback,
): void {
  if (TraitIsImplementedBy(TraitQueue, target)) {
    target.queue(callback);
  } else {
    noQueue();
  }
}

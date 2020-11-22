import { Trait } from '../../../core/traits/trait-decorator';
import { TraitQueue } from '../trait-queue/trait-queue';
import { TraitGetQueue } from './trait-get-queue';
import { QueueToPromise } from '../helpers/queue-to-promise';


@Trait()
export abstract class TraitGetQueueUsingQueue<GSelf extends TraitQueue<any>> extends TraitGetQueue<GSelf> {
  getQueue(this: GSelf): Promise<void> {
    return QueueToPromise(this);
  }
}


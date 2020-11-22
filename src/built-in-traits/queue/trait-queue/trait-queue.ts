import { Trait } from '../../../core/traits/trait-decorator';

export type TQueueCallback = () => (Promise<void> | void);


@Trait()
export abstract class TraitQueue<GSelf> {
  /**
   * Appends 'callback' to the list of tasks to do.
   *  - follows order
   *  - callback should never fail. If it does, next tasks should not be called
   */
  abstract queue(this: GSelf, callback: TQueueCallback): GSelf;
}


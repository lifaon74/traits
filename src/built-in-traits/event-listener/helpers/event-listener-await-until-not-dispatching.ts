import { TraitEventListenerIsDispatching } from '../trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';

/**
 * Calls 'onNotDispatching' as soon as eventListener is not dispatching
 */
export function EventListenerAwaitUntilNotDispatching(
  eventListener: TraitEventListenerIsDispatching<any>,
  onNotDispatching: () => void
): void {
  if (eventListener.isDispatching()) {
    setImmediate(() => EventListenerAwaitUntilNotDispatching(eventListener, onNotDispatching));
  } else {
    onNotDispatching();
  }
}

/**
 * Like EventListenerAwaitUntilNotDispatching, but returns a Promise
 * WARN: because Promise.then is async, do not assume the 'eventListener' is not dispatching. USE 'onNotDispatching' instead.
 */
export function EventListenerAwaitUntilNotDispatchingWithPromise<GValue>(
  eventListener: TraitEventListenerIsDispatching<any>,
  onNotDispatching: () => (Promise<GValue> | GValue)
): Promise<GValue> {
  return new Promise<GValue>((
    resolve: (value: Promise<GValue> | GValue) => void,
    reject: (reason: any) => void
  ) => {
    EventListenerAwaitUntilNotDispatching(eventListener, () => {
      try {
        resolve(onNotDispatching());
      } catch (error) {
        reject(error);
      }
    });
  });
}

export namespace testTools {
  export function sleep(t: number): Promise<void> {
    return new Promise((_) => setTimeout(_, t));
  }

  export function polyfillRequestIdleCallback(): void {
    globalThis.requestIdleCallback ??= (
      callback: IdleRequestCallback,
      { timeout = 0 }: IdleRequestOptions = {},
    ): number => {
      return setTimeout(callback, timeout);
    };

    globalThis.cancelIdleCallback ??= (handle: number): void => {
      clearTimeout(handle);
    };
  }
}

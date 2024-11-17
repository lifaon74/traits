import { PRIVATE } from './private.constant.js';

export class Private<GPrivate extends object> {
  readonly [PRIVATE]: GPrivate;

  constructor(_private: GPrivate) {
    this[PRIVATE] = _private;
  }
}

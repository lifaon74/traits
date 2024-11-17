import { NEW } from './new.constant.js';

export interface NewTrait<GArgs extends readonly any[], GReturn> {
  [NEW]: (...args: GArgs) => GReturn;
}

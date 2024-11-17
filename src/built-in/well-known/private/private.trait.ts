import { PrivateKey } from './private.constant.js';

export type PrivateTrait<GPrivate extends object> = Record<PrivateKey, GPrivate>;

import { IImplementationDetails } from '../../../implementation/internal/implementations-map.constant';

// map from a variable to the list of its implementations
export const ANY_TO_IMPLEMENTATIONS_MAP = new WeakMap<any, Set<IImplementationDetails>>();

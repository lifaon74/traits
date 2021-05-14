import { IConstructor } from '../../../types/class/class-constructor.type';
import { IImplementationDetails, IMPLEMENTATIONS_MAP } from './implementations-map.constant';


export function getImplementationDetailsOrThrow(
  traitImplementation: IConstructor,
): IImplementationDetails {
  if (IMPLEMENTATIONS_MAP.has(traitImplementation)) {
    return IMPLEMENTATIONS_MAP.get(traitImplementation) as IImplementationDetails;
  } else {
    throw new Error(generateNotAnImplementationErrorMessage(traitImplementation));
  }
}

export function generateNotAnImplementationErrorMessage(
  traitImplementation: IConstructor,
): string {
  return `'${ traitImplementation.name }' is not an implementation. Did you forgot the decorator @Impl() ?`;
}

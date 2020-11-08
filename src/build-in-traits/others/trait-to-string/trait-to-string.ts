import { Trait } from '../../../core/traits/trait-decorator';

/*
pub trait ToString {
    fn to_string(&self) -> String;
}
 */

/*
impl ToString for char {
    #[inline]
    fn to_string(&self) -> String {
        String::from(self.encode_utf8(&mut [0; 4]))
    }
}
 */

@Trait()
export abstract class TraitToString<GSelf> {
  abstract toString(this: GSelf): string;
}

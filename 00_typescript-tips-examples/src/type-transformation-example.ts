// Video Tutorial: https://www.youtube.com/watch?v=4AfwfVRQ-V8
type LegacyApi = {
  legacy_nameV1: string;
  legacy_nameV2: string;
  legacy_nameV3: string;
  legacy_timstampV1: string;
  new_timestampV1: string;
  legacy_userV1: {
    legacy_uuiV1: number;
    legacy_uuid_V2: string;
    legacy_firstnameV1: string;
  };
};

type FromTo = { from: string; to: string };

/**
 * Replaces all occurrences of `From` with `To` in a string.
 *
 * Description: Infered `Before` can also be an empty string.
 */
type SearchAndReplace<T, From extends string, To extends string> = T extends `${infer Before}${From}${infer After}`
  ? SearchAndReplace<`${Before}${To}${After}`, From, To>
  : T;

/**
 * Replaces all occurrences of all `FromTo` descriptions in a string.
 */
type SearchAndReplaceAll<T, FromToArray extends FromTo[]> = FromToArray extends [
  { from: infer From extends string; to: infer To extends string },
  ...infer Remaining extends FromTo[]
]
  ? SearchAndReplaceAll<SearchAndReplace<T, From, To>, Remaining>
  : T;

type Replacements = [
  { from: 'legacy_'; to: '' },
  { from: 'new_'; to: '' },
  { from: `V${number}`; to: '' },
  { from: 'timstamp'; to: 'timestamp' },
  { from: 'uuid_'; to: 'id' },
  { from: 'uuid'; to: 'id' }
];

type DeepReplace<T, FromToArray extends FromTo[]> = {
  [Key in keyof T as SearchAndReplaceAll<Key, FromToArray>]: DeepReplace<T[Key], FromToArray>;
};

type Check1 = SearchAndReplace<'legacy_legacy_nameV1', `legacy_`, ''>;
//  	^?
type Check2 = SearchAndReplace<'nameV1', `V${number}`, ''>;
//  	^?
type Check3 = SearchAndReplaceAll<'legacy_nameV1', Replacements>;
//  	^?
type Api = DeepReplace<LegacyApi, Replacements>;
//  	^?

const api: Api = {
  name: 'foo',
  timestamp: '1234',
  user: {
    uui: 123,
    id: '1',
    firstname: 'John',
  },
};

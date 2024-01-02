import { formatGraphQL, formatJSON, parseBlock } from '../utils/prettify';

describe('formatGraphQL', () => {
  it('formats GraphQL query', () => {
    const query = '{ user { id name } }';
    const expected = '{\n  user {\n    id\n    name\n  }\n}';
    expect(formatGraphQL(query)).toBe(expected);
  });

  it("throws error when the brackets don't match", () => {
    const query = '{ user { id name }';
    expect(() => formatGraphQL(query)).toThrow('bracketMismatch');
  });

  it('throws an error if there are no open braces', () => {
    expect(() => formatGraphQL('simple string')).toThrowError('noQuery');
  });

  it('adds a comment block when the line starts with #', () => {
    const result = formatGraphQL('query user { id name }# comment\n{}');
    expect(result).toContain('# comment');
  });

  it('ends a comment block when the line ends with a newline', () => {
    const result = formatGraphQL('# comment\n{}');
    expect(result).toContain('# comment');
  });

  it('adds spaces correctly', () => {
    const query = 'query PersonName ($id:Int=1) { person (id:$id) { name } }';
    const result = formatGraphQL(query);
    expect(result).toEqual(
      'query PersonName($id: Int = 1) {\n  person(id: $id) {\n    name\n  }\n}'
    );
  });
});

describe('parseBlock', () => {
  it('parses GraphQL block', () => {
    const block = 'query user { id name }';
    const expected = 'query user {\n  id\n  name\n}';
    expect(parseBlock(block)).toBe(expected);
  });
});

describe('formatJSON', () => {
  it('formats JSON correctly', () => {
    const json = '{"user":{"id":1,"name":"John Doe"}}';
    const expected =
      '{\n  "user": {\n    "id": 1,\n    "name": "John Doe"\n  }\n}';
    expect(formatJSON(json, 'Variables')).toBe(expected);
  });
  it('throws an error if the input is not valid JSON', () => {
    const invalidJSON = 'not a json string';
    const origin = 'TestOrigin';
    expect(() => formatJSON(invalidJSON, origin)).toThrowError(
      'invalidJSONTestOrigin'
    );
  });
});

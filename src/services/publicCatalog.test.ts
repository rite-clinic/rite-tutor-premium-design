import { describe, expect, it } from 'vitest';
import { validate } from '../../scripts/public-catalog.mjs';

describe('shared development and production catalog', () => {
  it('keeps published courses but drops price, tutor and private module fields', () => {
    const published = { id: 22, title: 'Python', is_course_verified: true, show_on_website: true, charges: 'private', author: { first_name: 'Private' }, subcourses: [{ id: 1, active: true, visible_to_free_users: false, file: '/private.pdf' }] };
    const result = validate({ data: [published, { ...published, id: 23, show_on_website: false }] });
    expect(result).toHaveLength(1);
    expect(result[0]).not.toHaveProperty('charges');
    expect(result[0]).not.toHaveProperty('author');
    expect(result[0].subcourses).toEqual([{ id: 1, active: true, visible_to_free_users: false, title: undefined, description: undefined }]);
  });
  it('rejects malformed data instead of treating an HTML fallback as an empty catalog', () => {
    expect(() => validate('<html>SPA fallback</html>')).toThrow('invalid catalog');
  });
});

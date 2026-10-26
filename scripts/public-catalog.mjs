export function validate(data) {
  const list = Array.isArray(data) ? data : data?.data;
  if (!Array.isArray(list)) throw new Error('Course API returned an invalid catalog.');
  const courses = list.filter(course => course.is_course_verified === true && course.show_on_website === true);
  if (courses.some(course => !Number.isInteger(course.id) || course.id <= 0 || !course.title?.trim())) throw new Error('A public course has an invalid ID or title.');
  if (new Set(courses.map(course => course.id)).size !== courses.length) throw new Error('Duplicate public course IDs.');
  // The public endpoint includes fields the website does not need (such as
  // author email addresses). Keep the embedded payload limited to display data.
  const fields = ['id', 'title', 'subtitle', 'intro', 'course_type', 'num_classes', 'duration', 'image', 'brochure', 'description', 'is_course_verified', 'show_on_website'];
  return courses.map(course => ({
    ...Object.fromEntries(fields.filter(key => course[key] !== undefined).map(key => [key, course[key]])),
    subcourses: (course.subcourses || []).filter(item => item.active === true).map(item => ({ id: item.id, title: item.title, description: item.description, active: item.active, visible_to_free_users: item.visible_to_free_users, ...(item.visible_to_free_users && item.file ? { file: item.file } : {}) })),
  }));
}


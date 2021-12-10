export type Category = "topStories" | "newStories" | "bestStories";

const category: Record<Category, Category> = {
  'topStories': 'topStories',
  'newStories': 'newStories',
  'bestStories': 'bestStories'
}

const timestamp = Object.keys(category).reduce((acc, key) => {
  acc[key] = `${key}Timestamp`;
  return acc;
}, {} as Record<Category, string>);

export { category, timestamp }
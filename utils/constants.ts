export type Category = "topStories" | "newStories" | "bestStories";

const category: Record<Category, Category> = {
  'topStories': 'topStories',
  'newStories': 'newStories',
  'bestStories': 'bestStories'
}

const cachedDate = Object.keys(category).reduce((acc, key) => {
  acc[key] = `${key}CachedDate`;
  return acc;
}, {} as Record<Category, string>);

export { category, cachedDate }
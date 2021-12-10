export type Category = "topStories" | "newStories" | "bestStories";

const CATEGORY: Record<Category, Category> = {
  'topStories': 'topStories',
  'newStories': 'newStories',
  'bestStories': 'bestStories'
}

const TIMESTAMP = Object.keys(CATEGORY).reduce((acc, key) => {
  acc[key] = `${key}Timestamp`;
  return acc;
}, {} as Record<Category, string>);


const ONE_HOUR = 60 * 60;
const CACHE_EXPIRATION = ONE_HOUR;


export { CATEGORY, TIMESTAMP, CACHE_EXPIRATION }
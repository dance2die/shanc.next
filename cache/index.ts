import { Story } from '#types/index';
import redis from './redis';
import { CATEGORY, TIMESTAMP, CACHE_EXPIRATION, Category } from 'utils/constants';

async function getCachedStories(name: string) {
  let cache = await redis.get(name);
  let cachedDate = Number(await redis.get(TIMESTAMP[name])) ?? Date.now();
  let cachedStories = cache ? JSON.parse(cache) : null;
  return { cachedStories, cachedDate };
}

async function cacheStories(stories: Story[], category: Category) {
  await redis.set(category, JSON.stringify(stories), 'EX', CACHE_EXPIRATION);
  await redis.set(TIMESTAMP[category], Date.now());
}

const cacheTopStories = async (stories: Story[]) => await cacheStories(stories, CATEGORY.topStories);
const cacheNewStories = async (stories: Story[]) => await cacheStories(stories, CATEGORY.newStories);
const cacheBestStories = async (stories: Story[]) => await cacheStories(stories, CATEGORY.bestStories);

const getCachedTopStories = async () => await getCachedStories(CATEGORY.topStories);
const getCachedNewStories = async () => await getCachedStories(CATEGORY.newStories);
const getCachedBestStories = async () => await getCachedStories(CATEGORY.bestStories);

export {
  getCachedTopStories, getCachedNewStories, getCachedBestStories,
  cacheTopStories, cacheNewStories, cacheBestStories
};
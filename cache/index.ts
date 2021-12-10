import { Story } from '#types/index';
import redis from './redis';
import { category, cachedDate as cachedDateMap, Category } from 'utils/constants';

const ONE_HOUR = 60 * 60;
const CACHE_EXPIRATION = ONE_HOUR;

async function getCachedStories(name: string) {
  let cache = await redis.get(name);
  let cachedDate = Number(await redis.get(cachedDateMap[name])) ?? Date.now();
  let cachedStories = cache ? JSON.parse(cache) : null;
  return { cachedStories, cachedDate };
}

async function cacheStories(stories: Story[], category: Category) {
  await redis.set(category, JSON.stringify(stories), 'EX', CACHE_EXPIRATION);
  await redis.set(cachedDateMap[category], Date.now());
}

const cacheTopStories = async (stories: Story[]) => await cacheStories(stories, category.topStories);
const cacheNewStories = async (stories: Story[]) => await cacheStories(stories, category.newStories);
const cacheBestStories = async (stories: Story[]) => await cacheStories(stories, category.bestStories);

const getCachedTopStories = async () => await getCachedStories(category.topStories);
const getCachedNewStories = async () => await getCachedStories(category.newStories);
const getCachedBestStories = async () => await getCachedStories(category.bestStories);

export {
  getCachedTopStories, getCachedNewStories, getCachedBestStories,
  cacheTopStories, cacheNewStories, cacheBestStories
};
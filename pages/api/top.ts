import { Story } from '#types/index';
import { getTopStories } from 'utils/story';
import { getCachedTopStories, cacheTopStories } from 'cache';

// based on https://levelup.gitconnected.com/speed-up-your-next-js-application-with-redis-2907b86a4610
export default async (req, res) => {
  let start = Date.now();
  const { cachedStories, cachedDate } = await getCachedTopStories();
  let result = {};

  if (cachedStories) {
    result = { stories: cachedStories, type: 'cache', latency: Date.now() - start, cachedDate }
  }
  else {
    start = Date.now();
    const stories: Story[] = await getTopStories();

    cacheTopStories(stories);

    result = { stories, type: 'api', latency: Date.now() - start, cachedDate }
  }

  return res.status(200).json(result);
}
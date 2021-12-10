import { Story } from "#types/index";
import { getItemUrl, urls } from "./urls";

async function getStories(url: string) {
  try {
    const storyIdsResponse = await fetch(url);
    if (!storyIdsResponse) return null;
    const storyIds = await storyIdsResponse.json();

    const stories: Story[] | null = [];
    for (const id of storyIds) {
      const storyPromise = await fetch(getItemUrl(id));
      if (!storyPromise) continue;

      const story = await storyPromise.json();
      stories.push(story);
    }

    return stories;
  }
  catch (error) {
    return null;
  }
}

const getTopStories = async () => await getStories(urls.top);
const getNewStories = async () => await getStories(urls.new);
const getBestStories = async () => await getStories(urls.best);

export { getTopStories, getNewStories, getBestStories };

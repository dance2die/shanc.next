const urls = {
  top: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  new: 'https://hacker-news.firebaseio.com/v0/newstories.json',
  best: 'https://hacker-news.firebaseio.com/v0/beststories.json',
}

const getItemUrl = (storyId: number) => `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`

export { urls, getItemUrl }
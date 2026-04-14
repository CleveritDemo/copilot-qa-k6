export const testUrls = {
  k6_test: 'https://test.k6.io',
  k6_api: 'https://test-api.k6.io',
  jsonplaceholder: 'https://jsonplaceholder.typicode.com/posts/',
};

export function getTestData() {
  const userId = Math.floor(Math.random() * 100) + 1;
  const title = `Post Title ${Math.random().toString(36).substring(7)}`;
  const body = `Message generated on ${new Date().toISOString()}`;

  return {
    userId: userId,
    title: title,
    body: body,
  };
}

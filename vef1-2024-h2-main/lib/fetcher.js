export async function fetcher(url) {
  console.log("fetching", url);
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

export async function fetchSubData(type, content) {
  const file = `/data/${type}/${content}.json`;
  console.log("fetching" + file);
  const response = await fetch(file);
  const json = await response.json();

  return json;
}

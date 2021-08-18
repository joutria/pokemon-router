export async function searchInfo(url) {
  let result = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return result;
}

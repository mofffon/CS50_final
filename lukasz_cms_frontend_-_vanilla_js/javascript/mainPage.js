import config from "./config.json" assert { type: "json" };

export const getRandomArticle = async () => {
  const from = new Date();
  from.setDate(from.getDate() - 7);

  const to = new Date();

  let result;
  try {
    result = await fetch(
      config.host +
        `/api/articles/random?from=${from.toISOString()}&to=${to.toISOString()}`
    );
    return await result.json();
  } catch (error) {
    console.log(error);
    return result.json();
  }
};

export const getNewestArticle = async () => {
  let result;
  let intermediate;
  console.log(config.host + `/api/articles/newest`);

  try {
    result = await fetch(config.host + `/api/articles/newest`);
    intermediate = await result.text();
    return json.parse(intermediate);
  } catch (error) {
    return intermediate;
  }
};

import config from "./config.json" assert { type: "json" };

const handleTitleAndCategorySearch = async (title, category) => {
  if (!title && !category) {
    return "Title or category must be specified.";
  }

  if (title && category) {
    let result;
    try {
      result = await fetch(
        config.host +
          `/api/articles/byTitleAndCategory?title=${title}&category=${category}`
      );
      const awaitedResult = await result.json();
      return createResultTable(awaitedResult);
    } catch (error) {
      console.log(error);
      return JSON.stringify(result);
    }
  }

  if (!title && category) {
    let result;
    try {
      result = await fetch(
        config.host + `/api/articles/byCategory?category=${category}`
      );
      const awaitedResult = await result.json();
      return createResultTable(awaitedResult);
    } catch (error) {
      console.log(error);
      return JSON.stringify(result);
    }
  }

  if (title && !category) {
    let result;
    try {
      result = await fetch(
        config.host + `/api/articles/byTitle?title=${title}`
      );
      const awaitedResult = await result.json();
      return createResultTable(awaitedResult);
    } catch (error) {
      console.log(error);
      return JSON.stringify(result);
    }
  }
};

const createResultTable = (data) => {
  if (!data || data.length === 0) {
    return "There is no data for the search.";
  }

  let retTable = "<h3>Search Results:</h3>";
  for (let entry of data) {
    retTable +=
      `<a href='displayArticle.html' class='articleLink' data-id=${entry.id}><h3>` +
      entry.title +
      "</h3>";
    retTable +=
      "<div class='d-inline-block panelFooter'><span class='infoSpan'>category: " +
      entry.category +
      "</span>";
    retTable +=
      "<span class='infoSpan'>released on: " +
      entry.timestamp.substring(0, entry.timestamp.indexOf("T")) +
      "</span></div></a>";
  }

  return retTable;
};

const createDispalyArticle = (data) => {
  const rawArticle = data[0];
  let retVal =
    "<h3>" +
    rawArticle.title +
    `</h3><p>category: ` +
    rawArticle.category +
    `</p><p>` +
    rawArticle.timestamp.substring(0, rawArticle.timestamp.indexOf("T")) +
    "</p>" +
    rawArticle.content +
    `<span class="d-inline-block">by: ${rawArticle.full_name}</span>`;

  return retVal;
};

const articleLinkClickHandler = (event) => {
  event.preventDefault();
  sessionStorage.setItem(
    "displayArticleId",
    event.target.parentElement.dataset["id"]
  );
  window.location.replace("displayArticle.html");
};

export {
  createDispalyArticle,
  handleTitleAndCategorySearch,
  articleLinkClickHandler,
};

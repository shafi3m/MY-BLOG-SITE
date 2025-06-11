const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("./src/style.css");
  eleventyConfig.addPassthroughCopy("./src/script.js");
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Add blog collection from Markdown files in src/blog/
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // Add readable date filter using Luxon
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "MMMM d, yyyy"
    );
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

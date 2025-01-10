import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";

export default function(eleventyConfig) {

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        extensions: 'html',
        transformOnRequest: false,
        formats: ['auto'],
        outputDir: "./_site/img/",
        widths: [1232],
        defaultAttributes: {
			loading: "lazy",
			sizes: "auto",
		},
    });

    eleventyConfig.addFilter("postDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy'.'MM'.'dd");
    });
  
    eleventyConfig.addPassthroughCopy("src/assets/");
    eleventyConfig.addPassthroughCopy("src/css/");
    eleventyConfig.addPassthroughCopy("CNAME");

    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/posts/**/*.{svg,webp,png,jpeg}");

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
    };
};
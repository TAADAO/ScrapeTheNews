var cheerio = require("cheerio");
var request = require("request");
var Article = require("../models/Article");
var website = ("http://www.espn.com/");

function scrapedWeb(cb) {
    request(website, function (error, response, html) {
        if (error) console.log("There was an error with the scrape", error);

        var $ = cheerio.load(html);

        $("h3.title").each(function (i, element) {
            var link = $(element).parent().attr("href");
            var title = $(element).text();

            var scrapeArticle = new Article(
                {
                    title: title,
                    link: link
                });

            scrapeArticle.save(function (error) { });
        });
        cb();
    });
}
exports.scrapedWeb = scrapedWeb;

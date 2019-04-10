var cheerio = require('cheerio');
var request = require('request');
var Article = require('../models/Article');
var website = 'https://www.theonion.com/';

function scrapedWeb(callback) {
    request(website, function (error, response, html) {
        if (error) console.log("Error Scraping", error);

        var $ = cheerio.load(html);

        $("h3.title").each(function (i, element) {
            var link = $(element).parent().attr("href");
            var title = $(element).text();

            var scrapeArticle = new Article(
                {
                    title: title,
                    link: link
                });

            scrapeArticle.save(function (error) {});
        });
        callback();
    });
}
exports.scrapedWeb = scrapedWeb;
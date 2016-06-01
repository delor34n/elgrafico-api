/**
 * FutbolchilenoController
 *
 * @description :: Server-side logic for managing futbolchilenoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getLastNews: function (req,res) {
		var request = require('request');
		var cheerio = require('cheerio');
		var Promise = require("promise");

		var url = "http://www.elgraficochile.cl/futbol-chileno";
		scrape(url).then(function(data){
			return res.send(JSON.stringify(data));
		}, function(err){
			console.error("%s; %s", err.message, url);
		});

		function scrape(url){
			return new Promise(function (resolve, reject) {
				var pageNews = [];
				request(url, function(error, response, html){
					if(!error && response.statusCode == 200){
						var $ = cheerio.load(html);
				    	$(".taxport-item").not(".destacado").each(function( i ) {
				    		var element = {};
					        element["img_url"] = "http://elgraficochile.cl" + $(this).find("a img").attr("src");
					        element["title"] = $(this).find(".titular a").text();
					        element["noticia_url"] = "http://elgraficochile.cl" + $(this).find(".titular a").attr("href");
					        element["fecha_noticia"] = $(this).find(".titular a").attr("href").match(/\d{4}\-\d{2}-\d{2}/);
					        pageNews.push(element);
						});
					} else if (response.statusCode !== 200) {
		                err = new Error("Unexpected status code: " + response.statusCode);
		                err.res = response;
		                return reject(err);
		            }
		            resolve(pageNews);
				});
			});
		}
  	}
};
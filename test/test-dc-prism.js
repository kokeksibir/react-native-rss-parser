var assert = require('assert');
var reuters = require('./samples/rssv2-dc-prism');
var rssParser = require('../index');

describe('when parse feed with dc and prism namespaces', function() {
  describe('valid document', function() {
    it('should return feed items', function() {
      return rssParser.parse(reuters.feed)
        .then((result) => {
          assert.equal(result.title, 'The Journal of Pediatrics');
          assert.equal(result.links.length, 1);
          assert.equal(result.links[0].url, 'https://www.jpeds.com/issues?publicationCode=ympd&rss=yes');
          assert.equal(result.description, 'The Journal of Pediatrics RSS feed. ');
          assert.equal(result.dc.language, 'en');
          assert.equal(result.dc.publisher, 'Elsevier Inc.');
          assert.equal(result.items.length, 1);
          assert.equal(result.items[0].dc.id, '10.1016/j.jpeds.2018.08.009');
          assert.equal(result.items[0].dc.title, 'HIV Exposure and Formula Feeding Predict Under-2 Mortality in HIV-Uninfected Children, Botswana');
          assert.equal(result.items[0].dc.authors.length, 1);
          assert.equal(result.items[0].dc.authors[0].name, 'Gbolahan Ajibola, Jean Leidner, Gloria K. Mayondi, Erik van Widenfelt, Tebogo Madidimalo, Chipo Petlo, Sikhulile Moyo, Mompati Mmalane, Paige L. Williams, Adam R. Cassidy, Roger Shapiro, Betsy Kammerer, Shahin Lockman');
          assert.equal(result.items[0].dc.published, '2018-10-11');
          assert.equal(result.items[0].prism.publicationName, 'The Journal of Pediatrics');
          assert.equal(result.items[0].prism.published, '2018-10-11');
          assert.equal(result.items[0].prism.volume, '203');
          assert.equal(result.items[0].prism.section, 'Original Articles');
          assert.equal(result.items[0].prism.startingPage, '68');
          assert.equal(result.items[0].prism.endingPage, '75.e2');
          assert.equal(result.items[0].prism.issueIdentifier, 'S0022-3476(17)X0025-5');
        });
    });
  });
});
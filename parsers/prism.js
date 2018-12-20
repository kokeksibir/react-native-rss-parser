var utils = require('./utils');
var namespaces = require('./namespaces');

exports.parseChannel = function(node) {
  return {
    title: utils.getElementTextContent(node, 'publicationName', namespaces.prism),
    copyright: utils.getElementTextContent(node, 'copyright', namespaces.prism),
    eissn: utils.getElementTextContent(node, 'eissn', namespaces.prism),
    issn: utils.getElementTextContent(node, 'issn', namespaces.prism),
  }
};

exports.parseItem = function(node) {
  return {
    published: utils.getElementTextContent(node, 'publicationDate', namespaces.prism),
    publicationName: utils.getElementTextContent(node, 'publicationName', namespaces.prism),
    issueIdentifier: utils.getElementTextContent(node, 'issueIdentifier', namespaces.prism),
    issueName: utils.getElementTextContent(node, 'issueName', namespaces.prism),
    coverDate: utils.getElementTextContent(node, 'coverDate', namespaces.prism),
    volume: utils.getElementTextContent(node, 'volume', namespaces.prism),
    section: utils.getElementTextContent(node, 'section', namespaces.prism),
    number: utils.getElementTextContent(node, 'number', namespaces.prism),
    startingPage: utils.getElementTextContent(node, 'startingPage', namespaces.prism),
    endingPage: utils.getElementTextContent(node, 'endingPage', namespaces.prism),
  };
};

function getMultipleValues(node, tagName, property = 'name') {
  const list = utils.getElementTextContentArray(node, tagName, namespaces.prism);
  return list.map(function(el) {
    return {
      [property]: el
    };
  });
}
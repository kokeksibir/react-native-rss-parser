var utils = require('./utils');
var namespaces = require('./namespaces');

exports.parseChannel = function(node) {
  return {
    title: utils.getElementTextContent(node, 'title', namespaces.dc),
    authors: getMultipleValues(node, 'creator'),
    categories: getMultipleValues(node, 'subject'),
    description: utils.getElementTextContent(node, 'description', namespaces.dc),
    language: utils.getElementTextContent(node, 'language', namespaces.dc),
    copyright: utils.getElementTextContent(node, 'rights', namespaces.dc),
    publisher: utils.getElementTextContent(node, 'publisher', namespaces.dc),
  }
};

exports.parseItem = function(node) {
  return {
    id: utils.getElementTextContent(node, 'identifier', namespaces.dc),
    title: utils.getElementTextContent(node, 'title', namespaces.dc),
    authors: getMultipleValues(node, 'creator'),
    categories: getMultipleValues(node, 'subject'),
    description: utils.getElementTextContent(node, 'description', namespaces.dc),
    published: utils.getElementTextContent(node, 'date', namespaces.dc),
    contributors: getMultipleValues(node, 'contributor'),
    format: utils.getElementTextContent(node, 'format', namespaces.dc),
    type: utils.getElementTextContent(node, 'type', namespaces.dc)
  };
};

function getMultipleValues(node, tagName, property = 'name') {
  const list = utils.getElementTextContentArray(node, tagName, namespaces.dc);
  return list.map(function(el) {
    return {
      [property]: el
    };
  });
}
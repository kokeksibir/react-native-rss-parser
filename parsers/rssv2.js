var utils = require('./utils');
var model = require('../model/rss');
var namespaces = require('./namespaces');
var itunesParser = require('./itunes');
var dcParser = require('./dublincore');
var prismParser = require('./prism');

exports.parse = function(document) {
  let parsedFeed = Object.assign({}, model.rss);
  let namespace;
  if(utils.getElements(document, 'channel', namespaces.rss)) namespace = namespaces.rss;
  parsedFeed = mapChannelFields(document, namespace, parsedFeed);
  parsedFeed.type = 'rss-v2';
  parsedFeed.items = mapItems(document, namespace);

  return parsedFeed;
};

function mapChannelFields(document, namespace, parsedFeed) {
  const channelNodes = utils.getElements(document, 'channel', namespace);
  if (!channelNodes || channelNodes.length === 0) {
    throw new Error('Could not find channel node');
  }

  const channelNode = channelNodes[0];

  parsedFeed.title = getChannelTitle(channelNode, namespace);
  parsedFeed.links = getChannelLinks(channelNode, namespace);
  parsedFeed.description = getChannelDescription(channelNode, namespace);
  parsedFeed.language = getChannelLanguage(channelNode, namespace);
  parsedFeed.copyright = getChannelCopyright(channelNode, namespace);
  parsedFeed.authors = getChannelAuthors(channelNode, namespace);
  parsedFeed.lastUpdated = getChannelLastUpdated(channelNode, namespace);
  parsedFeed.lastPublished = getChannelLastPublished(channelNode, namespace);
  parsedFeed.categories = getChannelCategories(channelNode, namespace);
  parsedFeed.image = getChannelImage(channelNode, namespace);
  parsedFeed.itunes = itunesParser.parseChannel(channelNode, namespace);
  parsedFeed.dc = dcParser.parseChannel(channelNode, namespace);
  parsedFeed.prism = prismParser.parseChannel(channelNode, namespace);

  return parsedFeed;
}

function getChannelTitle(node, namespace) {
  return utils.getElementTextContent(node, 'title', namespace);
}

function getChannelLinks(node, namespace) {
  const links = utils.getChildElements(node, 'link', namespace);

  return links.map(function(link) {
    return {
      url: link.textContent,
      rel: link.getAttribute('rel')
    };
  });
}

function getChannelDescription(node, namespace) {
  return utils.getElementTextContent(node, 'description', namespace);
}

function getChannelLanguage(node, namespace) {
  return utils.getElementTextContent(node, 'language', namespace);
}

function getChannelCopyright(node, namespace) {
  return utils.getElementTextContent(node, 'copyright', namespace);
}

function getChannelAuthors(node, namespace) {
  const authors = utils.getElementTextContentArray(node, 'managingEditor', namespace);

  return authors.map(function(author) {
    return {
      name: author
    };
  });
}

function getChannelLastUpdated(node, namespace) {
  return utils.getElementTextContent(node, 'lastBuildDate', namespace);
}

function getChannelLastPublished(node, namespace) {
  return utils.getElementTextContent(node, 'pubDate', namespace);
}

function getChannelCategories(node, namespace) {
  const categories = utils.getElementTextContentArray(node, 'category', namespace);

  return categories.map(function(category) {
    return {
      name: category
    }
  });
}

function getChannelImage(node, namespace) {
  const imageNodes = utils.getChildElements(node, 'image', namespace);

  if (imageNodes.length === 0) {
    return {
      url: undefined,
      title: undefined,
      description: undefined,
      width: undefined,
      height: undefined
    };
  }

  const imageNode = imageNodes[0];

  return {
    url: utils.getElementTextContent(imageNode, 'url', namespace),
    title: utils.getElementTextContent(imageNode, 'title', namespace),
    description: utils.getElementTextContent(imageNode, 'description', namespace),
    width: utils.getElementTextContent(imageNode, 'width', namespace),
    height: utils.getElementTextContent(imageNode, 'height', namespace),
  };
}

function getItemTitle(node, namespace) {
  return utils.getElementTextContent(node, 'title', namespace);
}

function getItemImage(node, namespace) {
  return utils.getElementTextContent(node, 'image', namespace);
}

function getItemLinks(node, namespace) {
  const links = utils.getChildElements(node, 'link', namespace);

  return links.map(function(link) {
    return {
      url: link.textContent,
      rel: link.getAttribute('rel')
    };
  });
}

function getItemDescription(node, namespace) {
  return utils.getElementTextContent(node, 'description', namespace);
}

function getItemContent(node, namespace) {
  return utils.getElementTextContent(node, 'encoded', namespaces.content, namespace);
}

function getItemAuthors(node, namespace) {
  const authors = utils.getElementTextContentArray(node, 'author', namespace);

  return authors.map(function(author) {
    return {
      name: author
    };
  });
}

function getItemCategories(node, namespace) {
  const categories = utils.getElementTextContentArray(node, 'category', namespace);

  return categories.map(function(category) {
    return {
      name: category
    }
  });
}

function getItemId(node, namespace) {
  return utils.getElementTextContent(node, 'guid', namespace);
}

function getItemPublished(node, namespace) {
  return utils.getElementTextContent(node, 'pubDate', namespace);
}

function getItemEnclosures(node, namespace) {
  const enclosures = utils.getChildElements(node, 'enclosure', namespace);

  return enclosures.map(function(enclosure) {
    return {
      url: enclosure.getAttribute('url'),
      length: enclosure.getAttribute('length'),
      mimeType: enclosure.getAttribute('type')
    }
  });
}

function mapItems(document, namespace) {
  const itemNodes = utils.getElements(document, 'item', namespace);

  return itemNodes.map(function(item) {
    return {
      title: getItemTitle(item, namespace),
      links: getItemLinks(item, namespace),
      description: getItemDescription(item, namespace),
      content: getItemContent(item, namespace),
      id: getItemId(item, namespace),
      imageUrl: getItemImage(item, namespace),
      authors: getItemAuthors(item, namespace),
      categories: getItemCategories(item, namespace),
      published: getItemPublished(item, namespace),
      enclosures: getItemEnclosures(item, namespace),
      itunes: itunesParser.parseItem(item, namespace),
      dc: dcParser.parseItem(item, namespace),
      prism: prismParser.parseItem(item, namespace)
    };
  });
}
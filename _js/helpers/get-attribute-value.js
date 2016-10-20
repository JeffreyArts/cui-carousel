cuiCarouselHelper.getAttributeValue = function(domElement, attributeName) {
    var value = domElement.getAttribute(attributeName);
    if (value == 'false') {
        return false;
    } else if (value == 'true') {
        return true;
    } else {
        return value;
    }
}
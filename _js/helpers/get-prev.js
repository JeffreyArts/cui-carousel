// Get the index of the previous slide
cuiCarouselHelper.getPrev = function(domElement) {
    return function(int) {
        if (domElement.wrap) {
            return int <= 0 ? domElement.slides.length-1 : int -1;
        } else {
            return int <= 0 ? 0 : int -1;
        }
    }
}
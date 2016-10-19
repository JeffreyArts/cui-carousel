// Get the index of the next slide
cuiCarouselHelper.getNext = function(domElement){
    return function(int) {
        if (domElement.wrap) {
            return int >= domElement.slides.length-1 ? 0 : int+1;
        } else {
            return int >= domElement.slides.length-1 ? int : int+1;
        }
    }
}
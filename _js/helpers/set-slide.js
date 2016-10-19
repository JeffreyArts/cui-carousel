
cuiCarouselHelper.setSlide = function(domElement){
    return function(int) {
        for (var i = 0; i < domElement.slides.length; i++) {
            var slide = domElement.slides[i];
            slide.className = slide.className.replace('__isCurrent', '');
            slide.className = slide.className.replace('__isPrev', '');
            slide.className = slide.className.replace('__isNext', '');
            if (slide.index == domElement.getPrev(int)) {
                slide.className += ' __isPrev';
            }

            if (slide.index == domElement.getNext(int)) {
                slide.className += ' __isNext';
            }

            if (slide.index == int) {
                slide.className += ' __isCurrent';
            }
        }

        domElement.currentSlide = int;
        return domElement;
    }
}
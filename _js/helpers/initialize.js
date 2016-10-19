// Helper function for setting up the required changes to the `cui-carousel` domElement
cuiCarouselHelper.initialize = function(domElement) {
    if (domElement.initialized /*||  domElement.querySelector('.cui-carousel--container') !== null*/) {
        return;
    }

    var arrowNext = domElement.querySelector('.cui-carousel--arrow-right'),
        indicators = null;


    domElement.currentSlide = 0;
    domElement.wrap = true;
    domElement.showIndicator = true;
    domElement.slides = domElement.querySelectorAll('slide');


    domElement.getNext = cuiCarouselHelper.getNext(domElement);
    domElement.getPrev = cuiCarouselHelper.getPrev(domElement);
    domElement.setSlide = cuiCarouselHelper.setSlide(domElement);

    if (domElement.showIndicator) {
        indicators = document.createElement('ul');
            indicators.className = 'cui-carousel--indicators';
        domElement.appendChild(indicators);
        domElement.indicators = [];
    }

    for (var i = 0; i < domElement.slides.length; i++) {
        var slide = domElement.slides[i];
        slide.index = i;
        if (domElement.showIndicator) {
            var indicator = document.createElement('li');
                indicator.className = 'cui-carousel--indicator';
                indicator.onclick = function(){
                    var int = i;
                    return function indicatorOnClick(){
                        domElement.setSlide(int);
                    }
                }()
            indicators.appendChild(indicator);
            domElement.indicators.push(indicator);
        }
    }

    if (arrowNext) {
        domElement.arrowNext = arrowNext;
        arrowNext.onclick = function(){
            domElement.setSlide(domElement.getNext(domElement.currentSlide));
        }
    }

    var arrowLeft = domElement.querySelector('.cui-carousel--arrow-left').onclick = function(){
        domElement.setSlide(domElement.getPrev(domElement.currentSlide));
    }


    domElement.setSlide(domElement.currentSlide);

    return domElement;
}

cuiCarouselHelper.initializeAll = function() {

    var carousels = document.querySelectorAll('cui-carousel');
    if (carousels.length > 0) {
        for (var i = 0; i < carousels.length; i++) {
            cuiCarouselHelper.initialize(carousels[i]);
        }
    }
}

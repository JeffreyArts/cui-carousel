// Helper function for setting up the required changes to the `cui-dialog` domElement
cuiCarouselHelper.initialize = function(domElement) {
    if (domElement.initialized /*||  domElement.querySelector('.cui-dialog--container') !== null*/) {
        return;
    }

    var arrowNext = domElement.querySelector('.cui-carousel--arrow-right');

    domElement.currentSlide = 0;
    domElement.wrap = true;
    domElement.slides = domElement.querySelectorAll('slide');


    domElement.getNext = cuiCarouselHelper.getNext(domElement);
    domElement.getPrev = cuiCarouselHelper.getPrev(domElement);
    domElement.setSlide = cuiCarouselHelper.setSlide(domElement);


    for (var i = 0; i < domElement.slides.length; i++) {
        var slide = domElement.slides[i];
        slide.index = i;
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

    var dialogs = document.querySelectorAll('cui-carousel');
    if (dialogs.length > 0) {
        for (var i = 0; i < dialogs.length; i++) {
            cuiCarouselHelper.initialize(dialogs[i]);
        }
    }
}

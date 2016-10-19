// cui Carousel API
var cuiCarousel = function(name) {

    // var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
    // if (dialogDom === null) {
    //     console.error('No cui-dialog found with name `' + name + '`');
    // }
    //
    // return {
    //     // Opens a targeted dialog;
    //     open: function() {
    //         dialogDom.open();
    //         return dialogDom;
    //     },
    //
    //     // Closes a targeted dialog;
    //     close: function() {
    //         dialogDom.close();
    //         return dialogDom;
    //     },
    //
    //     // Toggle the state of a targeted dialog;
    //     toggle: function() {
    //         dialogDom.toggle();
    //         return dialogDom;
    //     },
    //
    //     // Update the content of the dialog with `value`
    //     updateContent: function(value) {
    //         dialogDom.updateContent(value);
    //         return dialogDom;
    //     },
    //
    //     // Get the content of the targeted dialog
    //     getContent: function() {
    //         return dialogDom.getContent();
    //     }
    // }

}
var cuiCarouselHelper = {}
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

// Helper function for listening for new `cui-dialog` domElements

cuiCarouselHelper.nodeInserted = function(event){
    if (event.animationName == 'cuiCarouselNodeInserted' && !event.target.initialized) {
        cuiCarouselHelper.initialize(event.target);
    }
}
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

cuiCarouselHelper.setSlide = function(domElement){
    return function(int) {
        for (var i = 0; i < domElement.slides.length; i++) {
            var slide = domElement.slides[i];
            slide.className = slide.className.replace('__isCurrent', '');
            slide.className = slide.className.replace('__isPrev', '');
            slide.className = slide.className.replace('__isNext', '');
            domElement.indicators[i].className = domElement.indicators[i].className.replace('__isActive', '').trim();

            if (slide.index == domElement.getPrev(int)) {
                slide.className += ' __isPrev';
            }

            if (slide.index == domElement.getNext(int)) {
                slide.className += ' __isNext';
            }

            if (slide.index == int) {
                slide.className += ' __isCurrent';
                if (domElement.indicators) {
                    domElement.indicators[i].className += ' __isActive';
                }
            }
        }

        domElement.currentSlide = int;
        return domElement;
    }
}
document.addEventListener('animationstart', cuiCarouselHelper.nodeInserted, false);
document.addEventListener('MSAnimationStart', cuiCarouselHelper.nodeInserted, false);
document.addEventListener('webkitAnimationStart', cuiCarouselHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", cuiCarouselHelper.initializeAll, false);

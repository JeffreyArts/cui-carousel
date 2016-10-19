// Helper function for listening for new `cui-dialog` domElements

cuiCarouselHelper.nodeInserted = function(event){
    if (event.animationName == 'cuiCarouselNodeInserted' && !event.target.initialized) {
        cuiCarouselHelper.initialize(event.target);
    }
}
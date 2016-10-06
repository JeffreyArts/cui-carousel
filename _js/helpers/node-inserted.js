// Helper function for listening for new `cui-dialog` domElements

cuiDialogHelper.nodeInserted = function(event){
    if (event.animationName == 'cuiDialogNodeInserted' && !event.target.initialized) {
        cuiDialogHelper.initialize(event.target);
    }
}
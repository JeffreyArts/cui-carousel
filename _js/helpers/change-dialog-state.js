// Helper function for setting up the required changes to the `cui-dialog` domElement
cuiDialogHelper.changeDialogState = function(domElement, state) {
    // Get current state as fallback
    var state = state || domElement.state;

    // Create event
    var event = new CustomEvent('changeDialogState',
        {
            detail: {dialog:domElement},
            bubbles: true,
            cancelable: true
        }
    )

    // Update the state
    domElement.state = state;

    // And update the corresponding classes
    if (state == 'open' && domElement.className.indexOf('__isOpen') == -1) {
        domElement.className += ' __isOpen';
    }

    if (state == 'closed' && domElement.className.indexOf('__isOpen') !== -1) {
        domElement.className = domElement.className.replace('__isOpen', '');
    }

    // Sent the `changeDialogState` event
    document.dispatchEvent(event);
}
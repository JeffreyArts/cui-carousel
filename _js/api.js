// cui Dialog API
var cuiDialog = function(name) {

    var dialogDom = document.querySelector('cui-dialog[name=' + name + ']');
    if (dialogDom === null) {
        console.error('No cui-dialog found with name `' + name + '`');
    }

    return {
        // Opens a targeted dialog;
        open: function() {
            dialogDom.open();
            return dialogDom;
        },

        // Closes a targeted dialog;
        close: function() {
            dialogDom.close();
            return dialogDom;
        },

        // Toggle the state of a targeted dialog;
        toggle: function() {
            dialogDom.toggle();
            return dialogDom;
        },

        // Update the content of the dialog with `value`
        updateContent: function(value) {
            dialogDom.updateContent(value);
            return dialogDom;
        },

        // Get the content of the targeted dialog
        getContent: function() {
            return dialogDom.getContent();
        }
    }

}
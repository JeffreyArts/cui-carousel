document.addEventListener('animationstart', cuiDialogHelper.nodeInserted, false);
document.addEventListener('MSAnimationStart', cuiDialogHelper.nodeInserted, false);
document.addEventListener('webkitAnimationStart', cuiDialogHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", cuiDialogHelper.initializeAll, false);

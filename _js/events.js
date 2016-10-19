document.addEventListener('animationstart', cuiCarouselHelper.nodeInserted, false);
document.addEventListener('MSAnimationStart', cuiCarouselHelper.nodeInserted, false);
document.addEventListener('webkitAnimationStart', cuiCarouselHelper.nodeInserted, false);

document.addEventListener("DOMContentLoaded", cuiCarouselHelper.initializeAll, false);

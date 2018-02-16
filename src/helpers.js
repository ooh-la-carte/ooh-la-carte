
const Helpers = {};

Helpers.getCuisineList = (cuisineObj) => {
  const cuisineList = [];
  if (cuisineObj) {
    Object.keys(cuisineObj).forEach((key) => {
      if (cuisineObj[key]) {
        cuisineList.push(key);
      }
    });
  }
  return cuisineList.join(', ');
};

Helpers.calculateRating = ratingString => (
  JSON.parse(ratingString)
);

Helpers.scrollToHere = (elementId) => {
  const bubble = document.querySelector(`#${elementId}`);
  const rect = bubble.getBoundingClientRect();
  window.scroll(0, rect.top);
};

module.exports = Helpers;

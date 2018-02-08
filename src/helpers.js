
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

module.exports = Helpers;

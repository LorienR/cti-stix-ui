import Ember from "ember";

const { on } = Ember;

export default Ember.Service.extend({

    initLodash: on("init", function() {

    }),

    sortBy(array, iterees) {
        _.sortBy(array, iterees);
    },

    forEach(collection, iteree) {
        _.forEach(collection, iteree);
    },

    remove(array, predicate) {
        _.remove(array, predicate);
    },

    uniqBy(array, iteree) {
        _.uniqBy(array, iteree);
    },

});
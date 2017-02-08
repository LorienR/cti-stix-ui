import Ember from "ember";

const { on } = Ember;

export default Ember.Service.extend({

    initLodash: on("init", function() {

    }),

    remove(array, predicate) {
        _.remove(array, predicate);
    },

    uniqBy(array, iteree) {
        _.uniqBy(array, iteree);
    },

});
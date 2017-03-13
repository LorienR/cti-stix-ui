import Ember from "ember";


/**
 * sighting New Controller handles creation of new records
 *
 * @module
 * @extends ember/Controller
 */

export default Ember.Controller.extend({
    relationshipSorting: ['relationship_type: asc', 'name:asc'],
    sortedSourceRelationshipObjects: Ember.computed.sort('model.sourceRelationshipObjects', 'relationshipSorting'),
    sortedTargetRelationshipObjects: Ember.computed.sort('model.targetRelationshipObjects', 'relationshipSorting'),
    // /**
    //  * Get Validation Errors for new record
    //  *
    //  * @param {Object} item Item Object with properties for validation
    //  * @return {Array} Array of Errors
    //  */


    // /** @type {Object} */
    // actions: {
    //     /**
    //      * Save Item after validation
    //      *
    //      * @function actions:save
    //      * @param {Object} item Item Object to be created
    //      * @return {undefined}
    //      */
    //     save(item, addAnother) {

    //         let store = this.get("store");
    //         let itemRecord = store.createRecord("sighting", item);
    //         let promise = itemRecord.save();
    //         let self = this;

    //         promise.then(function() {
    //             if (addAnother) {
    //                 //stay on the New page
    //                 Ember.setProperties(item, {
    //                     summary: null,
    //                     count: null
    //                 });
    //             } else {
    //                 self.transitionToRoute("sightings");
    //             }
    //         });
    //         promise.catch(function(error) {
    //             var alert = {
    //                 label: "Save Failed",
    //                 error: error
    //             };
    //             self.set("model.alert", alert);
    //         });
    //     }
    // }
});
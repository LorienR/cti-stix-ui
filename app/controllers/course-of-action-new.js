import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveLabels from "../mixins/add-remove-labels";

/**
 * Course of Action New Controller responsible for creating Course of Action records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveLabels, {
    /** @type {Object} */
    lodash: inject.service(),
    actions: {
        /**
         * Save Item to Store
         * 
         * @function actions:save
         * @param {Object} item Object to be created
         * @returns {undefined}
         */
        save(item, addAnother) {

            let self = this;
            let lodash = self.get('lodash');

            const externalReferences = Ember.get(item, "external_references");
            //remove external references where the items doesn't have both the source name and external id
            lodash.remove(externalReferences, function(obj) { return !obj.source_name || !obj.external_id; });

            const labels = Ember.get(item, "labelNames");
            //remove empty label items
            lodash.remove(labels, function(obj) { return !obj.name; });

            let store = this.get("store");
            let itemRecord = store.createRecord("course-of-action", item);
            let promise = itemRecord.save();

            promise.then(function() {
                if (addAnother) {
                    //stay on the New page
                    Ember.setProperties(item, {
                        name: null,
                        description: null
                    });
                } else {
                    self.transitionToRoute("course-of-actions");
                }
            });
            promise.catch(function(error) {
                Ember.set(item, "labels", labels);
                var alert = {
                    label: "Save Failed",
                    error: error
                };
                self.set("model.alert", alert);
            });
        }
    }
});
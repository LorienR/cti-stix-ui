import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveAliases from "../mixins/add-remove-aliases";
import AddRemoveLabels from "../mixins/add-remove-labels";

/**
 * Threat Actors New Controller handles creation of records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveAliases, AddRemoveLabels, {
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

            const aliases = Ember.get(item, "aliasNames");
            //remove empty alias items
            lodash.remove(aliases, function(obj) { return !obj.name; });

            let store = this.get("store");
            let itemRecord = store.createRecord("threat-actor", item);
            let promise = itemRecord.save();

            promise.then(function() {
                if (addAnother) {
                    //stay on the New page
                    Ember.setProperties(item, {
                        name: null,
                        description: null
                    });
                } else {
                    self.transitionToRoute("threat-actors");
                }
            });
            promise.catch(function(error) {
                var alert = {
                    label: "Save Failed",
                    error: error
                };
                self.set("model.alert", alert);
            });
        }
    }
});
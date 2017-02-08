import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveKillChainPhases from "../mixins/add-remove-kill-chain-phases";

/**
 * Attack Pattern New Controller responsible for creating Attack Pattern records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveKillChainPhases, {
    /** @type {Object} */
    notifications: inject.service(),
    lodash: inject.service(),
    actions: {
        runAfterRender: function() {
            Ember.run.scheduleOnce('afterRender', this, function() {
                //Ember.$('#attack-pattern-name').focus();
            });
        },

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

            const killChains = Ember.get(item, "kill_chain_phases");
            //remove any with no name or phase name
            lodash.remove(killChains, function(obj) { return !obj.kill_chain_name || !obj.phase_name; });

            let store = this.get("store");
            let itemRecord = store.createRecord("attack-pattern", item);
            let promise = itemRecord.save();

            promise.then(function() {
                if (addAnother) {
                    //stay on the New page
                    Ember.setProperties(item, {
                        name: null,
                        description: null,
                        created: new Date(),
                        modified: new Date()
                    });
                } else {
                    self.transitionToRoute("attack-patterns");
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
import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveKillChainPhases from "../mixins/add-remove-kill-chain-phases";

/**
 * Indicator Edit Controller responsible for creating Indicator records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveKillChainPhases, {
    /** @type {Object} */
    ajax: inject.service(),
    notifications: inject.service(),
    lodash: inject.service(),
    actions: {
        /**
         * Save Item to Store
         * 
         * @function actions:save
         * @param {Object} item Object to be created
         * @returns {undefined}
         */
        save(item) {

            let self = this;
            let lodash = self.get('lodash');

            const externalReferences = Ember.get(item, "external_references");
            //remove external references where the items doesn't have both the source name and external id
            lodash.remove(externalReferences, function(obj) { return !obj.source_name || !obj.external_id; });

            const killChains = Ember.get(item, "kill_chain_phases");
            //remove any with no name or phase name
            lodash.remove(killChains, function(obj) { return !obj.kill_chain_name || !obj.phase_name; });

            ///option 4
            var json = JSON.stringify(item);
            this.get('ajax').request('https://localhost/cti-stix-store-api/indicators/' + item.id, {
                method: 'PATCH',
                data: JSON.parse(json)
            }).then(function() {
                self.get('notifications').success('Save complete.');
            }).catch(function(error) {
                console.log(error);
            });


        }
    }
});
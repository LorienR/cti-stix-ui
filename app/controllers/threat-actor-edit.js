import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveAliases from "../mixins/add-remove-aliases";
import AddRemoveKillChainPhases from "../mixins/add-remove-kill-chain-phases";

/**
 * Threat Actor Edit Controller responsible for editing records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveAliases, AddRemoveKillChainPhases, {
    /** @type {Object} */
    ajax: inject.service(),
    notifications: inject.service(),
    lodash: inject.service(),
    actions: {

        runAfterRender: function() {
            Ember.run.scheduleOnce('afterRender', this, function() {
                //...
            });
        },

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

            const aliases = Ember.get(item, "aliasNames");
            //remove empty alias items
            lodash.remove(aliases, function(obj) { return !obj.name; });

            var json = JSON.stringify(item);
            this.get('ajax').request('cti-stix-store-api/threat-actors/' + item.id, {
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
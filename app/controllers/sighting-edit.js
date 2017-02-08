import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveKillChainPhases from "../mixins/add-remove-kill-chain-phases";

/**
 * Sighting Edit Controller responsible for editing records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveKillChainPhases, {
    /** @type {Object} */
    ajax: inject.service(),
    notifications: inject.service(),
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

            var json = JSON.stringify(item);
            this.get('ajax').request('https://localhost/cti-stix-store-api/sightings/' + item.id, {
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
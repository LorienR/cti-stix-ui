import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Indicator Route extends Item Route for retrieving individual records
 * 
 * @module
 * @extends routes/ItemRoute
 */
export default ItemRoute.extend({
    /**
     * Model calls ItemRoute.getItemModel with specified parameters
     * 
     * @param {Object} parameters Parameters Object
     * @return {Object} Promise Objec†t
     */

    activate: function() {
        //runs every time the controller is shown 
        this.controllerFor('sighting-edit').send('runAfterRender');
    },

    model(parameters) {
        const hash = this.getItemModel(parameters, "sighting");
        hash.help = {
            description: "A sighting is a time in which a particular Campaign, Threat Actor, or Incident was observed."
        };

        hash.types = [{
            label: "Indicator",
            id: "indicator"
        }, {
            label: "Campaign",
            id: "campaign"
        }, {
            label: "Threat Actor",
            id: "threat-actor"
        }];

        const store = this.get("store");
        const queryParameters = { sort: "name" };
        hash.identities = store.query("identity", queryParameters);

        return Ember.RSVP.hash(hash);
    }
});
import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Threat Actor Route extends Item Route for retrieving individual records
 * 
 * @module
 * @extends routes/ItemRoute
 */
export default ItemRoute.extend({
    /**
     * Model calls ItemRoute.getItemModel with specified parameters
     * 
     * @param {Object} parameters Parameters Object
     * @return {Object} Promise Object
     */
    model(parameters) {
        const hash = this.getItemModel(parameters, "sighting");
        hash.help = {
            description: "A sighting is a time in which a particular Campaign, Threat Actor, or Incident was observed."
        };
        return Ember.RSVP.hash(hash);
    }
});
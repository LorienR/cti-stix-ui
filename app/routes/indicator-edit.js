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
    model(parameters) {
        const hash = this.getItemModel(parameters, "indicator");
        hash.help = {
            description: "Indicators contain a pattern that can be used to detect suspicous or malicious cyber activity."
        };
        return Ember.RSVP.hash(hash);
    }
});
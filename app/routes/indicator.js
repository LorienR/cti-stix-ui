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
     * Model queries for collection of records
     * 
     * @return {Object} Promise Object
     */

    model(parameters) {
        const hash = this.getItemModel(parameters, "indicator");
        hash.help = {
            description: "Indicators contain a pattern that can be used to detect suspicous or malicious cyber activity."
        };
        return Ember.RSVP.hash(hash);
    }
});
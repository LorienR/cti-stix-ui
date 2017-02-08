import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Identity Route extends Item Route for retrieving individual records
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
        const hash = this.getItemModel(parameters, "identity");
        hash.help = {
            description: "An identity can represent actual individuals, organizaitons or groups as well as classes of individuals, " +
                "organizations or groups."
        };
        return Ember.RSVP.hash(hash);
    }
});
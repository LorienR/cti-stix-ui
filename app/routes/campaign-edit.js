import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Campaign Route extends Item Route for retrieving individual records
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
        const hash = this.getItemModel(parameters, "campaign");
        hash.help = {
            description: "A Campaign is a grouping of adversarial behaviors that describe a set of malicious activities or attacks that " +
                "occur over a period of time against a specific set of targets. Campaigns usually have well defined objectives and may be part of an Intrusion Set."
        };

        hash.threatActors = [];
        hash.attackPatterns = [];
        hash.indicators = [];
        hash.identities = [];

        return Ember.RSVP.hash(hash);
    }
});
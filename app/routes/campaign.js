import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Campaigns Route extends Item Route for retrieving individual records
 *
 * @module
 * @extends ember/Route
 */
export default ItemRoute.extend({
    /**
     * Model calls ItemRoute.getItemModel with specified parameters
     * 
     * @param {Object} parameters Parameters Object
     * @return {Object} Promise Object
     */
    model(parameters) {
        const hash = this.getItemModel(parameters, "campaign");
        hash.help = {
            description: "A Campaign is a grouping of adversarial behaviors that describe a set of malicious activities or attacks that " +
                "occur over a period of time against a specific set of targets. Campaigns usually have well defined objectives and may be part of an Intrusion Set."
        };
        return Ember.RSVP.hash(hash);

        // let store = this.get("store");
        // let parameters = { "filter[order]": "name" };

        // let hash = {};
        // hash.help = {
        //     description: "A Campaign is a grouping of adversarial behaviors that describe a set of malicious activities or attacks that "+
        //     "occur over a period of time against a specific set of targets. Campaigns usually have well defined objectives and may be part of an Intrusion Set."
        // };
        // hash.items = store.query("campaign", parameters);
        // hash.relationships = hash.items.then((items) => {
        //     const promises = [];
        //     items.forEach((item) => {
        //         const id = item.get("id");
        //         const itemParameters = {
        //             "filter": `{ "where": { "or": [ { "source_ref": "${id}" }, { "target_ref": "${id}" } ] } }`
        //         };
        //         const promise = store.query("relationship", itemParameters);
        //         promises.push(promise);
        //     });
        //     return Ember.RSVP.all(promises);
        // });
        // return Ember.RSVP.hash(hash);
    }
});
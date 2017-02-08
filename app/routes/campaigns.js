import Ember from 'ember';

/**
 * Campaigns Route queries for a collection of records
 * 
 * @module
 * @extends ember/Route
 */
export default Ember.Route.extend({
    /**
     * Model queries for collection of records
     * 
     * @return {Object} Promise Object
     */
    model() {
        let store = this.get("store");
        // TODO - Change this to date
        let parameters = { sort: "name" };

        let hash = {};
        hash.items = store.query("campaign", parameters);
        hash.help = {
            description: "A Campaign is a grouping of adversarial behaviors that describe a set of malicious activities or attacks that "+
            "occur over a period of time against a specific set of targets. Campaigns usually have well defined objectives and may be part of an Intrusion Set."
        };
        return Ember.RSVP.hash(hash);
    }
});

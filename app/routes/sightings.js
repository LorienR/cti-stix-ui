import Ember from 'ember';

/**
 * Attack Patterns Route queries for a collection of records
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
        const hash = {};
        hash.help = {
            description: "A sighting is a time in which a particular Campaign, Intrusion Set, or Incident was observed."
        };
        let store = this.get("store");
        let parameters = { sort: "created" };
        hash.items = store.query("sighting", parameters);

        return Ember.RSVP.hash(hash);
    }
});

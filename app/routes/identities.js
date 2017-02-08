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
            description: "An identity can represent actual individuals, organizaitons or groups as well as classes of individuals, "+
            "organizations or groups."
        };
        let store = this.get("store");
        let parameters = { sort: "name" };
        hash.items = store.query("identity", parameters);

        return Ember.RSVP.hash(hash);
    }
});

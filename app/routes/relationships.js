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
            description: "One type of relationship is created to "+
            "identify that a particular Course Of Action can mitigate a particular Attack Pattern.  Another type of relationship "+
            "describes an Attack Pattern is used by an Intrusion Set."
        };
        let store = this.get("store");
        let parameters = { sort: "relationship_type" };
        hash.items = store.query("relationship", parameters);

        return Ember.RSVP.hash(hash);
    }
});

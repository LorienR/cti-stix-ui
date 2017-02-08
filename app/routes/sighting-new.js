import Ember from 'ember';

/**
 * Attack Pattern New Route sets initial model for creating new records
 * 
 * @module
 * @extends ember/Route
 */
export default Ember.Route.extend({
    /**
     * Model sets initial model for creating new records
     * 
     * @return {Object} Promise Object
     */
    model() {
        const hash = {};
        hash.help = {
            description: "A sighting is a time in which a particular Campaign, Intrusion Set, or Incident was observed."
        };
        hash.types = [
            {
                label: "Indicator",
                id: "indicator"
            }, {
                label: "Campaign",
                id: "campaign"
            }, {
                label: "Intrusion Set",
                id: "intrusion-set"
            }
        ];
        const store = this.get("store");
        const parameters = { sort: "name" };
        hash.identities = store.query("identity", parameters);


        hash.item = {
            sighting_of_ref: undefined,
            observed_data_refs: [],
            where_sighted_refs: [],
            first_seen: undefined,
            last_seen: undefined,
            count: undefined,
            summary: undefined,
            created: new Date(),
            modified: new Date(),
            version: "1",
        };

        return Ember.RSVP.hash(hash);
    }
});

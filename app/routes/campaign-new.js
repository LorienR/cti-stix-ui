import Ember from 'ember';

/**
 * Campaign New Route sets initial model for creating new records
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
        let model = {
            item: {
                name: undefined,
                description: undefined,
                objective: undefined,
                labels: [],
                external_references: [],
                first_seen: new Date(),
                created: new Date(),
                modified: new Date(),
                intrusionSets: [],
                attackPatterns: [],
                indicators: [],
                identities: [],
                version: "1"
            },
            first_seen: undefined,
            created: new Date(),
            modified: new Date(),
            version: "1"
        };


        return Ember.RSVP.hash(model);
    }
});

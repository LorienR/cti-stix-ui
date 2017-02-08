import Ember from 'ember';

/**
 * Indicator New Route sets initial model for creating new records
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
                labels: [],
                kill_chain_phases: [],
                external_references: [],
                created: new Date(),
                modified: new Date(),
                version: "1"
            }
        };
        model.help = {
            description: "Indicators contain a pattern that can be used to detect suspicous or malicious cyber activity. "
        };

        return Ember.RSVP.hash(model);
    }
});

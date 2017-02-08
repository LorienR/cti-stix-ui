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

    activate: function() {
        //runs every time the controller is shown 
        this.controllerFor('attack-pattern-new').send('runAfterRender');
    },

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
            description: "Each Attack Pattern is a type of TTP that describes behaviors and actions that adversaries may take in your network.  " +
                "Attack Patterns are used to help categorize an attack, generalize specific attacks to the patterns that they follow, " +
                "and provide detailed information about how attacks are preformed.  An example of an Attack Pattern could be 'spear fishing', " +
                "'lateral movement', or 'exploit vulnerability'. "
        };

        return Ember.RSVP.hash(model);
    }
});
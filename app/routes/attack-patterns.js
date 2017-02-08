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

    activate: function() {
        //runs every time the controller is shown 
        this.controllerFor('attack-patterns').send('runAfterRender');
    },

    init: function() {
        //only runs once per application
        //...
    },

    model() {
        let store = this.get("store");
        let parameters = { sort: "name" };

        let hash = {};
        hash.help = {
            description: "Each Attack Pattern is a type of TTP that describes behaviors and actions that adversaries may take in your network." +
                "  Attack Patterns are used to help categorize an attack, generalize specific attacks to the patterns that they follow, " +
                "and provide detailed information about how attacks are preformed.  An example of an attack pattern could be 'spear fishing'," +
                " 'lateral movement', or 'exploit vulnerability'.  On this page, more Attack Patterns can be created or deleted."
        };
        hash.items = store.query("attack-pattern", parameters);

        return Ember.RSVP.hash(hash);
    }
});
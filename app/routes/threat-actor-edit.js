import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Indicator Route extends Item Route for retrieving individual records
 * 
 * @module
 * @extends routes/ItemRoute
 */
export default ItemRoute.extend({
    /**
     * Model calls ItemRoute.getItemModel with specified parameters
     * 
     * @param {Object} parameters Parameters Object
     * @return {Object} Promise Objec†t
     */

    activate: function() {
        //runs every time the controller is shown 
        this.controllerFor('threat-actor-edit').send('runAfterRender');
    },

    model(parameters) {
        const hash = this.getItemModel(parameters, "threat-actor");

        hash.help = {
            description: "Threat Actors are actual individuals, groups or organizations believed to be operating with malicious intent. " +
                "Threat Actors can be characterized by their motives, capabilities, intentions/goals, sophistication level, past activities, " +
                "resources they have access to, and their role in the organization."
        };

        hash.labels = [{
                label: "activist"
            },
            {
                label: "competitor"
            },
            {
                label: "crime-syndicate"
            },
            {
                label: "criminal"
            },
            {
                label: "hacker"
            },
            {
                label: "insider-accidental"
            },
            {
                label: "insider-disgruntled"
            },
            {
                label: "nation-state"
            },
            {
                label: "sensationalist"
            },
            {
                label: "spy"
            },
            {
                label: "terrorist"
            }
        ];

        return Ember.RSVP.hash(hash);
    }
});
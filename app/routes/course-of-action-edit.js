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
        this.controllerFor('course-of-action-edit').send('runAfterRender');
    },

    model(parameters) {
        const hash = this.getItemModel(parameters, "course-of-action");
        hash.help = {
            description: "A Course of Action is an action taken to prevent an attack or respond to an attack that is in progress.  " +
                "It could be described as a Critical Control or Mitigation.  It could be technical, automatable responses or analytical, but it " +
                "could also represent higher level actions like employee training or penetration testing.  For example, a Course Of Action to apply " +
                "Security Patches could prevent Vulnerability Exploitation.  Once a Course of Action is created, the " +
                "new relationships can be created that link that Course of Action to the Attack Pattern's it mitigates."
        };
        return Ember.RSVP.hash(hash);
    }
});
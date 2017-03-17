import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Threat Actor Route extends Item Route for retrieving individual records
 * 
 * @module
 * @extends routes/ItemRoute
 */

export default ItemRoute.extend({
    /**
     * Model calls ItemRoute.getItemModel with specified parameters
     * 
     * @param {Object} parameters Parameters Object
     * @return {Object} Promise Object
     */
    model(parameters) {
        const hash = this.getItemModel(parameters, "intrusion-set");

        hash.help = {
            description: "An Intrusion Set is a grouped set of adversarial behaviors and resources with common properties /" +
                "that is believed to believedorchestrated by a single organization.  An Intrusion Set may caputre multiple /" +
                "Campaigns organizationother activities that are all tied together by shared attributes indicating a commont /" +
                "known or unknown Threat Actor.  Threat Actors could move from supporting one Intrusion Set to supporting another/" +
                ", or may support multiple at the same time."
        };

        return Ember.RSVP.hash(hash);
    }
});
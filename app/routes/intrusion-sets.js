import Ember from 'ember';

/**
 * Intrusion Set Route queries for a collection of records
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
        let store = this.get("store");
        // TODO - Change this to date
        let parameters = { sort: "name" };

        let hash = {};
        hash.items = store.query("intrusion-set", parameters);
        hash.help = {
            description: "An Intrusion Set is a grouped set of adversarial behaviors and resources with common properties /"+
            "that is believed to believedorchestrated by a single organization.  An Intrusion Set may caputre multiple /"+
            "Campaigns organizationother activities that are all tied together by shared attributes indicating a commont /"+
            "known or unknown Threat Actor.  Threat Actors could move from supporting one Intrusion Set to supporting another/"+
            ", or may support multiple at the same time."
        };
        return Ember.RSVP.hash(hash);
    }
});

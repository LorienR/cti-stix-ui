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

        const hash = {};
        hash.help = {
            description: "An Intrusion Set is a grouped set of adversarial behaviors and resources with common " +
                "properties that is believed to be orchestrated by a single organization. An Intrusion Set may " +
                "capture multiple Campaigns or other activities that are all tied together by shared attributes " +
                "indicating a common known or unknown Threat Actor. New activity can be attributed to an " +
                "Intrusion Set even if the Threat Actors behind the attack are not known. Threat Actors can move " +
                "from supporting one Intrusion Set, to supporting another, or they may support multiple Intrusion " +
                "Sets."
        };

        hash.threatActors = [];
        hash.attackPatterns = [];
        hash.indicators = [];
        hash.identities = [];

        hash.item = {
            name: undefined,
            description: undefined,
            objective: undefined,
            labels: [],
            alias: [],
            first_seen: undefined,
            last_seen: undefined,
            goals: undefined,
            resource_level: undefined,
            primary_motiviation: undefined,
            secondary_motiviations: [],
            external_references: [],
            created: new Date(),
            modified: new Date(),
            version: "1"
        };


        return Ember.RSVP.hash(hash);
    }
});
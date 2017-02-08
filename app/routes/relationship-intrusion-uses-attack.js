import Ember from 'ember';

/**
 * Relationships Grid Route retrieves mitigates Relationships along with Courses of Action and Attack Patterns
 *
 * @module relatonship-actor-uses-attack
 * @extends routes/ItemRoute
 */
export default Ember.Route.extend({
    /**
     * Model queries for Relationships along with Intrusion Set and Attack Patterns
     *
     * @return {Object} Promise Object
     */
    model() {
        const hash = {};
        hash.help = {
            description: "This page allows your to quickly create relationships between an Intrusion Set and the the Attack Patterns that it uses.  " +
            "Every selected checkbox is a relationship."
        };
        let store = this.get("store");
        const relationshipParameters = {
            "filter[where][relationship_type]": "uses"
        };
        hash.intrusionSets = [];
        
        hash.attackPatterns = store.query("attack-pattern", { sort: "name" });
        hash.usesRelationships = store.query("relationship", relationshipParameters);

        return Ember.RSVP.hash(hash);
    },
});

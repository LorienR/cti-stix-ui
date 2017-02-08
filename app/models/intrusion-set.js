import DS from "ember-data";
import Ember from "ember";

/**
 * Threat Actor Model
 * 
 * @module
 * @extends ember-data/Model
 */
export default DS.Model.extend({
    name: DS.attr("string"),
    aliases: DS.attr(),
    labels: DS.attr(),
    external_references: DS.attr(),
    identities: DS.attr(),
    threatActors: DS.attr(),
    attackPatterns: DS.attr(),
    description: DS.attr("string"),
    version: DS.attr("string"),
    created: DS.attr("string"),
    modified: DS.attr("string"),
    first_seen: DS.attr("date"),
    last_seen: DS.attr("date"),
    goals: DS.attr("string"),
    resource_level: DS.attr("string"),
    primary_motivation: DS.attr("string"),
    secondary_motivations: DS.attr(),
    type: Ember.computed("id", function() {
        return "intrusion-set";
    })
});
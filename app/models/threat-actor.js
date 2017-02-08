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
    //aliases: DS.attr(),
    aliasNames: DS.attr(),
    labels: DS.attr(),
    external_references: DS.attr(),
    description: DS.attr("string"),
    version: DS.attr("string"),
    created: DS.attr("string"),
    modified: DS.attr("string"),
    type: Ember.computed("id", function() {
        return "threat-actor";
    })
});
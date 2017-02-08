import DS from "ember-data";
import Ember from "ember";

/**
 * Attack Pattern Model
 * 
 * @module
 * @extends ember-data/Model
 */
export default DS.Model.extend({
    name: DS.attr("string"),
    description: DS.attr("string"),
    labels: DS.attr(),
    kill_chain_phases: DS.attr(),
    external_references: DS.attr(),
    version: DS.attr("string"),
    created: DS.attr("date"),
    modified: DS.attr("date"),
    type: Ember.computed("id", function() {
        return "attack-pattern";
    })
});

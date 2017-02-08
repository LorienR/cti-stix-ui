import DS from "ember-data";
import Ember from "ember";

/**
 * Identity Model
 * 
 * @module
 * @extends ember-data/Model
 */
export default DS.Model.extend({
    name: DS.attr("string"),
    description: DS.attr("string"),
    labelNames: DS.attr(),
    identity_class: DS.attr("string"),
    sectors: DS.attr(),
    contact_information: DS.attr("string"),
    external_references: DS.attr(),
    version: DS.attr("string"),
    created: DS.attr("date"),
    modified: DS.attr("date"),
    type: Ember.computed("id", function() {
        return "identity";
    })
});
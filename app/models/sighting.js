import DS from "ember-data";
import Ember from "ember";

/**
 * Sightings Model
 * 
 * @module
 * @extends ember-data/Model
 */
export default DS.Model.extend({
    sighting_of_ref: DS.attr("string"),
    observed_data_refs: DS.attr(),
    where_sighted_refs: DS.attr(),
    first_seen: DS.attr("date"),
    last_seen: DS.attr("date"),
    count: DS.attr("number"),
    summary: DS.attr("string"),
    version: DS.attr("string"),
    created: DS.attr("date"),
    modified: DS.attr("date"),
    name: Ember.computed('sighting_of_ref', 'summary', function() {
        let sighting_of_ref = this.get('sighting_of_ref');
        let summary = this.get('summary');
        return sighting_of_ref + ' - ' + summary;
    })
});
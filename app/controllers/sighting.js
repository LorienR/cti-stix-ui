import Ember from "ember";


/**
 * sighting New Controller handles creation of new records
 *
 * @module
 * @extends ember/Controller
 */

export default Ember.Controller.extend({
    relationshipSorting: ['relationship_type: asc', 'name:asc'],
    sortedSourceRelationshipObjects: Ember.computed.sort('model.sourceRelationshipObjects', 'relationshipSorting'),
    sortedTargetRelationshipObjects: Ember.computed.sort('model.targetRelationshipObjects', 'relationshipSorting')
});
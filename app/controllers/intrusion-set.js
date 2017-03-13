import Ember from "ember";
import DeleteObjectAction from "../mixins/delete-object-action";
import CreateBundle from "../mixins/create-bundle";


/**
 * Intrusion Set Controller handles deletion of records
 * 
 * @module
 * @extends ember/Controller
 */
export default Ember.Controller.extend(DeleteObjectAction, CreateBundle, {
    relationshipSorting: ['relationship_type: asc', 'name:asc'],
    sortedSourceRelationshipObjects: Ember.computed.sort('model.sourceRelationshipObjects', 'relationshipSorting'),
    sortedTargetRelationshipObjects: Ember.computed.sort('model.targetRelationshipObjects', 'relationshipSorting')
});
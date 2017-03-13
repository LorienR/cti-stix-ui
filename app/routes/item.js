import Ember from 'ember';

/**
 * Item Route for retrieving individual recorsd and related objects
 *
 * @module
 * @extends ember/Route
 */

var inject = Ember.inject;

export default Ember.Route.extend({
    lodash: inject.service(),
    /**
     * Get Item Model hash of Promise objects with source and target Relationships
     *
     * @param {Object} parameters Parameters
     * @param {string} type Item Type
     * @return {Object} hash of key and Promise objects
     */
    getItemModel(parameters, type) {
        let self = this;
        let lodash = self.get('lodash');

        const store = this.get("store");
        const hash = {};
        hash.item = store.findRecord(type, parameters.id);

        const sourceFilter = {
            filter: {
                "order": "relationship_type asc",
                "where": {
                    "source_ref": parameters.id
                }
            }
        }
        const sourceRelationships = store.query("relationship", sourceFilter);
        const sourcesHandler = Ember.$.proxy(this.getRelatedObjects, this, "target_ref");
        hash.sourceRelationshipObjects = sourceRelationships.then(sourcesHandler);

        const targetFilter = {
            filter: {
                "order": "relationship_type asc",
                "where": {
                    "target_ref": parameters.id
                }
            }
        }
        const targetRelationships = store.query("relationship", targetFilter);
        const targetsHandler = Ember.$.proxy(this.getRelatedObjects, this, "source_ref");
        hash.targetRelationshipObjects = targetRelationships.then(targetsHandler);

        return hash;
    },

    /**
     * Get Related Objects based on Relationships and Referenced Field
     *
     * @param {string} referenceField Referenced Field for Related Objects
     * @param {Array} relationships Array of Relationship objects
     * @return {Object} Ember Promise including array of store.findRecord Promises
     */
    getRelatedObjects(referenceField, relationships) {
        const promises = [];
        const store = this.get("store");
        relationships.forEach(function(relationship) {
            const ref = relationship.get(referenceField);
            const external_ref_array = relationship.get('external_references');
            const relationship_id = relationship.get('id');
            const relationship_type = relationship.get('relationship_type');
            const refType = ref.split("--")[0];
            //const promise = store.findRecord(refType, ref);
            const promise = store.findRecord(refType, ref);
            const hash = promise;
            promise.then(function() {
                hash.set("related_external_references", external_ref_array);
                hash.set("relationship_id", relationship_id);
                hash.set("relationship_type", relationship_type);
            });


            //I need to add the external references from the relationships to the item that is being built

            promises.push(promise);
        });

        return Ember.RSVP.all(promises);
    }
});
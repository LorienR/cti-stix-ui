import Ember from "ember";

/**
 * Relationship New Controller handles creation of new records
 *
 * @module
 * @extends ember/Controller
 */

export default Ember.Controller.extend({
    /**
     * Get Validation Errors for new record
     *
     * @param {Object} item Item Object with properties for validation
     * @return {Array} Array of Errors
     */
    getValidationErrors: function(item) {
        var errors = [];

        if (Ember.isEmpty(item.source_ref)) {
            var sourceError = {
                title: "Property [source_ref] not specified"
            };
            errors.push(sourceError);
        }
        if (Ember.isEmpty(item.target_ref)) {
            var targetError = {
                title: "Property [target_ref] not specified"
            };
            errors.push(targetError);
        }
        if (Ember.isEmpty(item.relationship_type)) {
            var error = {
                title: "Property [relationship_type] not specified"
            };
            errors.push(error);
        }

        return errors;
    },

    /**
     * Find Relationship querying Store based on type and references
     *
     * @param {Object} item Item Object
     * @return {Object} Promise Object from Relationship Query
     */
    findRelationship: function(item) {
        var parameters = {
            "filter[where][source_ref]": item.source_ref,
            "filter[where][relationship_type]": item.relationship_type,
            "filter[where][target_ref]": item.target_ref
        };
        var store = this.get("store");
        return store.query("relationship", parameters);
    },

    /** @type {Object} */
    actions: {
        /**
         * Save Item after validation
         *
         * @function actions:save
         * @param {Object} item Item Object to be created
         * @return {undefined}
         */
        save(item) {
            let store = this.get("store");
            const self = this;
            var validationErrors = this.getValidationErrors(item);
            if (validationErrors.length) {
                var alert = {
                    label: "Validation Failed",
                    error: {
                        message: "Relationship validation failed: missing fields",
                        errors: validationErrors
                    }
                };
                this.set("model.alert", alert);
            } else {
                var findPromise = this.findRelationship(item);
                findPromise.then(function(relationships) {
                    var length = relationships.get("length");

                    if (length) {
                        var relationship = relationships.objectAt(0);
                        var relationshipId = relationship.get("id");
                        var alert = {
                            label: "Validation Failed",
                            error: {
                                message: `Duplicate Relationship found: ${relationshipId}`
                            }
                        };
                        self.set("model.alert", alert);
                    } else {
                        let itemRecord = store.createRecord("relationship", item);
                        let promise = itemRecord.save();

                        promise.then(function() {
                            self.transitionToRoute("relationships");
                        });
                        promise.catch(function(error) {
                            var alert = {
                                label: "Save Failed",
                                error: error
                            };
                            self.set("model.alert", alert);
                        });
                    }
                });
                findPromise.catch(function(error) {
                    var alert = {
                        label: "Validation Checking Failed",
                        error: error
                    };
                    self.set("model.alert", alert);
                });
            }
        },

        /**
         * Type Value Changed
         *
         * @function actions:typeValueChanged
         * @param {string} propertyPath Object Property Path Changed
         * @param {string} valuePropertyPath Value Property Path to be updated
         * @param {Object} typeValue Type Name used for Store.query()
         * @param {string} objectValuePath Object Value Path for retrieving value following return of records
         * @return {undefined}
         */
        typeValueChanged(propertyPath, valuePropertyPath, typeValue, objectValuePath) {
            this.set(propertyPath, undefined);
            if (typeValue) {
                const store = this.get("store");
                const parameters = { sort: "relationship_type" };
                const promise = store.query(typeValue, parameters);
                const self = this;
                promise.then(function(recordArray) {
                    self.set(propertyPath, recordArray);
                    if (recordArray) {
                        const firstRecord = recordArray.objectAt(0);
                        const value = firstRecord.get(objectValuePath);
                        self.set(valuePropertyPath, value);
                    }
                });
            }
        }
    }
});
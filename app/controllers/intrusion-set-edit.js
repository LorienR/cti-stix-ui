import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveLabels from "../mixins/add-remove-labels";

/**
 * Intrusion Set Controller responsible for updating records
 * 
 * @module
 * @extends ember/Controller
 */

var inject = Ember.inject;

export default Ember.Controller.extend(AddRemoveExternalReferences, AddRemoveLabels, {
    /** @type {Object} */
    ajax: inject.service(),
    notifications: inject.service(),
    debounceDelay: 500,

    /**
     * Query Attack Patterns
     *
     * @param {string} searchTerms Search Terms
     * @param {function} resolve Resolve Promise Function
     * @param {function} reject Reject Promise Function
     */
    queryAttackPatterns(searchTerms, resolve, reject) {
        const store = this.get("store");
        const parameters = {
            "filter[where][name][like]": searchTerms,
            "filter[order]": name
        };
        const promise = store.query("attack-pattern", parameters);
        promise.then(resolve, reject);
    },

    /**
     * Query Identities
     *
     * @param {string} searchTerms Search Terms
     * @param {function} resolve Resolve Promise Function
     * @param {function} reject Reject Promise Function
     */
    queryIdentities(searchTerms, resolve, reject) {
        const store = this.get("store");
        const parameters = {
            "filter[where][name][like]": searchTerms,
            "filter[order]": name
        };
        const promise = store.query("identity", parameters);
        promise.then(resolve, reject);
    },

    /**
     * Query Threat Actors
     *
     * @param {string} searchTerms Search Terms
     * @param {function} resolve Resolve Promise Function
     * @param {function} reject Reject Promise Function
     */
    queryThreatActors(searchTerms, resolve, reject) {
        const store = this.get("store");
        const parameters = {
            "filter[where][name][like]": searchTerms,
            "filter[order]": name
        };
        const promise = store.query("threat-actor", parameters);
        promise.then(resolve, reject);
    },

    /**
     * Save Relationships
     *
     * @param {Object} record Record
     * @param {Array} relatedRecords Array of Related records
     * @return {undefined}
     */
    saveRelationships(record, relatedRecords) {
        if (relatedRecords) {
            const recordId = record.id;
            relatedRecords.forEach((relatedRecord) => {
                const refType = relatedRecord.get("id").split("--")[0];
                const relatedRecordType = relatedRecord.get("type");
                const relationshipID = relatedRecord.get("relationship_id");

                const relatedRecordID = relatedRecord.get("id");
                if (refType === "threat-actor") {
                    //If relationshipID, then edit the relationship
                    if (relationshipID) {
                        this.editRelationship(relatedRecord);
                    } else {
                        //IF no relationshipID, then a new relationship
                        const relationshipObject = {
                            relationship_type: "attributed-to",
                            source_ref: recordId,
                            target_ref: relatedRecordID,
                            external_references: relatedRecord.get("related_external_references"),
                        };
                        this.saveRelationship(relationshipObject);
                    }

                } else if (refType === "attack-pattern") {
                    //If relationshipID, then edit the relationship
                    if (relationshipID) {
                        this.editRelationship(relatedRecord);
                    } else {
                        //IF no relationshipID, then a new relationship    
                        const relationshipObject = {
                            relationship_type: "uses",
                            source_ref: recordId,
                            target_ref: relatedRecordID,
                            external_references: relatedRecord.get("related_external_references"),
                        };
                        this.saveRelationship(relationshipObject);
                    }

                } else if (refType === "identity") {
                    //If relationshipID, then edit the relationship
                    if (relationshipID) {
                        this.editRelationship(relatedRecord);
                    } else {
                        //IF no relationshipID, then a new relationship
                        const relationshipObject = {
                            relationship_type: "targets",
                            source_ref: recordId,
                            target_ref: relatedRecordID,
                            external_references: relatedRecord.get("related_external_references"),
                        };
                        this.saveRelationship(relationshipObject);
                    }
                }
            }, this);
        }
    },

    /**
     * Save Relationship
     *
     * @param {Object} relationshipObject Relationship attributes
     * @return {undefined}
     */
    saveRelationship(relationshipObject) {
        const created = new Date();
        relationshipObject.created = created;
        relationshipObject.modified = created;
        relationshipObject.version = "1";
        const store = this.get("store");
        const relationship = store.createRecord("relationship", relationshipObject);
        relationship.save();
    },
    editRelationship(object) {
        const relationshipObject = {
            external_references: object.get("related_external_references"),
        };
        let self = this;
        let store = this.get("store");
        const id = object.get("relationship_id");
        var json = JSON.stringify(relationshipObject);
        this.get('ajax').request('cti-stix-store-api/relationships/' + id, {
            method: 'PATCH',
            data: JSON.parse(json)
        }).then(function() {
            //self.get('notifications').success('Save complete.');
        }).catch(function(error) {
            console.log(error);
        });

    },

    /**
     * Save Item and Relationships
     *
     * @param {Object} item Item
     * @return {undefined}
     */
    saveItem(item) {
        const attackPatterns = this.get("model.attackPatterns");
        const threatActors = this.get("model.threatActors");
        const identities = this.get("model.identities");

        let self = this;
        let store = this.get("store");
        const id = this.get("model.item.id");
        var json = JSON.stringify(item);
        this.get('ajax').request('cti-stix-store-api/intrusion-sets/' + item.id, {
            method: 'PATCH',
            data: JSON.parse(json)
        }).then(function(savedRecord) {
            self.saveRelationships(savedRecord, attackPatterns);
            self.saveRelationships(savedRecord, identities);
            self.saveRelationships(savedRecord, threatActors);

            self.get('notifications').success('Save complete.');
            //self.transitionToRoute("intrusion-sets");
        }).catch(function(error) {
            console.log(error);
        });
    },

    actions: {

        /**
         * Save Item to Store
         * 
         * @function actions:save
         * @param {Object} item Object to be created
         * @returns {undefined}
         */
        save(item) {
            this.saveItem(item);

        },

        /**
         * Search Attack Patterns Action Handler
         *
         * @param {string} searchTerms Search Terms
         * @return {Object} Ember Promise Object
         */
        searchAttackPatterns(searchTerms) {
            const debounceDelay = this.get("debounceDelay");
            return new Ember.RSVP.Promise((resolve, reject) => {
                Ember.run.debounce(this, this.queryAttackPatterns, searchTerms, resolve, reject, debounceDelay);
            });
        },

        /**
         * Search Identities Action Handler
         *
         * @param {string} searchTerms Search Terms
         * @return {Object} Ember Promise Object
         */
        searchIdentities(searchTerms) {
            const debounceDelay = this.get("debounceDelay");
            return new Ember.RSVP.Promise((resolve, reject) => {
                Ember.run.debounce(this, this.queryIdentities, searchTerms, resolve, reject, debounceDelay);
            });
        },

        /**
         * Search Threat Actors Action Handler
         *
         * @param {string} searchTerms Search Terms
         * @return {Object} Ember Promise Object
         */
        searchThreatActors(searchTerms) {
            const debounceDelay = this.get("debounceDelay");
            return new Ember.RSVP.Promise((resolve, reject) => {
                Ember.run.debounce(this, this.queryThreatActors, searchTerms, resolve, reject, debounceDelay);
            });
        }
    }
});
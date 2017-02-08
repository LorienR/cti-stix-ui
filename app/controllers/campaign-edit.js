import Ember from "ember";
import AddRemoveExternalReferences from "../mixins/add-remove-external-references";
import AddRemoveLabels from "../mixins/add-remove-labels";

/**
 * Camoaign Controller responsible for updating records
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
    queryIntrusionSets(searchTerms, resolve, reject) {
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
            const id = record.get("id");
            relatedRecords.forEach((relatedRecord) => {
                const relatedRecordType = relatedRecord.get("type");
                if (relatedRecordType === "threat-actor") {
                    const relationshipObject = {
                        relationship_type: "attributed-to",
                        source_ref: id,
                        target_ref: relatedRecord.get("id")
                    };
                    this.saveRelationship(relationshipObject);
                } else if (relatedRecordType === "attack-pattern") {
                    const relationshipObject = {
                        relationship_type: "uses",
                        source_ref: id,
                        target_ref: relatedRecord.get("id")
                    };
                    this.saveRelationship(relationshipObject);
                } else if (relatedRecordType === "identity") {
                    const relationshipObject = {
                        relationship_type: "targets",
                        source_ref: id,
                        target_ref: relatedRecord.get("id")
                    };
                    this.saveRelationship(relationshipObject);
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

    /**
     * Save Item and Relationships
     *
     * @param {Object} item Item
     * @return {undefined}
     */
    saveItem(item) {
        const attackPatterns = this.get("model.attackPatterns");
        const intrusionSets = this.get("model.intrusionSets");
        const identities = this.get("model.identities");

        const self = this;
        const store = this.get("store");

        const record = store.createRecord("campaign", item);
        const promise = record.save();
        promise.then((savedRecord) => {
            self.saveRelationships(savedRecord, attackPatterns);
            self.saveRelationships(savedRecord, identities);
            self.saveRelationships(savedRecord, intrusionSets);

            self.transitionToRoute("campaigns");
        });

        promise.catch(function(error) {
            var alert = {
                label: "Save Failed",
                error: error
            };
            self.set("model.alert", alert);
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

            let self = this;
            //let lodash = self.get('lodash');

            var json = JSON.stringify(item);
            this.get('ajax').request('https://localhost/cti-stix-store-api/campaigns/' + item.id, {
                method: 'PATCH',
                data: JSON.parse(json)
            }).then(function() {
                self.get('notifications').success('Save complete.');
            }).catch(function(error) {
                console.log(error);
            });

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
        searchIntrusionSets(searchTerms) {
            const debounceDelay = this.get("debounceDelay");
            return new Ember.RSVP.Promise((resolve, reject) => {
                Ember.run.debounce(this, this.queryIntrusionSets, searchTerms, resolve, reject, debounceDelay);
            });
        }
    }
});
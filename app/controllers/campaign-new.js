import Ember from "ember";

/**
 * Campaign New Controller responsible for creating records
 *
 * @module
 * @extends ember/Controller
 */
export default Ember.Controller.extend({
    /**
     * Debounce Delay
     *
     * @type {number}
     */
    debounceDelay: 500,

    /**
    *Is Showing Translucent - modal helper
    *
    *@type {boolean}
    */
    isShowingTranslucent: false,

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
     * Query Intrusion Sets
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
        const promise = store.query("intrusion-set", parameters);
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
                if (relatedRecordType === "intrusion-set") {
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
        const attackPatterns = item.attackPatterns;
        const intrusionSets = item.intrusionSets;
        const identities = item.identities;
        const indicators = item.indicators;
        item.name = item.campaign_name;
        item.description = item.campaign_description;

        const self = this;
        const store = this.get("store");

        const record = store.createRecord("campaign", item);
        const promise = record.save();
        promise.then((savedRecord) => {
            self.saveRelationships(savedRecord, attackPatterns);
            self.saveRelationships(savedRecord, identities);
            self.saveRelationships(savedRecord, intrusionSets);

            self.saveIndicators(savedRecord, indicators);
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

    /**
     * Save Indicators
     *
     * @param {Object} record Campaign Record
     */
    saveIndicators(record, indicators) {
        const target_ref = record.get("id");
        const created = new Date();
        const store = this.get("store");

        const self = this;
        indicators.forEach((indicator) => {
            indicator.valid_from = created;
            indicator.created = created;
            indicator.modified = created;
            indicator.version = "1";

            const indicatorRecord = store.createRecord("indicator", indicator);
            const indicatorPromise = indicatorRecord.save();
            indicatorPromise.then((savedIndicator) => {
                const source_ref = savedIndicator.get("id");
                const relationshipObject = {
                    source_ref: source_ref,
                    target_ref: target_ref,
                    relationship_type: "indicates"
                };
                self.saveRelationship(relationshipObject);
            });
        }, this);
    },

    /**
     * Actions
     *
     * @type {Object}
     */
    actions: {
        /**
         * Save
         *
         * @param {Object} item Item
         * @return {undefined}
         */
        save(item) {
            this.saveItem(item);
        },

        openModal: function(content, term) {
          this.set('model.item.name', term);
          this.get('target').send('openModal', content);
        },

        toggleTranslucent() {
          this.toggleProperty('isShowingTranslucent');
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
         * Search Intrusion Set Action Handler
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

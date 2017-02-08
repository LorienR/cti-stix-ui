import Ember from "ember";

/**
 * Relationship Grid Controller handles creation and deletion of relationships between Intrusion Sets and Attack Patterns
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
     * Attack Pattern Service for grouping
     * 
     * @type {Object}
     */
    attackPatternService: Ember.inject.service("attack-pattern"),
    /**
     * Query Identities
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
     * Phase Name Groups generates groups of Attack Patterns based on Kill Chain Phase Name
     * 
     * @function
     * @return {Array} Array of Phase Name Groups with associated Attack Patterns
     */
    phaseNameGroups: Ember.computed("model.attackPatterns", function() {
        const attackPatterns = this.get("model.attackPatterns");
        return this.get("attackPatternService").getPhaseNameGroups(attackPatterns);
    }),

    /**
     * Relationship Array based on Courses of ACtion and Attack Patterns
     * 
     * @function
     * @return {Array} Array of Relationships
     */
    relationshipArray: Ember.computed("model.intrusionSets.[]", "model.attackPatterns", function () {
        const intrusionSets = this.get("model.intrusionSets");
        const phaseNameGroups = this.get("phaseNameGroups");
        let usesRelationships = this.get("model.usesRelationships");

        let relationships = [];

        phaseNameGroups.forEach(function(phaseNameGroup) {

            let attackPatternArray = [];
            phaseNameGroup.attackPatterns.forEach(function(attackPattern) {
                let relationshipArray = [];
                intrusionSets.forEach(function (intrusionSets) {
                    const intrusionSetID = intrusionSets.get("id");
                    const attackPatternID = attackPattern.get("id");
                    const computedID = intrusionSetID + attackPatternID;
                    let relationshipID = "";
                    let selected = false;
                    let matchedRelationship = usesRelationships.filterBy("source_ref", intrusionSetID).filterBy("target_ref", attackPatternID);
                    if (matchedRelationship.length) {
                        relationshipID = matchedRelationship[0].get("id");
                        selected = true;
                    }
                    let relationship = {
                        intrusionSetID: intrusionSets.get("id"),
                        attackPatternID: attackPattern.get("id"),
                        computedID: computedID,
                        relationshipID: relationshipID,
                        selected: selected
                    };
                    relationshipArray.push(relationship);
                });
                let attackObj = {
                    attackPatternName: attackPattern.get("name"),
                    attackPatternID: attackPattern.get("id"),
                    items: relationshipArray
                };
                attackPatternArray.push(attackObj);
            });
            let phaseObj = {
                phaseName: phaseNameGroup.get("phaseName"),
                items: attackPatternArray
            };
            relationships.push(phaseObj);
        });
        return relationships;

    }),

    /** @type {Object} */
    actions: {

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
        },

        /**
         * Click Relationship handler for creating or deleting Relationships
         * 
         * @function actions:clickRelationship
         * @param {Object} relationshipObj Relationship Object with custom properties
         * @returns {undefined}
         */
        clickRelationship(relationshipObj) {
            let selected = relationshipObj.selected;
            let intrusionSetID = relationshipObj.intrusionSetID;
            let attackPatternID = relationshipObj.attackPatternID;

            let store = this.get("store");
            if (selected) {
                let relationshipID = relationshipObj.relationshipID;
                let itemRecord = store.peekRecord('relationship', relationshipID);
                let promise = itemRecord.destroyRecord();

                const self = this;
                promise.catch(function(error) {
                    var alert = {
                        label: "Delete Failed",
                        error: error
                    };
                    self.set("alert", alert);
                    self.set("alertObjectId", itemRecord.get("id"));
                });

                promise.then(function() {
                    Ember.set(relationshipObj, "relationshipID", undefined);
                    Ember.set(relationshipObj, "selected", false);
                });
            } else {
                const relationship = {
                    relationship_type: "uses",
                    source_ref: intrusionSetID,
                    target_ref: attackPatternID,
                    created: new Date(),
                    modified: new Date(),
                    version: "1"
                };

                let itemRecord = store.createRecord("relationship", relationship);
                let promise = itemRecord.save();

                const self = this;
                promise.catch(function(error) {
                    var alert = {
                        label: "Save Failed",
                        error: error
                    };
                    self.set("alert", alert);
                    self.set("alertObjectId", 1);
                });

                promise.then(function(createdRecord) {
                    Ember.set(relationshipObj, "relationshipID", createdRecord.get("id"));
                    Ember.set(relationshipObj, "selected", true);
                });
            }
        }
    }
});
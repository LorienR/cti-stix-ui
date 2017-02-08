import Ember from "ember";

/**
 * Relationship Grid Controller handles creation and deletion of relationships between Courses of Action and Attack Patterns
 * 
 * @module
 * @extends ember/Controller
 */

export default Ember.Controller.extend({
    /**
     * Attack Pattern Service for grouping
     * 
     * @type {Object}
     */
    attackPatternService: Ember.inject.service("attack-pattern"),

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
    relationshipArray: Ember.computed("model.courseOfActions", "model.attackPatterns", function() {
        const courseOfActions = this.get("model.courseOfActions");
        const phaseNameGroups = this.get("phaseNameGroups");
        let mitigatesRelationship = this.get("model.mitigatesRelationships");

        let relationships = [];

        phaseNameGroups.forEach(function(phaseNameGroup) {

            let attackPatternArray = [];
            phaseNameGroup.attackPatterns.forEach(function(attackPattern) {
                let relationshipArray = [];
                courseOfActions.forEach(function(courseOfAction) {
                    const courseOfActionID = courseOfAction.get("id");
                    const attackPatternID = attackPattern.get("id");
                    const computedID = courseOfActionID + attackPatternID;
                    let relationshipID = "";
                    let selected = false;
                    let matchedRelationship = mitigatesRelationship.filterBy("source_ref", courseOfActionID).filterBy("target_ref", attackPatternID);
                    if (matchedRelationship.length) {
                        relationshipID = matchedRelationship[0].get("id");
                        selected = true;
                    }
                    let relationship = {
                        courseOfActionID: courseOfAction.get("id"),
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
         * Click Relationship handler for creating or deleting Relationships
         * 
         * @function actions:clickRelationship
         * @param {Object} relationshipObj Relationship Object with custom properties
         * @returns {undefined}
         */
        clickRelationship(relationshipObj) {
            let selected = relationshipObj.selected;
            let courseOfActionID = relationshipObj.courseOfActionID;
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
                    relationship_type: "mitigates",
                    source_ref: courseOfActionID,
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
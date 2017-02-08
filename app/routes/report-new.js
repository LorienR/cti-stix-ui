import Ember from 'ember';
/**
 * Campaign New Route sets initial model for creating new records
 *
 * @module
 * @extends ember/Route
 */
export default Ember.Route.extend({
    /**
     * Model sets initial model for creating new records
     *
     * @return {Object} Promise Object
     */
    model() {
        let model = {
            item: {
                name: undefined,
                description: undefined,
                published: new Date(),
                external_references: [],
                created: new Date(),
                modified: new Date(),
                version: "1",
                object_refs: [],
                labels: []
            },
            intrusionSets : [],
            attackPatterns : [],
            indicators : [],
            labels: [
                { label: "Threat Report", id: "threat-report" },
                { label: "Campaign", id: "campaign" },
                { label: "Identity", id: "identity" },
                { label: "Attack Pattern", id: "attack-pattern" },
                { label: "Indicator", id: "indicator" },
                { label: "Intrusion Set", id: "intrusion-set" },
                { label: "Malware", id: "malware" },
                { label: "Observed Data", id: "observed-data" },
                { label: "Threat Actor", id: "threat-actor" },
                { label: "Tool", id: "tool" },
                { label: "Vulnerability", id: "vulnerability" },
                { label: "Infrastructure Posture", id: "posture" },
            ],
        };
        model.help = {
            description: "A report is a survey of the Courses of Actions that your organization implements, " +
                "and to what level (High, Medium, or Low).  Unfetter|Discover will use the survey to help you " +
                "understand your gaps, how important they are and which should be addressed.  You may create " +
                "multiple reports to see how new or different Courses of Actions implemented may change your security posture."
        };
        return Ember.RSVP.hash(model);
    }
});
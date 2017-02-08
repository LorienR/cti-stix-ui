import Ember from 'ember';

/**
 * Identity New Route sets initial model for creating new records
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
        const hash = {};
        hash.help = {
            description: "An identity can represent actual individuals, organizaitons or groups as well as classes of individuals, " +
                "organizations or groups."
        };
        hash.identity_class = [
            { label: "individual", id: "individual" },
            { label: "group", id: "group" },
            { label: "organization", id: "organization" },
            { label: "class", id: "class" },
            { label: "unknown", id: "unknown" }
        ];

        hash.sectorOptions = [
            { label: "agriculture", id: "agriculture" },
            { label: "aerospace", id: "aerospace" },
            { label: "automotive", id: "automotive" },
            { label: "communications", id: "communications" },
            { label: "construction", id: "construction" },
            { label: "defence", id: "defence" },
            { label: "education", id: "education" },
            { label: "energy", id: "energy" },
            { label: "entertainment", id: "entertainment" },
            { label: "financial services", id: "financial-services" },
            { label: "gov national", id: "government-national" },
            { label: "gov regional", id: "government-regional" },
            { label: "gov local", id: "government-local" },
            { label: "gov public services", id: "government-public-services" },
            { label: "healthcare", id: "healthcare" },
            { label: "hospitality leisure", id: "hospitality-leisure" },
            { label: "infrastructure", id: "infrastructure" },
            { label: "insurance", id: "insurance" },
            { label: "manufacturing", id: "manufacturing" },
            { label: "mining", id: "mining" },
            { label: "non profit", id: "non-profit" },
            { label: "pharmaceuticals", id: "pharmaceuticals" },
            { label: "retail", id: "retail" },
            { label: "technology", id: "technology" },
            { label: "telecommunications", id: "telecommunications" },
            { label: "transportation", id: "transportation" },
            { label: "utilities", id: "utilities" }
        ];

        hash.item = {
            name: undefined,
            description: undefined,
            identity_class: undefined,
            sectors: [],
            contact_information: undefined,
            created: new Date(),
            modified: new Date(),
            version: "1",
            labels: [],
            external_references: [],
        };

        return Ember.RSVP.hash(hash);
    }
});
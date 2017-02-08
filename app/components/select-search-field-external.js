import Ember from "ember";


/**
 * Select Search Field Component using Ember Power Select search
 *
 * @module
 * @extends ember/Component
 */
export default Ember.Component.extend( {
    /**
     * Selected Object
     *
     * @type {Object}
     */
    selected: undefined,

    /**
     * Selections Array
     *
     * @type {Array}
     */
    selections: [],

    /**
     * Selected Observer for updating array of selections
     *
     * @return {undefined}
     */
    selectedObserver: Ember.observer("selected", function() {
        const selected = this.get("selected");
        if (selected) {
            this.set("selected", undefined);

            const selections = this.get("selections");
            selected.externalReferences=[]
            selections.pushObject(selected);
        }
    }),

    /**
     * Actions
     *
     * @type {Object}
     */
    actions: {

        addExternalReference(item) {
            const externalReference = {
                source_name: undefined,
                external_id: undefined,
                url: undefined
            };

            let references = Ember.get(item, "external_references");
            references.pushObject(externalReference);
        },

        /**
         * Remove External Reference object from array
         * 
         * @function actions:removeExternalReference
         * @param {Object} externalReference Object to be removed
         * @returns {undefined}
         */
        removeExternalReference(externalReference) {
            const references = this.get("model.item.external_references");
            references.removeObject(externalReference);
        },
        /**
         * Remove Selection
         *
         * @param {Object} selection Selection Object
         * @return {undefined}
         */
        removeSelection(selection) {
            const selections = this.get("selections");
            if (selections) {
                selections.removeObject(selection);
            }
        }
    }
});

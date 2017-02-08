import Ember from "ember";

/**
 * Add Remove Aliases Mixin for new records
 * 
 * @module
 * @extends ember/Mixin
 */
export default Ember.Mixin.create({
    /** @type {Object} */
    actions: {
        /**
         * Add Alias object to array for editing
         * 
         * @function actions:addAlias
         * @param {Object} item Object to be created
         * @returns {undefined}
         */
        addAlias(item) {
            let aliasNames = Ember.get(item, "aliasNames");
            let alias = {
                name: undefined
            };
            let addProperty = false;
            if (!aliasNames) {
                aliasNames = [];
                addProperty = true;
            }
            aliasNames.pushObject(alias);
            if (addProperty) {
                Ember.setProperties(item, {
                    aliasNames: aliasNames
                });
            }
        },

        /**
         * Remove Alias object from array
         * 
         * @function actions:removeAlias
         * @param {Object} Alias Object to be removed
         * @returns {undefined}
         */
        removeAlias(alias) {
            const aliases = this.get("model.item.aliasNames");
            aliases.removeObject(alias);
        }
    }
});
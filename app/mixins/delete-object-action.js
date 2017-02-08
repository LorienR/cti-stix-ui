import Ember from "ember";

/**
 * Delete Object Action Mixin for removing records following confirmation
 * 
 * @module
 * @extends ember/Mixin
 */

var inject = Ember.inject;

export default Ember.Mixin.create({
    queryParams: ["deleteObjectId", "onDeleteNavigateTo"],
    notifications: inject.service(),

    /**
     * Delete Object invoked following confirmation
     * 
     * @function
     * @return Deleted Object
     */
    // deleteObject: Ember.computed("deleteObjectId", "model.items", function() {
    //     const items = this.get("model.items");
    //     const id = this.get("deleteObjectId");
    //     return items.findBy("id", id);
    // }),
    deleteObject: Ember.computed("deleteObjectId", "model", function() {
        const model = this.get("model");
        if (!model) {
            return null;
        }

        let id = this.get("deleteObjectId");
        if (model.items && id) {
            //return an item from the model.items list
            return model.items.findBy("id", id);
        } else {
            //no id, return the model
            return model.item;
        }
    }),

    /** @type {Object} */
    actions: {
        /**
         * Delete Confirmed action handler
         * 
         * @function actions:deleteConfirmed
         * @returns {undefined}
         */
        deleteConfirmed() {
            const item = this.get("deleteObject");
            if (item) {
                this.set("deleteObjectId", undefined);
                let promise = item.destroyRecord();

                const self = this;
                let navigateTo = this.get("onDeleteNavigateTo");

                promise.then(function() {
                    if (navigateTo) {
                        self.transitionToRoute(navigateTo);
                    } else {
                        self.get('notifications').success('Item deleted.');
                    }
                });
                promise.catch(function(error) {
                    var alert = {
                        label: "Delete Failed",
                        error: error
                    };
                    self.set("alert", alert);
                    self.set("alertObjectId", item.get("id"));
                });
            }
        }
    }
});
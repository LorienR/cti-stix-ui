import Ember from "ember";
import DeleteObjectAction from "../mixins/delete-object-action";
import CreateBundle from "../mixins/create-bundle";

/**
 * Indicators Controller handles grouping and deletion of records
 * 
 * @module
 * @extends ember/Controller
 */

export default Ember.Controller.extend(DeleteObjectAction, CreateBundle, {

});
import Ember from "ember";
import DeleteObjectAction from "../mixins/delete-object-action";
import CreateBundle from "../mixins/create-bundle";

/**
 * Identity Controller handles details
 * 
 * @module
 * @extends ember/Controller
 */

export default Ember.Controller.extend(DeleteObjectAction, CreateBundle, {

});
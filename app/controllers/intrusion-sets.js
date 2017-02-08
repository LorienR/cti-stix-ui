import Ember from "ember";
import DeleteObjectAction from "../mixins/delete-object-action";
import CreateBundle from "../mixins/create-bundle";


/**
 * Intrusion Sets Controller handles deletion of records
 * 
 * @module
 * @extends ember/Controller
 */
export default Ember.Controller.extend(DeleteObjectAction, CreateBundle, {
    
});
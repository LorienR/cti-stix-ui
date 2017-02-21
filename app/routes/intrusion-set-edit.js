import Ember from 'ember';

import ItemRoute from "./item";

/**
 * Indicator Route extends Item Route for retrieving individual records
 * 
 * @module
 * @extends routes/ItemRoute
 */
export default ItemRoute.extend({
    /**
     * Model calls ItemRoute.getItemModel with specified parameters
     * 
     * @param {Object} parameters Parameters Object
     * @return {Object} Promise Objec†t
     */
    model(parameters) {
        let hash = this.getItemModel(parameters, "intrusion-set");
        console.log('item');
        console.log(hash.item);
        const typePathMapping = {
            attackPatterns: "attack-pattern",
            indicators: "indicators",
            threatActors: "threat-actor",
            identities: "identity"
        };
        for (var key in typePathMapping){
            eval("hash."+key+" = [];");
        }
        hash.threatActors = [];
        hash.attackPatterns = [];
        hash.indicators = [];
        hash.identities = [];

        hash.targetRelationshipObjects.then(function(results) {
           console.log(`targetRelationshipObjects`);
           console.log(results);
           results.forEach(function(result){

               console.log(`result`);
           });
           
        });
        hash.sourceRelationshipObjects.then(function(results) {
            console.log(`sourceRelationshipObjects`);
            console.log(results);
            console.log('print result');
            results.forEach(function(result){
                const ref = result.get("id");
                const refType = ref.split("--")[0];
                for (var key in typePathMapping){
                    if (refType === typePathMapping[key]) {
                        eval("hash."+key+".push(result);");
                    }
                }
            });
        });
        
        hash.help = {
            description: "An Intrusion Set is a grouped set of adversarial behaviors and resources with common " +
                "properties that is believed to be orchestrated by a single organization. An Intrusion Set may " +
                "capture multiple Campaigns or other activities that are all tied together by shared attributes " +
                "indicating a common known or unknown Threat Actor. New activity can be attributed to an " +
                "Intrusion Set even if the Threat Actors behind the attack are not known. Threat Actors can move " +
                "from supporting one Intrusion Set, to supporting another, or they may support multiple Intrusion " +
                "Sets."
        };

        return Ember.RSVP.hash(hash);
    }
});
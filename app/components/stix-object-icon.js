import Ember from "ember";
import ENV from "cti-stix-ui/config/environment";

/**
 * STIX Object Icon
 *
 * @module
 * @extends ember/Component
 */
export default Ember.Component.extend({
    tagName: "object",

    classNames: ["stix-object-icon"],

    attributeBindings: ["type", "data"],

    type: "image/svg+xml",

    objectType: undefined,

    iconDirectory: "stix-icons",

    iconExtension: "svg",

    fileNameExtension: "-b",

    emptyString: "",

    labelIncluded: false,

    /**
     * Data attribute URL computed based on objectType property
     *
     * @return {String} Data URL
     */
    data: Ember.computed("objectType", function() {
        const objectType = this.get("objectType");
        const iconDirectory = this.get("iconDirectory");
        const iconExtension = this.get("iconExtension");

        let fileNameExtension = this.get("fileNameExtension");
        const labelIncluded = this.get("labelIncluded");
        if (labelIncluded) {
            fileNameExtension = this.get("emptyString");
        }

        let path = `${ENV.rootURL}${iconDirectory}/${iconExtension}/${objectType}${fileNameExtension}.${iconExtension}`;
        Ember.$.ajax({
            url: path,
            async: false,
            error: () => {
                path = `${ENV.rootURL}${iconDirectory}/${iconExtension}/` + "ic_help_outline_black_24px" + `.${iconExtension}`;
            }

        });
        return Ember.String.htmlSafe(path);

        // const path = `${ENV.rootURL}${iconDirectory}/${iconExtension}/${objectType}${fileNameExtension}.${iconExtension}`;
        // return Ember.String.htmlSafe(path);
    })
});
import Ember from "ember";

/**
 * Indicator Pattern Field Component using Ember Power Select search
 *
 * @module
 * @extends ember/Component
 */
export default Ember.Component.extend({
    /**
     * Object Types
     *
     * @type {Array}
     */
    objectTypes: [
        {
            label: "domain-name"
        }, {
            label: "email-addr"
        }, {
            label: "file"
        }, {
            label: "ipv4-addr"
        }, {
            label: "ipv6-addr"
        }, {
            label: "mac-addr"
        }, {
            label: "url"
        }
    ],

    /**
     * Object Properties
     *
     * @type {Array}
     */
    objectProperties: [
        {
            label: "hashes.MD5"
        }, {
            label: "hashes.SHA-256"
        }, {
            label: "name"
        }, {
            label: "value"
        }
    ],

    /**
     * Selected Object Type
     *
     * @type {string}
     */
    selectedObjectType: undefined,

    /**
     * Selected Object Property
     *
     * @type {string}
     */
    selectedObjectProperty: undefined,

    /**
     * Selected Object Value
     *
     * @type {string}
     */
    selectedObjectValue: undefined,

    /**
     * Indicators
     *
     */
    indicators: [],

    /**
     * Add Disabled
     *
     * @type {boolean}
     */
    addDisabled: Ember.computed("selectedObjectType", "selectedObjectProperty", "selectedObjectValue", function() {
        let disabled = true;
        const objectType = this.get("selectedObjectType");
        if (objectType) {
            const objectProperty = this.get("selectedObjectProperty");
            if (objectProperty) {
                const objectValue = this.get("selectedObjectValue");
                if (objectValue) {
                    disabled = false;
                }
            }
        }
        return disabled;
    }),

    /**
         * Selected Observer for updating array of selections
         *
         * @return {undefined}
         */
        selectedObserver: Ember.observer("selected", function() {
            const selected = this.get("selected");
            if (selected) {
                this.set("selected", undefined);

                const indicators = this.get("indicators");
                indicators.pushObject(selected);
            }
        }),

    /**
     * Actions
     *
     * @type {Object}
     */
    actions: {
        /**
         * Add
         */
        add(term) {
            if (term) {this.set("selectedObjectValue", term);};
            const objectType = this.get("selectedObjectType");
            if (objectType) {
                const objectProperty = this.get("selectedObjectProperty");
                if (objectProperty) {
                    const objectValue = this.get("selectedObjectValue");
                    if (objectValue) {
                        const pattern = `[${objectType.label}:${objectProperty.label} = '${objectValue}']`;
                        const indicator = {
                            name: pattern,
                            pattern: pattern
                        };
                        const indicators = this.get("indicators");
                        indicators.pushObject(indicator);

                        this.set("selectedObjectType", undefined);
                        this.set("selectedObjectProperty", undefined);
                        this.set("selectedObjectValue", undefined);
                    }
                }
            }
        },
          hideCreateOptionOnSameName(term) {
            let existingOption = new Ember.RSVP.Promise((resolve, reject) => {
                                                 Ember.run.debounce(this, this.newQuery, term, resolve, reject, "indicator", 500);
                                                 });
            return !existingOption;
          },

          findValue(searchTerms) {
              return new Ember.RSVP.Promise((resolve, reject) => {
                  Ember.run.debounce(this, this.newQuery, searchTerms, resolve, reject, "indicator", 500);
              });
          },

          saveValue(term) {
            this.set("selectedObjectValue", term);
            },

        /**
         * Remove
         *
         * @param {Object} selection Selection Object
         * @return {undefined}
         */
        remove(selection) {
            const indicators = this.get("indicators");
            if (indicators) {
                indicators.removeObject(selection);
            }
        }
    }
});

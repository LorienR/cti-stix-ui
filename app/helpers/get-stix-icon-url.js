import Ember from "ember";



/**
 * Build the URL of icons based on STIX Object Type
 * 
 * @module
 * @param {stix_type} The name of the stix object.
 * @param {showText} if showText is included as a parameter value, than the text display will show
 * @param {png} if png is included as a parameter value, then the png icon will be displayed.
 * @returns {string} The full URL for the basic version of the .svg
 */
export default Ember.Helper.helper(function(params) {
    let basicValue = params.indexOf("showText") === -1 ? '-b' : '',
        stixType = params[0],
        ext = params.indexOf("png") === -1 ? 'svg' : "png";
    if (ext === "png") {
        basicValue = '';
    }

   /* 
        fix to issue #77
        The report page lists icons that related to each of the report types. 
        however, if a report type does not have a graphic, then its a broken link  
   */
    let path  = "/cti-stix-ui/stix-icons/" + ext + "/" + stixType + basicValue + "." + ext;
    Ember.$.ajax({
        url: path,
        async: false,
        error: () => {
             path = '/cti-stix-ui/stix-icons/svg/ic_help_outline_black_24px.svg';
        }

    });
    return Ember.String.htmlSafe(path);
});

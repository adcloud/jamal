/* SVN FILE: $Id: jamal.js 22 2007-06-28 00:09:37Z teemow $ */
/**
 * To quote Dave Cardwell: 
 * Built on the shoulders of giants:
 *   * John Resig      - http://jquery.com/
 *
 * Jamal :  Javascript MVC Assembly Layout <http://jamal.moagil.de/>
 * Copyright (c)    2006, Timo Derstappen <http://teemow.com/>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @copyright        Copyright (c) 2006, Timo Derstappen
 * @link            
 * @package          jamal
 * @subpackage       jamal.core
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * Jamal model constructor
 *
 * @name jamal.model
 * @type Object
 * @param String model Name of the constructed model
 * @cat core
 */
/**
 * Inherit a model from the jamal app model.
 * 
 * @example $j.m({Foo:{
 *     getBar: function(){
 *         $j.json('/test/', function(response){
 *         });
 *     }
 * });
 * @desc Merge model into jamal.m map and inherit everything from jamal.model
 *
 * @name $j.m
 * @param Object model The model that will be merged into the model map.
 * @type Object
 * @cat core
 * @todo merge jamal.m and jamal.model with function overloading
 */
jamal.m = jamal.fn.m = function(model) {
    if(typeof model === 'object') {
        var inherited;
        for (var i in model) {
            // get the jamal model
            inherited = new jamal.fn.m(i);
            
            // inherit the new model
            jamal.extend(inherited, model[i]);
            model[i] = inherited;
        }
        jamal.extend(jamal.fn.m, model);
    } else {
        this.name = model;
    }
};

jamal.fn.extend(jamal.fn.m.prototype, {
    /**
     * A wrapper for jQuerys getJSON
     *
     * We need a wrapper here to add the global callback. Please use jamal.json
     * in your controllers/models.
     *
     * @example jamal.model.json('/test/', 
     *   function(response) {
     *     jamal.dir(response.data);
     *   });
     *
     * @public
     * @name json
     * @param String url The URL of the page to load.
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     * @todo this method should be moved to a general jamal model class
     */
    json: function(url, callback) {
        model = this;
        jQuery.getJSON(url, null, function(response) {
            model.callback(response, callback);
        });
    },

    /**
     * A general callback for all the model
     *
     * Jamal expects a JSON response like 
     * { 
     *   data: {}
     * }
     *
     * @example jamal.model.callback(response, 
     *   function(response){
     *     jamal.dir(response.data)
     *   });
     *
     * @public
     * @name callback
     * @param Object response JSON response from the server.
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    callback: function(response, callback){
        if (callback) {
            callback(response);
        }
    }
});


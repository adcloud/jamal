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
     * A wrapper for jQuerys ajax
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
        var model = this;
        
        var settings = {
            type: 'GET',
            dataType: 'json',
            url: url,
            beforeSend: function(xhr){
                jamal.ajaxSend(xhr);
                return model.beforeSend();
            },
            error: function(xhr, type, exception){
                if(model.error()) {
                    jamal.error('Ajax error: ' + type, exception);
                }
            },
            complete: function(xhr, result){
                model.complete(xhr, result);
            },
            success: function(response) {
                jamal.ajaxSuccess(response);
                if(model.callback(response)) {
                    if(callback) {
                        callback(response);
                    }
                }
            }
        };
        
        jQuery.ajax(settings);
    },
    
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
    post: function(url, data, callback) {
        var model = this;
        
        var settings = {
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,
            beforeSend: function(xhr){
                jamal.ajaxSend(xhr);
                return model.beforeSend();
            },
            error: function(xhr, type, exception){
                if(model.error()) {
                    jamal.error('Ajax error: ' + type, exception);
                }
            },
            complete: function(xhr, result){
                model.complete(xhr, result);
            },
            success: function(response) {
                jamal.ajaxSuccess(response);
                if(model.callback(response)) {
                    if(callback) {
                        callback(response);
                    }
                }
            }
        };
        
        jQuery.ajax(settings);
    },    
    
    /**
     * A pre-callback to modify the XMLHttpRequest object before it is sent. 
     * Use this to set custom headers etc. The XMLHttpRequest is passed as the 
     * only argument.
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeSend
     * @cat model
     */
    beforeSend: function(xhr){
        return true;
    },
    
    /**
     * A function to be called when the request finishes (after success and 
     * error callbacks are executed). The function gets passed two arguments: 
     * The XMLHttpRequest object and a string describing the type of success 
     * of the request. 
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name complete
     * @cat model
     */
    complete: function(xhr, result){
        return true;
    },
    
    /**
     * A function to be called if the request fails. The function gets passed 
     * three arguments: The XMLHttpRequest object, a string describing the type 
     * of error that occurred and an optional exception object, if one occurred.
     *
     * @public
     * @name error
     * @cat model
     */
    error: function(xhr, type, exception){
        return true;
    },
    
    /**
     * A general callback for the model
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
     * @cat model
     */
    callback: function(response){
        if(response.error) {
            var error = response.error;
            $j.error(error.error + ' (' + error.code + '): ' + error.description + ' in ' + error.file);
            $j.log('Stack:');
            $j.log(error.stack);
            $j.log('Context:');
            $j.log(error.context);
            $j.log('Listing:');
            $j.dir(error.listing);
            return false;
        }
        return response;
    }
});

/**
 * Bind the jamal ajax callbacks to the jQuery event handling
 *
 * @example jamal.ajaxSend(function() { alert("Hello"); });
 *
 * @name event
 * @type jamal
 * @param Function fn A function to bind to the jamal event
 * @cat model
 */
(function() {
    // Handle ajax event binding
    jamal.fn.ajaxSend = function(f){
        return typeof f === 'function' ? jQuery().bind('j_ajaxSend', f) : jQuery.event.trigger('j_ajaxSend', [f]);
    };
    jamal.fn.ajaxSuccess = function(f){
        return typeof f === 'function' ? jQuery().bind('j_ajaxSuccess', f) : jQuery.event.trigger('j_ajaxSuccess', [f]);
    };
})();


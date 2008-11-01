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
     * Basic ajax settings for a model
     *
     * @private
     * @name settings
     */
    settings: function(){
        var model = this;
        
        return {
            dataType: 'json',
            error: function(xhr, type, exception){
                if(model.error()) {
                    var status = xhr.status + ' ' + xhr.statusText;
                    jamal.error('Ajax - ' + type + ' (' + status + ')', exception);
                }
            },
            success: function(response) {
                
                jamal.ajaxSuccess(response);
                if(model.callback(response)) {
                    if(this.callback) {
                        this.callback(response);
                    }
                }
            }
        };
    },
    
    /**
     * Get a models url
     *
     * @private
     * @name getUrl
     * @cat model
     */
    getUrl: function() {
        return '/' + jamal.Inflector.pluralize(this.name) + '/' + this.id;
    },
    
    /**
     * Gets a model
     *
     * @example jamal.model.json( 
     *   function(response) {
     *     jamal.dir(response.data);
     *   }
     * );
     *
     * @public
     * @name find
     * @param int id Id of the model
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    get: function(action, callback) {
        var model = this;
        var settings = this.settings();

        settings.type = 'GET';
        settings.url = action;
        
        settings.beforeSend = function(xhr) {
            jamal.ajaxSend(xhr);
            return model.beforeFind();
        };
        
        settings.callback = function(result) {
            result = model.afterFind(result);
            callback(result);
        };
        
        jQuery.ajax(settings);
    },
    /**
     * Backwards compatibility
     *
     * @public
     * @deprecated
     * @name json
     * @param int id Id of the model
     * @param Function callback A function to be executed whenever the data is loaded.
     */
    json: this.read,
    
    /**
     * Saves a model
     *
     * @example jamal.model.save(1, {name: 'John', lastname:'Doe'}, 
     *   function(response) {
     *     jamal.dir(response.data);
     *   });
     *
     * @public
     * @name save
     * @param int id Id of the model
     * @param object data Data that should be saved
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    save: function(action, data, callback) {
        var model = this;
        model.data = data;
        var settings = this.settings();
        
        settings.type = 'POST';
        settings.url = action;
        
        settings.beforeSend = function(xhr) {
            jamal.ajaxSend(xhr);
            this.data = model.beforeSave(model.data);
            return this.data;
        };
        
        settings.callback = function(response) {
            if(model.afterSave(response)) {
                callback.call($j.current, response);
            }
        };
        
        jQuery.ajax(settings);
    },
    
    /**
     * Backwards compatibility
     *
     * @deprecated
     * @public
     * @name post
     * @param String url The URL of the page to load.
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    post: this.save,
    
    /**
     * Deletes a model
     * 
     * @example jamal.model.json('/test/', 
     *   function(response) {
     *     jamal.dir(response.data);
     *   });
     *
     * @public
     * @name delete
     * @param int id Id of the model
     * @param Function callback A function to be executed whenever the model is delete.
     * @cat model
     */
    delete: function(id, callback) {
        var model = this;
        model.id = id;
        var settings = this.settings();
        
        settings.type = 'DELETE';
        settings.url = this.getUrl();
        
        settings.beforeSend = function(xhr) {
            jamal.ajaxSend(xhr);
            return model.beforeDelete();
        };
        
        settings.callback = function(result) {
            model.afterDelete(result);
        };
        
        jQuery.ajax(settings);
    },    

    /**
     * Callback to modify the data which should be saved
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeSave
     * @param object data
     * @cat model
     */
    beforeSave: function(data){
        return data;
    },
    
    /**
     * Callback before an object is requested
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeFind
     * @cat model
     */
    beforeFind: function(){
        return true;
    },

    /**
     * Callback before an object is deleted
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name beforeDelete
     * @cat model
     */
    beforeDelete: function(){
        return true;
    },

    /**
     * Callback after data was saved
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name afterSave
     * @cat model
     */
    afterSave: function(result){
        return result;
    },

    /**
     * Callback after data was retrieved
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name afterSave
     * @cat model
     */
    afterFind: function(result){
        return result;
    },

    /**
     * Callback after an model was deleted
     *
     * Overwrite this method in your own (app)model
     *
     * @public
     * @name afterDelete
     * @cat model
     */
    afterDelete: function(result){
        return result;
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
        return true;
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


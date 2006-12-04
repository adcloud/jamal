/* SVN FILE: $Id$ */
/**
 * Short description for file.
 *
 * This is the Jamal core. Heavily inspired by jQuery's architecture. 
 *
 * To quote Dave Cardwell: 
 * Built on the shoulders of giants:
 *   * John Resig      - http://jquery.com/
 *
 * jQuery is required
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

// Map the Jamal namespace to the '$$' one
var $$ = Jamal;

Jamal.fn = Jamal.prototype = {
	/**
	 * The current SVN version of Jamal.
	 *
	 * @private
	 * @property
	 * @name jamal
	 * @type String
	 * @cat Core
	 */
	jamal: "$Revision$",
    
    here: '',
    name: '',
    action: '',

    params: {},
    
    dispatch: function(routes) {
        return $$.Dispatcher.init(routes);
    },
    
    controller: function (uri) {
        if (uri) {
            uri_splitted = uri.split("/")
            controller = uri_splitted[0];
            action = uri_splitted[1];
            try {
                eval('controller = new ' + controller + 'Controller();');
                eval('controller.'+action+'();');
            } catch(e) {
                if (debug) {
                    throw e;
                }
                return false;
            }
            return controller;
        } else {
            return false;
        }
    },
    
    model: {}
    
};

/**
 * Dispatcher
 *
 */
Jamal.Dispatcher = {
    getPage: function() {
        if (page) {
            return this.page;
        } else {
            return $$.Dispatcher.fixUrl(location.pathname);
        }
    },

    init: function() {
        action = routes[this.page];
        
        if (!action) {
            for (var route in routes) {
                page = this.page;
                if (!action) {
                    // fix route
                    fixed_route = this._fixPath(route);
                    
                    // check fixed route
                    if (fixed_route == page) {
                        action = routes[route];
                    } else {
                        // check for wildcards
                        if (fixed_route.search(/(\/\*\/)/) != -1) {
                            fixed_route = fixed_route.split('/');
                            page = this.page.split('/');
                            star = 0;
                            
                            // find a wildcard
                            fixed_route.forEach(function(element, index, array) {
                                if (element == '*') {
                                    star = index;
                                }
                            });
                            if (star != 0) {
                                // found a wildcard
                                page[star] = '*';
                                page = this._fixPath(page.join('/'));
                                action = routes[page];
                                
                                if (!action) {
                                    // check fixed wildcard route
                                    fixed_route = fixed_route.join('/');
                                    if (fixed_route == page) {
                                        action = routes[route];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.controller = this._loadController(action);
    },
    
    fixUrl: function(url) {
        url = url.toLowerCase();
        if (url.search(/\/$/) == -1) {
            url = url + '/';
        }
        return url;
    }
};

/**
 * Extends the Jamal object itself. Can be used to add both static
 * functions and plugin methods.
 * 
 * @example $.fn.extend({
 *   check: function() {
 *     this.each(function() { this.checked = true; });
 *   ),
 *   uncheck: function() {
 *     this.each(function() { this.checked = false; });
 *   }
 * });
 * $("input[@type=checkbox]").check();
 * $("input[@type=radio]").uncheck();
 * @desc Adds two plugin methods.
 *
 * @private
 * @name extend
 * @param Object obj
 * @type Object
 * @cat Core
 */

/**
 * Extend one object with another, returning the original,
 * modified, object. This is a great utility for simple inheritance.
 * 
 * @example var settings = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * Jamal.extend(settings, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 *
 * @test var settings = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" };
 * var options =     { xnumber2: 1, xstring2: "x", xxx: "newstring" };
 * var optionsCopy = { xnumber2: 1, xstring2: "x", xxx: "newstring" };
 * var merged = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "x", xxx: "newstring" };
 * Jamal.extend(settings, options);
 * isSet( settings, merged, "Check if extended: settings must be extended" );
 * isSet ( options, optionsCopy, "Check if not modified: options must not be modified" );
 *
 * @name $.extend
 * @param Object obj The object to extend
 * @param Object prop The object that will be merged into the first.
 * @type Object
 * @cat Javascript
 */
Jamal.extend = function(obj,prop) {
	if ( !prop ) { prop = obj; obj = this; }
	for ( var i in prop ) obj[i] = prop[i];
	return obj;
};

Jamal.extend({
	/**
	 * @private
	 * @name init
	 * @type undefined
	 * @cat Core
	 */
	init: function(){
		Jamal.initDone = true;
    }
});


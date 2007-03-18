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

/**
 * Create the jamal Object
 *
 * @public
 * @name jamal
 * @cat core
 */
var jamal = {
    /* Properties */

	/**
	 * The current version of jamal.
	 *
	 * @private
	 * @property
	 * @name version
	 * @type String
	 * @cat core
	 */
    version: '0.3-5',

	/**
	 * Defines the root element with the jamal configuration class. This is 
     * necessary due to performance. jQuery is a lot faster in finding classes
     * when it knows the holding element.
	 *
	 * @private
	 * @property
	 * @name root
	 * @type String
	 * @cat core
	 */
    root: 'body',

	/**
	 * Name of the current controller.
	 *
	 * @public
	 * @property
	 * @name name
	 * @type String
	 * @cat core
	 */
    name: '',

	/**
	 * Name of the current action.
	 *
	 * @public
	 * @property
	 * @name action
	 * @type String
	 * @cat core
	 */
    action: '',

	/**
	 * Current controller object.
	 *
	 * @public
	 * @property
	 * @name controller
	 * @type Object
	 * @cat core
	 */
    controller: {},

	/**
	 * Map of all available models.
	 *
	 * @public
	 * @property
	 * @name models
	 * @type Map
	 * @cat core
	 */
    models: {},

	/**
	 * Map of all available views.
	 *
	 * @public
	 * @property
	 * @name views
	 * @type Map
	 * @cat core
	 */
    views: {},

	/**
	 * Map of all available controllers.
	 *
	 * @public
	 * @property
	 * @name controllers
	 * @type Map
	 * @cat core
	 */
    controllers: {},
    
	/**
	 * Debug flag to give more information about jamal in the console.
	 *
	 * @private
	 * @property
	 * @name debug
	 * @type Boolean
	 * @cat core
	 */
    debug: false,

    /* Methods */
    
	/**
     * Method description
	 *
	 * @example jamal.start();
	 * @result jamal.controller == [ new Controller ]
	 *
	 * @public
	 * @name start
	 * @type jamal
	 * @cat core
	 */
    start: function() {
        if (this.configure()) {
            this.log('Starting the Jamal application (Version: '+this.version+')...');
            this.log('Controller: ' + this.name);
            this.log('Action: ' + this.action);
            if (this.debug === true) {
                window.console.time('Timing');
            }
            this.load();
            if (this.debug === true) {
                window.console.timeEnd('Timing');
            }
            if ($.browser.mozilla) {
                this.log('Jamal size: '+this.toSource().length);
            }
        }
    },

	/**
     * Log messages on the browser console. Firebug is recommended.
	 *
	 * @example jamal.log('current controller: ' + this.controller);
	 *
	 * @public
	 * @name start
	 * @type debug
     * @param String message The message to be displayed on the console
     * @param String message (optional) More messages to be displayed on the console
	 * @cat log
	 */
    log: function(message) {
        if (this.debug === true) {
            var log = '';
            for (var i=0; i<arguments.length; i++) {
                log += arguments[i];
                if (i !== (arguments.length-1)) {
                    log += ', ';
                }
            }
            window.console.log(log);
        }
    },

	/**
     * Method description
	 *
	 * @example jamal.error('Controller not found!');
	 *
	 * @public
	 * @name start
	 * @type debug
     * @param String message Error message to be displayed on the console
     * @param Object e (optional) Error object to display the original error
	 * @cat log
	 */
    error: function(message) {
        this.log('Jamal Error: '+message);
        if (arguments.length>1) {
            e = arguments[1];
            this.log(e.name+': '+e.message);
        }
    },

	/**
     * Method description
	 *
	 * @example jamal.dir(obj);
	 * @result [ { prop1: val1, prop2: val2 } ]
	 *
	 * @public
	 * @name dir
	 * @type debug
     * @param Object obj The object which should be logged on the console.
	 * @cat log
	 */
    dir: function(obj) {
        if (this.debug === true) {
            window.console.dir(obj);
        }
    },

	/**
     * Method description
	 *
	 * @example jamal.configure();
	 * @before <body class="jamal {controller:'Tests',action:'index'}">
     * @result [ jamal.controller = 'Tests', jamal.action = 'index' ]
     *
	 * @private
	 * @name configure
	 * @type jamal
	 * @cat core
	 */
    configure: function() {
        data = $(this.root+'.jamal').data();
        if (typeof(data) !== 'object') {
            this.debug = true;
            jamal.error('No configuration found!');
            return false;
        } else {
            this.name = data.controller;
            this.action = data.action;
            this.debug = data.debug;
            return true;
        }
    },

	/**
     * Method description
	 *
	 * @example jamal.load();
	 *
	 * @public
	 * @name load
	 * @type mvc
	 * @cat core
	 */
    load: function () {
        try {
            this.controller = eval('this.controllers.'+this.name);
        } catch(e) {
            this.error('Controller not found!', e);
            return false;
        }
        try {
            eval('this.controller.'+this.action+'();');
        } catch(e) {
            this.error('Action not found!', e);
            return false;
        }
        return true;
    },
    
    /**
     * Redirect
     *
     * @example jamal.redirect();
     *
     * @public
     * @name redirect
     * @type jamal
     * @cat session
     */
    redirect: function() {
        location.replace(location.href);
    },

	/**
     * Method description
	 *
	 * @example jamal.json('/test/', 
     *   function(response) {
     *     jamal.dir(response.data);
     *   });
	 *
	 * @public
	 * @name json
	 * @type json
     * @param String url The URL of the page to load.
     * @param Function callback A function to be executed whenever the data is loaded.
	 * @cat model
     * @todo this method should be moved to a general jamal model class
	 */
    json: function(url, callback) {
        $.getJSON(url, null, function(response) {
            jamal.callback(response, callback);
        });
    },

	/**
     * A general callback for the application
     *
     * Jamal expects a JSON response like 
     * { 
     *   session_timeout: false,
     *   data: {}
     * }
	 *
	 * @example jamal.callback(response, 
     *   function(response){
     *     jamal.dir(response.data)
     *   });
	 *
	 * @public
	 * @name callback
	 * @type json
     * @param Object response JSON response from the server.
     * @param Function callback A function to be executed whenever the data is loaded.
	 * @cat model
     * @todo this method should be moved to a general jamal model class
	 */
    callback: function(response, callback){
        if (response.session_timeout) {
            // session timeout
            jamal.redirect();
        } else {
            if (callback) {
                callback(response);
            }
        }
    }
};


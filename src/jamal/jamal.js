/* SVN FILE: $Id$ */
/**
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
 * Create a new jamal Object
 *
 * @constructor
 * @private
 * @name jamal
 * @cat core
 */
var jamal = function() {
    // If the context is global, return a new object
    if (window == this) {
        return new jamal();
    }
    
    return this.configure();
};

/**
 * Create the jamal core prototype
 *
 * @public
 * @name jamal
 * @cat core
 */
jamal.fn = jamal.prototype = {
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
    version: '0.4',

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
    current: {},

    /**
     * Map of all available models.
     *
     * @public
     * @property
     * @name m
     * @type Map
     * @cat core
     */
    m: {},

    /**
     * Map of all available views.
     *
     * @public
     * @property
     * @name v
     * @type Map
     * @cat core
     */
    v: {},

    /**
     * Map of all available controllers.
     *
     * @public
     * @property
     * @name c
     * @type Map
     * @cat core
     */
    c: {},

    /**
     * Jamal configuration passed from the root elements class
     *
     * @public
     * @property
     * @name config
     * @type Object
     * @cat core
     */
    config: {},

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

    /**
     * Jamal events
     *
     * @public
     * @property
     * @name events
     * @type Object
     * @cat core
     */
    events: {},

    /* Methods */
    
    /**
     * Method description
     *
     * @example jamal.start();
     * @result jamal.current == [ new Controller ]
     *
     * @public
     * @name start
     * @type jamal
     * @cat core
     */
    start: function() {
        this.log('Starting the Jamal application (Version: '+this.version+')...');
        this.log('Browser:');
        this.dir(jQuery.browser);
        this.log('Controller: ' + this.name);
        this.log('Action: ' + this.action);
        if (this.debug === true) {
            window.console.time('Timing');
        }
        var started = this.load();
        if (this.debug === true) {
            window.console.timeEnd('Timing');
        }
        if (jQuery.browser.mozilla) {
            this.log('Jamal size: '+this.toSource().length+' Chars');
        }
        
        // capture errors
        jQuery(window).error(function(message, file, line) {
            var e = {'name':'window.onerror',
                     'message':message,
                     'file':file,
                     'line':line,
                     'stack':''
                    };
            jamal.fn.error('Window error captured!', e);
            return true;
        });
                    
        return started;
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
     * Log jamal errors to the console
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
        if (this.debug === true) {
            if (arguments.length>1) {
                e = arguments[1];
                window.console.error('Jamal Error: '+message, e);
                this.log(e.name+': '+e.message);
                this.dir(e);
                this.log('Stack: ' + e.stack);
            } else {
                window.console.error('Jamal Error: '+message);
            }
        }
    },
    
    /**
     * Log objects to the console
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
     * Try to configure jamal
     *
     * Currently it is expected that there is a dom element with metadata
     * attached. This data is read via jQuery's metadata plugin.
     *
     * This makes it very easy to use jamal with e.g. CakePHP. Just add
     * <body class="jamal {controller:'<?php echo $this->name; ?>',action:'<?php echo $this->action; ?>'}"> 
     * to your default layout. Now you only need to create and include the 
     * corresponding js files.
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
        try {
            var data = jQuery(this.root+'.jamal').data();
        } catch(e) {
            this.debug = true;
            this.error('jQuery Metadata Plugin failed to read the configuration. '+
                       'Probably there is no class="jamal {controller:\'example\',action:\'index\'}" in your markup!', e);
        }
        
        if (typeof(data) !== 'object') {
            this.debug = true;
            this.error('No configuration found!');
            return false;
        } else {
            this.config = data;
            this.name = data.controller;
            this.action = data.action;
            this.debug = data.debug;
            return true;
        }
    },

    /**
     * Try to load the controller action 
     *
     * @example jamal.load();
     *
     * @public
     * @name load
     * @type mvc
     * @cat core
     */
    load: function () {
        var loaded = false;
        if (typeof this.c[this.name] === 'object') {
            
            // controller
            try {
                this.current = this.c[this.name];
            } catch(e) {
                this.error('Controller error!', e);
            }
            
            // callback before the action
            this.current.beforeAction();
            
            // components
            if(this.current.components) {
                for(var i in this.current.components) {
                    try {
                        this[this.current.components[i]]();
                    } catch(e) {
                        this.error(this.current.components[i]+' component error!', e);
                    }
                }
            }
            
            // action
            if (typeof this.c[this.name][this.action] === 'function') {
                try {
                    this.current[this.action]();
                    loaded = true;
                } catch(e) {
                    this.error('Action couldn\'t be started!', e);
                }
            } else {
                this.log('Action not found!');
            }
            
            // callback after the action
            this.current.afterAction();
        } else {
            this.log('Controller not found!');
        }
        return loaded;
    },

    /**
     * Run this function to give control of the $j variable back
     * to whichever library first implemented it. This helps to make 
     * sure that jamal doesn't conflict with the $j object
     * of other libraries.
     *
     * By using this function, you will only be able to access jamal
     * using the 'jamal' variable. For example, where you used to do
     * $j.json("/example/action"), you now must do jamal.json("/example/action").
     *
     * @example jamal.noConflict();
     * // Do something with jamal
     * jamal.json("/example/action");
     * @desc Maps the original object that was referenced by $j back to $j
     *
     * @name noConflict
     * @type undefined
     * @cat core 
     */
    noConflict: function() {
        if (jamal._$) {
            $j = jamal._$j;
        }
        return jamal;
    }
};

/**
 * Extend one object with one or more others, returning the original,
 * modified, object. This is a great utility for simple inheritance.
 * 
 * @example var settings = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * jamal.extend(settings, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 * @desc Merge settings and options, modifying settings
 *
 * @example var defaults = { validate: false, limit: 5, name: "foo" };
 * var options = { validate: true, name: "bar" };
 * var settings = jamal.extend({}, defaults, options);
 * @result settings == { validate: true, limit: 5, name: "bar" }
 * @desc Merge defaults and options, without modifying the defaults
 *
 * @name $.extend
 * @param Object target The object to extend
 * @param Object prop1 The object that will be merged into the first.
 * @param Object propN (optional) More objects to merge into the first
 * @type Object
 * @cat JavaScript
 */
jamal.extend = jamal.fn.extend = function() {
    // copy reference to target object
    var target = arguments[0], a = 1;

    // extend jamal itself if only one argument is passed
    if (arguments.length == 1) {
        target = this;
        a = 0;
    }
    var prop;
    while ((prop = arguments[a++]) != null) {
        // Extend the base object
        for (var i in prop) {
            target[i] = prop[i];
        }
    }

    // Return the modified object
    return target;
};


/* SVN FILE: $Id: jamal.js 18 2007-06-13 09:07:32Z teemow $ */
/**
 * To quote Dave Cardwell: 
 * Built on the shoulders of giants:
 *   * John Resig      - http://jquery.com/
 *
 * Jamal :  Javascript MVC Assembly Layout <http://jamal-mvc.com/>
 * Copyright (c)    2007, Timo Derstappen <http://teemow.com/>
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @filesource
 * @copyright        Copyright (c) 2007, Timo Derstappen
 * @link            
 * @package          jamal
 * @subpackage       jamal.session
 * @since            Jamal v 0.4
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * Jamal session component
 *
 * This requires the modal component.
 *
 * @public
 * @name jamal
 * @cat session
 */
jamal.fn.extend({
    /* Constructor */
	/**
	 * Start the jamal session handling
	 *
     * @example jamal.session();
     * @desc This starts the jamal session handling
	 * @public
	 * @name session
	 * @type Object
	 * @cat session
	 */
     session: function(){
         if(this.config.session) {
             this.log('Session activated');
             this.session.active = true;
             this.session.since = 0;
             this.session.check();
             
             return true;
         }
         return false;
     }
}); 

jamal.fn.extend(jamal.fn.session, {
	/**
	 * Flag for server-side session check
	 *
	 * @public
	 * @property
	 * @name jamal.session.active
	 * @type Boolean
	 * @cat session
	 */
    active: false,
    
	/**
	 * Minutes a session lasts. After this time the user gets logged out and
     * is warned by a notification.
	 *
	 * @public
	 * @property
	 * @name jamal.session.timeout
	 * @type Number
	 * @cat session
	 */
    timeout: 30, // minutes

	/**
	 * Seconds between server-side session checks.
	 *
	 * @public
	 * @property
	 * @name jamal.session.freq
	 * @type Number
	 * @cat session
	 */
    freq: 60, // seconds

	/**
	 * This holds the time of the current session.
	 *
	 * @private
	 * @property
	 * @name jamal.session.since
	 * @type Number
	 * @cat session
	 */
    since: 0, // minutes
    
	/**
     * Check the session on the server side
	 *
	 * @example jamal.session.check();
	 *
	 * @private
	 * @name jamal.session.check
	 * @type Function
	 * @cat session
	 */
    check: function() {
        if (this.since < this.timeout) {
            if (this.since > 0) {
                jamal.current.m.json('/session/');
            }
            this.since += this.freq/60;
            window.setTimeout("jamal.session.check();", this.freq*1000);
        } else {
            this.destroy();
        }
    },
    
	/**
     * Kills a jamal session
     *
     * Calls the url /logout/ to kill the session on the server side. It is 
     * expected to get back some information to be displayed in a modal dialog
	 *
	 * @example jamal.session.destroy();
     * @desc Destroys the current session 
	 *
	 * @private
	 * @name destroy
	 * @type Function
	 * @cat session
	 */
    destroy: function() {
        jamal.current.m.json('/logout/', function(response) {
            jamal.session.active = false;
            jamal.log('Session killed');
            
            if (response.redirect) {
                jamal.session.redirect();
            }
            
            jamal.modal(response.content);
            jamal.session._callback();
        });
    },
    
    /**
     * Empty callback to customize the login screen handling
     *
     * @example jamal.session.callback = function() {
     *     $('#login').focus();
     *     $('form').form(function(response) {
     *         alert('logged in');
     *     });
     * };
     * 
     * @public
     * @name jamal.session.callback
     * @type Function
     * @cat session
     */
    _callback: function() {
        return;
    },
     
    /**
     * Reloads the current page
     *
     * @example jamal.session.reload();
     * @desc Loads the current page again (full request, no xhr)
     *
     * @public
     * @name reload
     * @type jamal
     * @cat session
     */
    reload: function() {
        window.location.replace(window.location.href);
    },
    
    /**
     * The session callback for the server communication
     *
     * If the server reports a session timeout jamal reloads the current
     * page.
     *
     * Jamal expects a JSON response like 
     * { 
     *   session: false,
     *   data: {}
     * }
     *
     * @example jamal.callback(response, 
     *   function(response){
     *     jamal.dir(response.data)
     *   });
     *
     * @public
     * @name _callback
     * @type session
     * @param Object response JSON response from the server.
     * @param Function callback A function to be executed whenever the data is loaded.
     * @cat model
     */
    callback: function(response, callback){
        if (!response.session) {
            // session timeout
            this.reload();
        } else {
            this.reset();
            if (callback) {
                callback(response);
            }
        }
    },

	/**
     * Reset jamal's session timer
	 *
	 * @example jamal.reset();
	 *
	 * @private
	 * @name reset
	 * @type jamal
	 * @cat session
	 */
    reset: function() {
        this.since = 0;
    }    
});


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

var jamal = {
    version: '0.2-4',
    start: function() {
        var start_time = new Date();
        var start_mseconds = start_time.getTime();
        this.configure();
        this.log('Starting the Jamal application (Version: '+this.version+')...');
        this.log('Controller: ' + this.controller);
        this.log('Action: ' + this.action);
        this.load();
        var end_time = new Date();
        var end_mseconds = end_time.getTime();
        this.log('This took ' + (end_mseconds-start_mseconds) + ' milliseconds');
        this.log('Jamal size: '+this.toSource().length);
    },
    log: function(message) {
        if (jamal.debug === true && $.browser.mozilla) {
            window.console.log(message);
        }
    },
    error: function(message) {
        if (jamal.debug === true && $.browser.mozilla) {
            this.log('Error: '+message);
            if (arguments.length>1) {
                e = arguments[1];
                this.log(e.name+': '+e.message);
            }
        }
    },
    configure: function() {
        data = $('.jamal').data();
        this.controller = data.controller;
        this.action = data.action;
        this.debug = data.debug;
    },
    load: function () {
        try {
            this.controller = eval('this.controllers.'+this.controller);
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
    models: {},
    views: {},
    controllers: {}
};


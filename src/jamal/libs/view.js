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
 * Jamal view constructor
 *
 * @name jamal.view
 * @type Object
 * @param String view Name of the constructed view
 * @cat view
 */
/**
 * Inherit a view from the jamal app view.
 * 
 * @example $j.v({Foos:{
 *     removeMessage: function(){
 *         $('div.message').remove();
 *     }
 * });
 * @desc Merge view into jamal.v map and inherit everything from jamal.view
 *
 * @name $j.v
 * @param Object view The view that will be merged into the view map.
 * @type Object
 * @cat core
 * @todo merge jamal.v and jamal.view with function overloading
 */
jamal.v = jamal.fn.v = function(view) {
    if(typeof view === 'object') {
        var inherited;
        for (var i in view) {
            inherited = new jamal.fn.v(i);
            jamal.extend(inherited, view[i]);
            view[i] = inherited;
        }
        jamal.extend(jamal.fn.v, view);
    } else {
        this.name = view;
    }
};

jamal.fn.extend(jamal.fn.v.prototype, {
    /**
     * Add a spinner to an element
     * 
     * @name addSpinner
     * @param Mixed obj Element / jQuery object / css selector of an dom element which should contain the spinner
     * @cat view
     */
    addSpinner: function(obj) {
        // create spinner
        var spinner;
        try {
            spinner = document.createElement('div');
            spinner.className = 'spinner';
        } catch( ex ) {
            jamal.error( 'Cannot create <' + tag + '> element:\n' +
                args.toSource() + '\n' + args );
            spinner = null;
        }
        $(obj).prepend(spinner);
    },
    
    /**
     * Remove all spinner
     * 
     * @name removeSpinner
     * @cat view
     */
    removeSpinner: function() {
        $('div.spinner').remove();
    },
    
    /**
     * Add a (success) message at the top of the current page
     * 
     * @name addMessage
     * @param String message The message that should be displayed
     * @cat view
     */
    addMessage: function(message){
        $('#content').prepend(message);
    },
    
    /**
     * Remove all messages and errors
     *
     * @name removeMessages
     * @cat view
     */
    removeMessages: function() {
        $('div.error').remove();
        $('div.message').remove();
    },
    
    /**
     * Add an error message
     *
     * @name addError
     * @param String message The error message that should be displayed
     * @param Mixed obj Element / jQuery object / css selector of an dom element which should contain the error message
     */
    addError: function(message, obj) {
        $('div.error', obj).remove();
        $(obj).prepend(message);
        $('div.error', obj).show();
    },
    
    /**
     * Decode HTML entities
     *
     * @example jamal.view.decode_html()
     * 
     * @public
     * @name decode_html
     * @type jamal
     * @cat view
     */
    decode_html: function(str) {
        if (typeof str === 'string') {
            var div = document.createElement('div');
            div.innerHTML = str.replace(/<\/?[^>]+>/gi, '');
            return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
        } else {
            return '';
        }
    }
});


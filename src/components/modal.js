/* SVN FILE: $Id: jamal.js 18 2007-06-13 09:07:32Z teemow $ */
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
 * @subpackage       jamal.modal
 * @since            Jamal v 0.4
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * Jamal modal component
 *
 * This component offers a modal dialog for jamal applications. eg. if your
 * session timed out you can display a modal login form
 *
 * @public
 * @name jamal
 * @cat modal
 */
jamal.fn.extend({
     /**
	 * Flag to indicate if there is currently a notification on the user screen.
	 *
	 * @private
	 * @property
	 * @name notification
	 * @type Boolean
	 * @cat modal
	 */
    notification: false,

	/**
     * Create a modal dialog
	 *
	 * @example jamal.modal('<h1>message</h1>');
	 *
	 * @private
	 * @name modal
	 * @type jamal
     * @param String content Content that will be displayed in the modal window
	 * @cat modal
	 */
    modal: function(content) {
        if (content) {
            if (!jamal.notification) {
                // deactivate screen
                $('body').css('overflow', 'hidden');
                if ($.browser.msie) {
                    $('select').hide();
                }
                $('body').after('<div id="jamal_overlay"></div>')
                         .prepend('<div id="jamal_modal"><div class="jamal_size">'+content+'</div></div>');
                
                jamal.notification = true;
            } else {
                $('div.jamal_size').html(content);
            }
            jamal.resize();
            return true;
        } else {
            return false;
        }
    }
});

jamal.fn.extend(jamal.fn.modal, {
	/**
     * Resize the current modal dialog
	 *
	 * @example jamal.modal.resize();
	 *
	 * @private
	 * @name resize
	 * @type jamal
	 * @cat modal
	 */
    resize: function() {
        // width
        $('#jamal_modal').css('width', $('div.jamal_size').width()+'px');
        
        var body = $('body').width();
        var modal = $('#jamal_modal').width();
        $('#jamal_modal').css('margin-left', (body/2-modal/2)+'px');
        
        // height
        $('#jamal_modal').css('height', $('div.jamal_size').height()+'px');
        if ($.browser.msie) {
            var offset = document.documentElement.scrollTop;
            body = document.documentElement.clientHeight;
        } else {
            var offset = window.pageYOffset;
            body = window.innerHeight;
        }
        modal = $('#jamal_modal').height();
        $('#jamal_modal').css('margin-top', (offset + body/2 - modal/2) +'px');
    },
    
	/**
     * Close the current dialog
	 *
	 * @example jamal.close();
	 *
	 * @private
	 * @name close
	 * @type jamal
	 * @cat modal
	 */
    close: function() {
        if (jamal.notification) {
            $('#jamal_modal').fadeOut('slow');
            $('#jamal_overlay').remove();
            $('body').css('overflow', 'auto');
            if ($.browser.msie) {
                $('select').show();
            }
            jamal.notification = false;
        }
    }
});

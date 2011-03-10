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
 * @subpackage       jamal.modal
 * @since            Jamal v 0.4
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
 * @deprecated
 */
jamal.fn.extend({
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
    modal: function(content, closetext) {
        if (content) {
            if (!jamal.modal.active) {
                // deactivate screen
                jQuery('html, body').css('overflow', 'hidden');
                if (jQuery.browser.msie) {
                    jQuery('select').hide();
                }
                if(typeof closetext !== 'undefined') {
                    content = '<span id="jamal_modal_exit">' + closetext  + '</span>' + content;
                }
                jQuery('#wrapper')
                    .prepend('<div id="jamal_overlay"></div>')
                    .prepend('<div id="jamal_modal"><div class="jamal_size">'+content+'</div></div>');

                jQuery('#jamal_overlay')
                    .css({'background-color': '#ccc',
                          'position': 'absolute',
                          'width': '4000px',
                          'height': '4000px',
                          'float': 'left',
                          'margin-left': '-1500px',
                          'top': '0',
                          'left': '0',
                          'z-index': '80'});
                jQuery('#jamal_overlay').transparent(80);
                jQuery('#jamal_size').css('position', 'relative');+
                jQuery('#jamal_modal')
                    .css({'position': 'absolute',
                          'background-color': '#fff',
                          'border': '20px solid #f3f4f5',
                          'display': 'inline',
						  'width': '750px',
                          'height': '450px',
                          'padding': '10px',
                          'z-index': '900'});
                jamal.modal.active = true;
            } else {
                jQuery('div.jamal_size').html(content);
                if(typeof closetext !== 'undefined') {
                    jQuery('div.jamal_size').prepend('<span id="jamal_modal_exit">' + closetext  + '</span>');
                }
            }
            jQuery('#jamal_modal_exit').css({'float':'right','cursor':'pointer'});
			jamal.modal.resize();
			jQuery('div.jamal_size img').load(function() {
                jamal.modal.resize();
			});

            //add close event to exit span
            jQuery('#jamal_modal_exit').click(function() {
                jamal.modal.close();
            });

            return true;
        } else {
            return false;
        }
    }
});

jamal.fn.extend(jamal.fn.modal, {
	/**
	 * Flag for modal dialog
	 *
	 * @public
	 * @property
	 * @name jamal.modal.active
	 * @type Boolean
	 * @cat modal
	 */
    active: false,

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
        jQuery('#jamal_modal').css('width', jQuery('div.jamal_size').width()+'px');

        var body = jQuery('#wrapper').width();
        var modal = jQuery('#jamal_modal').width();

        jQuery('#jamal_modal').css('margin-left', (body/2-modal/2)+'px');

        // height
        jQuery('#jamal_modal').css('height', jQuery('div.jamal_size').height()+'px');
        if (jQuery.browser.msie) {
            var offset = document.documentElement.scrollTop;
            body = document.documentElement.clientHeight;
        } else {
            var offset = window.pageYOffset;
            body = window.innerHeight;
        }

        modal = jQuery('#jamal_modal').height();
        jQuery('#jamal_modal').css('margin-top', (offset + body/2 - modal/2) +'px');
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
        if (jamal.modal.active) {
            jQuery('#jamal_modal').fadeOut('slow');
            jQuery('#jamal_overlay').remove();
            jQuery('html, body').css('overflow', 'auto');
            if (jQuery.browser.msie) {
                jQuery('select').show();
            }
            jamal.modal.active = false;
        }
    }
});


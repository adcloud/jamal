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
 * @subpackage       jamal.stats
 * @since            Jamal v 0.4
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * Jamal stats component
 *
 * @public
 * @name jamal
 * @cat stats
 * @deprecated
 */
jamal.fn.extend({
    /* Constructor */
	/**
	 * Start the jamal stats handling
	 *
     * @example jamal.stats();
     * @desc This starts the jamal stats handling
	 * @public
	 * @name stats
	 * @type Object
	 * @cat stats
	 */
     stats: function(){
         this.stats.active = true;

         // bind click events
         jQuery("*").click($j.stats.log);

         jamal.log('Stats activated');
     }
});

jamal.fn.extend(jamal.fn.stats, {
	/**
	 * Flag that indicates if clicks are send to the server.
	 *
	 * @private
	 * @property
	 * @name active
	 * @type Boolean
	 * @cat stats
	 */
    active: false,

	/**
     * Method description
	 *
	 * @example jamal.stats.log();
	 *
	 * @private
	 * @name log
	 * @type jamal
     * @param Event e The event which has been invoked
	 * @cat stats
	 */
    log: function(e){
        if(e) {
            // stop event propagation and bubbling, careful with opening new windows
            if(!e.ctrlKey) {
                if(jQuery.browser.msie) {
                    e.cancelBubble = true;
                } else {
                    e.stopPropagation();
                }
            }
        }

        function getAttributes(obj) {
            // get id or classes of an element
            var attributes = '';

            if (obj.id && obj.id!=='') {
                attributes = '#'+obj.id;
            }
            if (attributes === '') {
                if (obj.className && obj.className!=='') {
                    var j = obj.className.length;
                    var i = 0;
                    while(i < j) {
                        if (obj.className.substring(i, i + 1) === ' ') {
                            attributes += '.';
                        } else {
                            attributes += obj.className.substring(i, i + 1);
                        }
                        i++;
                    }
                    if (attributes !== '') {
                        attributes = '.'+attributes;
                    }
                }
            }
            return attributes;
        }

        // create jQuery selector path for this element
        var link = '';
        if (this.tagName.toLowerCase() === 'body') {
            var tag = this.tagName.toLowerCase();
        } else {
            var tag = this.tagName.toLowerCase() + getAttributes(this);
        }
        var dom_path_elements = new Array();
        jQuery(this).parents().each(function() {
            var tag_name = this.tagName.toLowerCase();
            if(tag_name !== 'html' && tag_name !== 'body') {
                dom_path_elements.push(tag_name + getAttributes(this));
            }
        });
        dom_path_elements.reverse();
        var dom_path = dom_path_elements.join(' ');

        // get mouse position
        if (jQuery.browser.msie) {
            var position = event.clientX + document.body.scrollLeft + 'x' + event.clientY + document.body.scrollTop;
        } else {
            var position = e.pageX + 'x' + e.pageY;
        }

        // find the action
        switch (this.tagName.toLowerCase()) {
            case 'a':
                link = jQuery(this).attr('href');
                break;
            case 'input':
            case 'textarea':
            case 'option':
            case 'select':
            case 'fieldset':
            case 'label':
                /* refactor to only check if a form is submitted
                   otherwise the link action is not true its just a click */
                link = jQuery(this).parents('form').attr('action');
                break;
            default:
                link = 'click';
        }

        // get current screen size
        var screensize = screen.width+'x'+screen.height;
        if (jQuery.browser.msie) {
            var windowsize = document.body.clientWidth+'x'+document.body.clientHeight;
        } else {
            var windowsize = window.innerWidth+'x'+window.innerHeight;
        }

        // send log to the server
        var settings = {
            url: '/statistics/',
            type: 'POST',
            ifModified: true,
            global: false,
            data: {
                'data[PageView][page]': location.href,
                'data[PageView][link]': link,
                'data[PageView][element]': tag,
                'data[PageView][position]': position,
                'data[PageView][screensize]': screensize,
                'data[PageView][windowsize]': windowsize,
                'data[PageView][dom_path]': dom_path
            }
        };
        jQuery.ajax(settings);
    },

	/**
     * Method description
	 *
	 * @example jamal.stats.overlay();
     *
	 * @public
	 * @name overlay
	 * @type jamal
	 * @cat stats
	 */
    overlay: function() {
        var settings = {
            url: '/admin/pageviews/overlay/',
            type: 'POST',
            dataType: 'json',
            global: false,
            data: {
                'data[PageView][page]': location.href
            },
            success: function(response) {
                jQuery('div.jamal_stats').remove();
                var overlay = '';
                for (i in response.data) {
                    var el_path = unescape(response.data[i]['dom_path'] + ' ' + response.data[i]['element']);
                    var el = jQuery(el_path).get(0);
                    if (response.data[i]['clicks'] > 1) {
                        overlay = '<div class="jamal_stats" title="'+el_path+'">'+response.data[i]['clicks']+' Clicks</div>';
                    } else {
                        overlay = '<div class="jamal_stats" title="'+el_path+'">'+response.data[i]['clicks']+' Click</div>';
                    }
                    switch (el.tagName.toLowerCase()) {
                        case 'input':
                        case 'textarea':
                        case 'select':
                        case 'option':
                        case 'img':
                            jQuery(el).before(overlay);
                            break;
                        default:
                            jQuery(el).prepend(overlay);
                    }
                }
                jQuery('div.jamal_stats').css('margin', 0)
                                         .css('padding', '2px 3px')
                                         .css('position', 'absolute')
                                         .css('background-color', '#999')
                                         .css('color', '#333')
                                         .css('font-size', '9px')
                                         .css('line-height', '1em')
                                         .css('letter-spacing', '0')
                                         .css('z-index', '99');

            }
        };
        jQuery.ajax(settings);
    }
});


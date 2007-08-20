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
 * Jamal app view
 *
 * @public
 * @cat view
 */
jamal.extend(jamal.fn.v.prototype, {
    /**
     * Add an error message
     *
     * @name addError
     * @param String message The error message that should be displayed
     * @param Mixed obj Element / jQuery object / css selector of an dom element which should contain the error message
     */
    addError: function(message) {
        if (arguments.length>1) {
            obj = arguments[1];
        } else {
            obj = $('tr.edit>td');
        }
        $('div.error', obj).remove();
        $(obj).prepend(message);
        $('div.error', obj).show();
    }
});

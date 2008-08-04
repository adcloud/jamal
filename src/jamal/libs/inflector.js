/* SVN FILE: $Id$ */
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
 * Inflect strings
 * 
 * @example $j.inflector.singularize('Users');
 * @example $j.inflector.pluralize('User');
 *
 * @name $j.inflector
 * @type Object
 * @cat core
 */
(function($j){
    $j.inflector = {
        singularize: function(str) {
            return str.replace(/s$/, '');
        },
        pluralize: function(str) {
            return str + 's';
        }
    };
})(jamal);

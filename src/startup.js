/* SVN FILE: $Id$ */
/**
 * This file handles the jamal object creation when the dom has finished.
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
 * @subpackage       jamal.startup
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * Jamal startup
 *
 * Mapping jamal to the shorter $j namespace and register the onload event to
 * create an instance of jamal.
 *
 * This file sets the document.ready() function which is jQuery's replacement 
 * for the windows.onload event. 
 */

// Map over the $j in case of overwrite
if (typeof $j != "undefined") {
    jamal._$j = $j;
}

// Map the jamal namespace to '$j'
var $j = jamal;

/**
 * Window onload replacement of jquery
 *
 */
$(function(){
    $j = jamal = jamal();
    $j.start();
});

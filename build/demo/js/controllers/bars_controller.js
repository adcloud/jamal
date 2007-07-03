/* SVN FILE: $Id: foos_controller.js 23 2007-06-28 00:28:10Z teemow $ */
/**
 * Short description for file.
 *
 * This is a sample for jamal controller conventions
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
 * @subpackage       jamal.controllers
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/**
 * BarsController
 * 
 * This is a sample controller. Model and view objects are created by jamal
 * automatically.
 *
 */
$j.c({Bars: {
    /**
     * Bar index
     */
    index: function(filter) {
        
        $('a.clickme', filter).click(function() {
            
            // every jamal model comes with a json method right away
            $j.current.m.json('/get/json/from/this/url', function(response) {
                
                $j.current.v.showNewContent(response.content);
                
                // if you want to reinitialize the new content, e.g. register
                // events. use the init method. it starts your controller again.
                $j.current.init($('div.newcontent'));
            });
            return false;
        });
    }
}
});

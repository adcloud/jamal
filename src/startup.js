/* SVN FILE: $Id$ */
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
 * @subpackage       jamal.startup
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */

/*
 * Jamal startup
 *
 * This file sets the document.ready() function which is a replacement for the 
 * windows.onload event. 
 */
 
/*
 * Routes
 *
 * Routes tell the dispatcher which controller action has to be used
 * There will be an alternative soon. To minimize the size of the javascript 
 * application it will be possible to define controller and action in your
 * markup. This will look like: <body class="jamal controller action"> 
 */
var routes = {
    '/': 'Foo/index' 
};

/*
 * Window onload replacement of jquery
 *
 */
var debug = 1;
var views = {};
var models = {};
var dispatcher;

$(document).ready(function(){
    // will be deprecated soon. changes to: Jamal.init(routes);
    dispatcher = new Dispatcher(routes);
});




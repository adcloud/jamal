/* SVN FILE: $Id$ */
/**
 * Short description for file.
 *
 * This is jamals dispatcher
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
 * @subpackage       jamal.dispatcher
 * @since            Jamal v 0.1
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */
 
/**
 * Jamal dispatcher
 * 
 * will be deprecated soon. moves to jamal core and namespace.
 *
 */
Dispatcher = function (page) {
    this.constructor = function() {
        if (!page || (page.toString() !== page)) {
            page = location.pathname;
        }
        this.page = this._fixPath(page);
        action = routes[this.page];
        
        if (!action) {
            for (var route in routes) {
                page = this.page;
                if (!action) {
                    // fix route
                    fixed_route = this._fixPath(route);
                    
                    // check fixed route
                    if (fixed_route == page) {
                        action = routes[route];
                    } else {
                        // check for wildcards
                        if (fixed_route.search(/(\/\*\/)/) != -1) {
                            fixed_route = fixed_route.split('/');
                            page = this.page.split('/');
                            
                            // find a wildcard
                            var stars = [];
                            
                            for (var item in fixed_route) {
                                if (fixed_route[item] == '*') {
                                    stars.push(item);
                                }
                            }
                            if (stars.length>0) {
                                // found a wildcard
                                for (var wildcard in stars) {
                                    page[stars[wildcard]] = '*';
                                }
                                page = this._fixPath(page.join('/'));
                                action = routes[page];

                                if (!action) {
                                    // check fixed wildcard route
                                    fixed_route = fixed_route.join('/');
                                    if (fixed_route == page) {
                                        action = routes[route];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.controller = this._loadController(action);
    };
    
    this._fixPath = function(page) {
        page = page.toLowerCase();
        if (page.search(/\/$/) == -1) {
            page = page + '/';
        }
        return page;
    };
    
    this._loadController = function (uri) {
        if (uri) {
            uri_splitted = uri.split("/");
            controller = uri_splitted[0];
            action = uri_splitted[1];
            try {
                eval('controller = new ' + controller + 'Controller();');
                eval('controller.'+action+'();');
            } catch(e) {
                return false;
            }
            return controller;
        } else {
            return false;
        }
    };
    
    this.constructor();
};


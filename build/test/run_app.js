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
 * @subpackage       jamal.test
 * @since            Jamal v 0.4
 * @version          $Revision$
 * @modifiedby       $LastChangedBy$
 * @lastmodified     $Date$
 * @license          http://www.opensource.org/licenses/mit-license.php The MIT License
 */
var path = arguments[0];
var html_file = arguments[1];
load(path+"env.js");

if(!("console" in window) || !("firebug" in console)) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i) {
        window.console[names[i]] = function() {};
    }
    
    window.console.log = function(message) {
        print(message);
    }

    var names = ["warn", "error"];
    for (var i = 0; i < names.length; ++i) {
        window.console[names[i]] = function(message) {
            print(message);
            if(arguments.length>1) {
                e = arguments[1];
                print('Error: ' + e.name+' - '+e.message);
                print('File: ' + e.fileName + ':' + e.lineNumber);
                print('Stack: ' + e.stack);
            }
            throw new Error(message);
        };
    }
}

window.location = path+html_file+".html";

window.onload = function(){
    load(path+"jquery.js", path+"jamal_packed.js");
    
    $j = jamal = jamal();
    $j.start();
    
    for(i in $j.c) {
        if($j.c[i].name) {
            // controllers
            for(j in $j.c[i]) {
                if(typeof $j.c[i][j] == 'function') {
                    // run actions
                    console.log(i + '->' + j);
                    $j.c[i][j]();
                }
            }
        }
    }
}


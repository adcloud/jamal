/* SVN FILE: $Id: jamal.js 22 2007-06-28 00:09:37Z teemow $ */
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
 * Jamal controller constructor
 *
 * @name jamal.controller
 * @type Object
 * @param String controller Name of the constructed controller
 * @cat controller
 */
/**
 * Inherit a controller from the jamal app controller
 * 
 * @example $j.c({Foos:{
 *     index: function(){
 *         alert('hello world');
 *     }
 * });
 * @desc Merge controller into jamal.c map and inherit everything from jamal.controller
 *
 * @name $j.m
 * @param Object controller The controller that will be merged into the controller map.
 * @type Object
 * @cat core
 * @todo merge jamal.c and jamal.controller with function overloading
 */
jamal.c = jamal.fn.c = function(controller) {
    if(typeof controller === 'object') {
        var inherited;
        for(var i in controller) {
            inherited = new jamal.fn.c(i);
            jamal.extend(inherited, controller[i]);
            
            // add model
            var m = i.substr(0, i.length-1).replace(/ie$/, 'y'); // name is singular
            if(jamal.fn.m[m]) {
                inherited.m = jamal.fn.m[m];
            } else {
                // if no model create one
                inherited.m = jamal.fn.m[m] = new jamal.fn.m(m);
            }
            
            // add view
            if(jamal.fn.v[i]) {
                inherited.v = jamal.fn.v[i];
            } else {
                // if no view create one
                inherited.v = jamal.fn.v[i] = new jamal.fn.v(i);
            }
            
            controller[i] = inherited;
        }
        jamal.extend(jamal.fn.c, controller);
    } else {
        this.name = controller;
    }
};

jamal.fn.extend(jamal.fn.c.prototype, {
    /**
     * Callback which get called before an action
     *
     * Overwrite this method in your own (app)controller
     *
     * @public
     * @name beforeAction
     * @cat controller
     */
    beforeAction: function(){
    },

    /**
     * Callback which get called after an action
     *
     * Overwrite this method in your own (app)controller
     *
     * @public
     * @name beforeAction
     * @cat controller
     */
    afterAction: function(){
    },

    /**
     * (Re-)Initialize a controller
     *
     * @example jamal.controller.init()
     * @desc initializes the current controller action
     *
     * @example filter = $('#list');
     * jamal.controller.init(filter)
     * @desc initializes the current controller action but events are only 
     * bind to elements in #list
     * 
     * @public
     * @name init
     * @param Object filter Dom element which should be reinitialized
     * @cat controller
     */
    init: function(filter){
        jamal.current[jamal.action](filter);
    },
    
    /**
     * Bind a form to the model method
     *
     * @example controller.form('form');
     *
     * @public
     * @name form
     * @param Object
     * @cat controller
     */
    form: function(element, before, after){
        var $element = $(element);
        
        // bind the click on the submit button
        $('input[@type="submit"]', $element).click(function(){
            this.form.clicked = this;
        });
        
        // no form
        if(!$element.get(0)) {
            return false;
        }
        
        // iterate thru all the forms
        $element.each(function() {
            var $this = $(this);
            
            // define the submit event
            return $this.submit(function(){
                before.call($j.current, $this);
                
                // get the form elements
                var a = {};
                var form = $this;
                var elements = $(form).get(0).elements;
                
                // get all the data
                for(var i = 0; i < elements.length; i++) {
                    var o = elements[i];
                    if((o.type == 'checkbox' || o.type == 'radio') && !o.checked) {
                        continue;
                    }
                    if(o.type == "button") {
                        continue;
                    }
                    if(!o.name) {
                        continue;
                    }
                    if(o.type == "submit" && $this.get(0).clicked != o) {
                        continue;
                    }
                    a[o.name] = o.value;
                }
                
                // start the ajax submit
                $j.current.v.submitInProgress();
                $j.current.m.save($(form).attr('action'), a, function(response){
                    if(response.error_code) {
                        $j.current.v.addError(response.error_message, form);
                    }
                    $j.current.v.submitDone();
                    
                    if($.isFunction(callback)) {
                        after.call($j.current, response);
                    }
                });
                return false;
            });
        });
    }
});


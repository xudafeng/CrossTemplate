;KISSY.use('dom,event',function(S,DOM,Event){
    var input = S.get('#input');
    var jsElm = S.get('#js-tpl');
    var phpElm = S.get('#php-tpl');
    var vmElm = S.get('#vm-tpl');
    function CrossTemplate(){
        this.init();
    };
    CrossTemplate.prototype = {
        init:function(){
            this.source = DOM.val(input);
            this.bind();
            this.render();
        },
        bind:function(){
            var self = this;
            Event.on(window,'keyup',function(){
                if(self.source == DOM.val(input)){
                    return;
                }
                self.source = DOM.val(input);
                self.render();
            });
        },
        render:function(){
            var self = this;
            var php = CrossTemplatephp.compile(self.source);
            DOM.html(phpElm,php);
            var js = CrossTemplatejs.compile(self.source);
            DOM.html(jsElm,js);
            var vm = CrossTemplatevm.compile(self.source);
            DOM.html(vmElm,vm);
        }
    };
    new CrossTemplate();
});

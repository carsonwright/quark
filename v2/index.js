import Q from './init';
module.exports = (function(){
    var Quark = function(itemSelector, shouldQuery){
        var q = Object.assign({}, this.fn);
        if(q.init){
            q.init(itemSelector, shouldQuery); 
        }

        return q;
    }
    Quark.fn = {
        Quark: Quark
    }

    Quark._ = function(item){
        return Quark(item, true);
    }
    Quark.init = Q;
    return Quark;
})
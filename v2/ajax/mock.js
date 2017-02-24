import {ajax} from './ajax';

module.exports = {
    mock: function(reason, ajaxOptions){
        Quark = this;
        Quark.realAjax = Quark.ajax
        Quark.mock.reasons = Quark.mock.reasons || [] 
        Quark.mock.reasons.push(reason)
        Quark.ajax = function(options){
            return new Quark.Promise(function(resolve, reject){
                var reason = Quark.mock.reasons.filter(function(r){
                    return r(options)
                })[0]
                if(reason){
                    resolve(reason(options));
                }else{
                    Quark.realAjax(options).then(function(response){
                        resolve(response);
                    })
                }
            })
        }
    }
}
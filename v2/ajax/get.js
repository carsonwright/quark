import {ajax} from './ajax';

module.exports = {
      get: function(url, data){
        var opts = {
            method: "GET"
        }
        opts.url = url;
        if(data){
            opts.url = [url, "?",  Quark.parameterize(data)].join("");
        }
        
        return this.ajax(opts);
    }
}
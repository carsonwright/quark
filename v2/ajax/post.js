 import {ajax} from './ajax';
 
 module.exports = {
     post: function(url, data){
        var opts = {
            method: "POST"
        }
        opts.url = url;
        opts.data = data;
        return this.ajax(opts);
    }
 }
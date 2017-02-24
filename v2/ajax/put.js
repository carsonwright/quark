    import {ajax} from './ajax';
    
    module.exports = {
        put: function(url, data){
            var opts = {
                method: "PUT"
            }
            opts.url = url;
            opts.data = data;
            return this.ajax(opts);
        }
    }
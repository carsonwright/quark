import {ajax} from './ajax';

module.exports = {
    ajax: ajax,
    delete: function(url){
        var opts = {
            method: "DELETE"
        }
        opts.url = url;
        return this.ajax(opts);
    }
}
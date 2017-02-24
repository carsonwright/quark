import {ajax} from './ajax';

module.exports = {
    parameterize: function(data){
        return Object.keys(data).map(function(key){
            return [key, '=', data[key]].join("")
        }).join("&")
    }
}
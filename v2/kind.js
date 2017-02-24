module.exports = {
    kind: function(item){
        if(Array.isArray(item)){
            return "array";
        }else if(item === null){
            return "null";
        }else if(item === undefined){
            return "undefined";
        }else if(typeof item == "function" && !Quark.isBlank(item.prototype)){
            return "class";
        }else{
            return typeof item;
        }
    }
}
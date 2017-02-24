module.exports = {
    try: function(key, options){
        var Quark = this.Quark;
        if(key.indexOf(".") != -1){
            keys = key.split(".")
            firstKey = keys.splice(0, 1);
            otherKeys = keys.join(".")
            return Quark(this.try(firstKey)).try(otherKeys)
        }
        
        if(key.indexOf("||") != -1){
            key = key.replace("||", "")
            return this.items[0][key] ? this.items[0][key] : this.items[0][key] = options;
        }

        if(typeof this.items[0][key] == "function"){
            return this.items[0][key](options)
        }else if(this.items[0][key] == null){
            return Quark();
        }else if(this.items[0][key]){
            return this.items[0][key];
        }
    }
}
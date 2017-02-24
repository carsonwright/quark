 module.exports = {
     compact: function(items){
        var Quark = this;
        return items.filter(function(item){ 
                return !Quark.isBlank(item);
        })
    }
 }
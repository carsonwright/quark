module.exports = {
    addClass: function(name){
        var Quark = this.Quark;
        this.items.forEach(function(item){
            if(item.className.indexOf(name) == -1){
                var klasses = item.className.split(" ").filter(function(klass){
                    return klass != "" && klass != null;
                })

                item.className = [].concat(klasses, name).join(" ");
            }
        })
        return this;
    }
}
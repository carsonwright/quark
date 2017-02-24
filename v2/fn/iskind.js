module.exports = {
    isKind: function(type){
        return this.Quark.kind(this.items[0]) == type;
    }
}
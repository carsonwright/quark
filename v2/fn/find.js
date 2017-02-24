module.exports = {
    find: function(itemSelector){
        return this.Query(this.items[0].querySelectorAll(itemSelector))
    }
}
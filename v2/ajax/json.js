 module.exports = {
     json: function(data){
        if(typeof data == "string"){
            try{
                var data = JSON.parse(data);
            }catch(e){}
            return data;
        }else{
            try{
                var data = JSON.stringify(data);
            }catch(e){}
            return data;
        }
    }
 }
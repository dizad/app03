module.exports = {
//round to two
    roundToTwo(value){
        return parseFloat(value).toFixed(2);
    },
//get a deep clone
    deepClone: array => { 
        if(array){
            return JSON.parse(JSON.stringify(array));
        }          
    }
}
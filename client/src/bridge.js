//imports
    import axios from 'axios';
    let url = 'api/posts/';
//class
    class bridge {
    //generics
        static gofish(params){
            return new Promise(async (resolve, reject) => {
                try {
                    let command = 'gofish';
                    let res = await axios.post(url + command, params);
                    resolve(res.data);
                } catch(err){
                    reject(err);
                }
            });
        }
    }
//export
    export default bridge;
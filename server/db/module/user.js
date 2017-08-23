const userSchema = require('./../schema/user');

module.exports= {
    drop:async function () {
        return new Promise(function(resolve){
            userSchema.remove(function (err) {
                resolve({
                    log:{type:'info',msg:'清空collection成功'}
                })
            });
        });
    },
    dropOneUser:async function(query){
        return new Promise(function(resolve,reject) {
            userSchema
                .remove(query, function (err, doc) {
                    if (err) return handleError(err)
                    resolve({code:0});
                })
        })
    },
    createOne:async function (body) {
        const telephone=body.telephone
        const hasUser=await this.getOneUser(telephone)
        if(hasUser.length<=0){
           return new Promise(function(resolve,reject) {
            userSchema
                .create(body, function (err, doc) {
                    if (err) return handleError(err)
                    resolve({code:0});
                })
           }) 
        }else{
            return {code:10021,message:'账户已存在'}
        }
    },
    getOneUser:async function(query){
        return userSchema.find(query).exec()
    },
    updateUser:async function (query, update) {
        return new Promise(function(resolve,reject) {
            userSchema.findOneAndUpdate(query,update).exec(function(err,docs){
                 if (err) return handleError(err)
                 resolve({code:0});
            })
                
        })
    }
}
const convert = require('koa-convert')
const userModule= require('./../db/module/user');

async function createUser(query) {
	const name=query.name,
		telephone=query.telephone,
		password=query.password;
	const data={
	    name:name,
	    telephone:telephone,
	    password:password
	}
	return await userModule.createOne(data);
}

async function findOneUser(query){
	return await userModule.getOneUser(query)
}

async function dropOneUser(query){
	return await userModule.dropOneUser(query)
}

module.exports =  {
   createUser:createUser,
   findOneUser:findOneUser,
   dropOneUser:dropOneUser
}



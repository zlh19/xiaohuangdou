const mongoose = require('mongoose'),
    configDB = require( './../../config' ).db;

const optionsDB = {
	useMongoClient: true,
 //    db: {
 //    	native_parser: false
 //    },
 //    server: {
 //    	poolSize:15
	// },
 //    replset: { 
 //    	rs_name: configDB.rsname 
 //    },
 //    user: configDB.user,
 //    pass: configDB.pass
}
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://' + configDB.host +'/' + configDB.db,optionsDB);


const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接失败!'));

db.once('open', function(callback) {
   console.log('数据库连接成功！')
})
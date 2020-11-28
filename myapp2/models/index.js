const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
  );
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  db.Sangjanglist = require('./sangjanglist')(sequelize, Sequelize);
  db.Stocklist = require('./stocklist')(sequelize, Sequelize);

//같은 테이블 간에도 N:M 관계에 속할 수 있음
//같은 테이블 간의 컬럼명은 따로 지정해 주어야한다. UserUSer 가되면 이상하니깐.
//as는 JOIN시 사용하는 이름
//as에 등록한 이름을 바탕으로 getFollowings, getFollowers, addFollowing, addFollower 등의 메서드를 자동으로 추가

//시퀄라이저즈는 config.json을 읽어들여 데이터베이스를 생성한다.
//sequelize db:create해당 명령어로 실행하면 데이터베이스 생성한다. -> app.js#2

module.exports = db;
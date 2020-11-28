module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
    email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
    },
    nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    provider: {//kakao 로그인, 로컬 로그인을 가르는 부분.
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue:'local',
    },
    snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
        },
    }, {    //createdAt, updatedAt, deletedAt 컬럼도 생성
        timestamps: true,    
        paranoid: true,
    })
);
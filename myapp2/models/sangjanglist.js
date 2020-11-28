module.exports = (sequelize, DataTypes) => (
    sequelize.define('sangjanglist', {
    CompanyName: {
        type: DataTypes.STRING(50),
    },
    StockCode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey:true,
        unique: true,
    },
    Category: {
        type: DataTypes.STRING(255),
    },
    MainProduct: {
        type: DataTypes.STRING(255),
    },
    GyulSanMonth:{
        type: DataTypes.STRING(255),
    },
    President:{
        type: DataTypes.STRING(255),
    },
    Homepage:{
        type: DataTypes.STRING(255),
    },
    Localarea:{
        type: DataTypes.STRING(20),
    },
    SangJangDay: {
        type: DataTypes.DATE,
        },
    }, {    //createdAt, updatedAt, deletedAt 컬럼도 생성
        timestamps: true,    
        paranoid: true,
        tableName:'sangjanglist',
    })
);
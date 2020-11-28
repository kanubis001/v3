module.exports = (sequelize, DataTypes) => (
    sequelize.define('stocklist', {
    CompanyName: {
        type: DataTypes.STRING(50),
    },
    StockCode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey:true,
        unique: true,
    },
    Market:{
        type: DataTypes.STRING(30),
    },
    }, {    //createdAt, updatedAt, deletedAt 컬럼도 생성
        timestamps: true,    
        paranoid: true,
        tableName:'stocklist',
    })
);
'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StageEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({  models }) {
      // define association here
      //previously had Stage, Event, StageEvent in static associate({})
      //stage
      //  StageEvent.hasOne(Stage, {
      //   foreignKey: "stage_id",
      //   as: "stage",
      //   through: Stage,
      // })
      // //event
      // StageEvent.hasOne(Event, {
      //   foreignKey: "event_id",
      //   as: "event",
      //   through: Event,
      // })

    }
  };
  StageEvent.init({
    stage_event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    event_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StageEvent',
    tableName: 'stage_events',
    timestamps: false,
  })
  return StageEvent
}
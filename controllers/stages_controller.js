//Dependencies
const stages = require("express").Router();
const db = require("../models");
const { Stage, Event } = db;
const { Op } = require('sequelize')

//FIND ALL STAGES (INDEX)
stages.get("/", async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
       where: {
      stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
  }
});
  

  } catch (error) {
    res.status(500).json(error);
  }
});

//FIND A SPECIFIC STAGE
stages.get("/:name", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_name: req.params.name },
      include:{ 
          model: Event, 
          as: "events",
          through: { attributes: [] }
      },
      order: [
          [{ model: Event, as: "events" }, 'date', 'ASC'],
      ]
  })
  res.status(200).json(foundStage)
} catch (error) {
  res.status(500).json(error)
}
})

//CREATE A STAGE
stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new stage",
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A STAGE (PUT)
stages.put(":id", async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A STAGE
stages.delete("/:id", async (req, res) => {
  try {
    const deletedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export
module.exports = stages;
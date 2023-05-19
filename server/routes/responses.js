const router = require('express').Router();
const conn =require("../db/connection");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util");//helper

//Answer CRUD
//create
router.post(
    "",
    admin,
    body("response"),
    body("is_correct"),
    body("question_id"),

    async (req, res) => {
        try {
        //1-validation request {manual , express validation}
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const query = util.promisify(conn.query).bind(conn);
          const checkResponses = await query("select * from responses where ID = ?", [
            req.body.id,
          ]);
          if (checkResponses.length > 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "This response Already exist",
                },
              ],
            });
          } 

          //2-validate the response
          else {
              const responseObj = {
                response: req.body.response,
                is_correct: req.body.is_correct,
                question_id: req.body.question_id,
              };

              //3-insert question
              const query = util.promisify(conn.query).bind(conn);
              await query("insert into responses set ? ", responseObj);
              res.status(200).json({
                msg: "response created SuccessFULLy",
              });
            }
        } catch (err) {
          console.log(err);
          res.json(500).json(err);
        }
    }
    );

//update
router.put(
    "/:id",
    admin,
    body("response"),
    body("is_correct"),
    body("question_id"),
  
    async (req, res) => {
        try {
         //1-validation request {manual , express validation}
          const query = util.promisify(conn.query).bind(conn);
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          //2-check if response exist or not
          const response = await query("select * from responses where ID = ?", [
            req.params.id,
          ]);
          if (!response[0]) {
            res.status(404).json({
              msg: "Not Found",
            });
          }
  
          //3-prepare response //delete old response
          else {const responseObj = {
            response: req.body.response,
            is_correct: req.body.is_correct,
            question_id: req.body.question_id,
          };
          //4-update response
          await query("update responses set ? where ID = ?", [
            responseObj,
            response[0].ID,
          ]);
          res.status(200).json({
            msg: "Updated successfully",
          });
        }
      } catch (err) {
        console.log(err);
        res.json(500).json(err);
      }
    }
  );

  //delete
router.delete(
    "/:id",
    admin,
  
    async (req, res) => {
      try {
        //1-check if audio exist or not
        const query = util.promisify(conn.query).bind(conn);
        const response = await query("select * from responses where ID = ?", [
          req.params.id,
        ]);
        
        if (!response[0]) {
          res.status(404).json({
            msg: "Not Found",
          });
        }
        //2-remove audio
        await query("delete from responses where ID = ?", [response[0].ID]);
        res.status(200).json({
        msg: "DELETED successfully",
        });
      } catch (err) {
        console.log(err);
        //res.json(500).json(err);
      }
    }
  );

// show->tack id give all data of obj.id
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const response = await query("select * from responses where ID = ?", [
    req.params.id,
  ]);
    res.json(response);
});


//List
router.get("", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const response = await query("select * from responses");
    res.status(200).json(response);
  }
  );


//showAll question and responses but i cant access
// router.get("", async (req, res) => {
//   const query = util.promisify(conn.query).bind(conn);
//   // Get all questions from the database.
//   const questions = await await query("select * from questions");

//   // Create an array to store the questions and their responses.
//   const allQuestionsAndResponses = [];

//   for (const question of questions) {
//     const questionId = question.ID;
//     // Get the responses for the current question.
//     const responses = await query('select * from responses where question_id = ?', [
//       questionId
//     ]);
//     // Add the question and its responses to the array.
//     allQuestionsAndResponses.push({
//       question,
//       responses,
//     });
//   }
//   // Return the results as JSON.
// res.json(allQuestionsAndResponses);
// });



module.exports = router;

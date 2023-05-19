const router = require('express').Router();
const conn =require("../db/connection");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadAudio");
const util = require("util");//helper
const fs = require("fs");


// Question CRUD
//create
router.post(
    "",
    admin,
    upload.single("audio"),
    body("question"),
    body("status"),

    async (req, res) => {
        try {
        //1-validation request {manual , express validation}
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const query = util.promisify(conn.query).bind(conn);
          const checkquestions = await query("select * from questions where question = ?", [
            req.body.question,
          ]);
          if (checkquestions.length > 0) {
            res.status(400).json({
              errors: [
                {
                  msg: "This question Already exist",
                },
              ],
            });
          } 

          //2-validate the question
          else {
            if (!req.file) {
              return res.status(400).json({
                errors: [
                  {
                    msg: "question is required",
                  },
                ],
              });
            } 

            //3-perpare question object
            else {
              const question = {
                question: req.body.question,
                audio: req.file.filename,
                status: req.body.status,
              };

              //4-insert question
              const query = util.promisify(conn.query).bind(conn);
              await query("insert into questions  set ? ", question);
              res.status(200).json({
                msg: "question created SuccessFULLy",
              });
            }
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
  upload.single("audio"),
  body("question"),
  body("status"),

  async (req, res) => {
      try {
       //1-validation request {manual , express validation}
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //2-check if audio exist or not
        const question = await query("select * from questions where ID = ?", [
          req.params.id,
        ]);
        if (!question[0]) {
          res.status(404).json({
            msg: "Not Found",
          });
        }

        //3-prepare question //delete old question
        else {const questionObj = {
          question: req.body.question,
          status: req.body.status,
        };
        if(req.file){
          questionObj.audio = req.file.filename;
          fs.unlinkSync("./upload/"+question[0].audio)//dlete old oudio
        }
        //4-update question
        //const query = util.promisify(conn.query).bind(conn);//new
        await query("update questions set ? where ID = ?", [
          questionObj,
          question[0].ID,
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
      const question = await query("select * from questions where ID = ?", [
        req.params.id,
      ]);
      if (!question[0]) {
        res.status(404).json({
          msg: "Not Found",
        });
      }
      //2-remove audio
      fs.unlinkSync("./upload/"+question[0].audio)//delete old oudio
      await query("delete from questions where ID = ?", [question[0].ID]);
      res.status(200).json({
      msg: "DELETED successfully",
      });
    } catch (err) {
      console.log(err);
      res.json(500).json(err);
    }
  }
);


// show->tack id give all data of obj.id
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const question = await query("select * from questions where ID = ?", [
    req.params.id,
  ]);
  if (!question[0]) {
    res.status(404).json({ msg: "This question is Not Found" });
  }
  question.audio = "http://" + req.hostname + ":4000/" + question.audio;
  if(question.audio){
    res.status(200).json(question);
  }
  
}
);

//List& search of all question in database
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search="";
  if(req.query.search){
        //query params
        search = 'where question LIKE \'%' + req.query.search + '%\'';
      }
      const question = await query('select * from questions ' + search);
  question.map((question) => {
    question.audio = "http://" + req.hostname + ":4000/" + question.audio;
  });
  res.status(200).json(question);
}
);
module.exports = router;
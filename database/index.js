const fs = require("fs");

let userStructure = {
  questions: {},
};
let questionStructure = {
  text: "",
  answers: {},
};

async function isUserExist(userID) {
  const db = JSON.parse(fs.readFileSync("database/dbs/users.json"));
  if (db[userID]) return true;
  return false;
}

async function createUser(userID) {
  try {
    if (await isUserExist(userID)) return false;
    const db = JSON.parse(fs.readFileSync("database/dbs/users.json"));
    db[userID] = userStructure;
    fs.writeFileSync("database/dbs/users.json", JSON.stringify(db));
    return true;
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

async function userAnswered(userID, questionID) {
  createUser(userID);
  const userDB = JSON.parse(fs.readFileSync("database/dbs/users.json"));
  if (!db[userID].questions[questionID]) return false;
  return db[userID].questions[questionID];
}

// 0 = left, 1 = right

async function setAnswer(userID, questionID, answer) {
  try {
    await createUser(userID);
    const userDB = JSON.parse(fs.readFileSync("database/dbs/users.json"));

    userDB[userID].questions[questionID] = answer;
    fs.writeFileSync("database/dbs/users.json", JSON.stringify(userDB));

    const questionDB = JSON.parse(
      fs.readFileSync("database/dbs/questions.json")
    );

    questionDB[questionID].answers[userID] = answer;
    fs.writeFileSync("database/dbs/questions.json", JSON.stringify(questionDB));

    return true;
  } catch (e) {
    console.log(e);
    return e.message;
  }
}

function isQuestionExist(questionID) {
  const db = JSON.parse(fs.readFileSync("database/dbs/questions.json"));
  if (db[questionID]) return true;
  return false;
}

function getQuestion(questionID) {
  if (!isQuestionExist(questionID)) return false;

  const db = JSON.parse(fs.readFileSync("database/dbs/questions.json"));
  return { text: db[questionID].text, ID: questionID };
}

function getQuestionAmount() {
  const db = JSON.parse(fs.readFileSync("database/dbs/questions.json"));
  return Object.keys(db).length;
}

function addQuestion(text) {
  let newQuestionID = getQuestionAmount() + 1;
  const db = JSON.parse(fs.readFileSync("database/dbs/questions.json"));
  db[newQuestionID] = questionStructure;
  db[newQuestionID].text = text;
  fs.writeFileSync("database/dbs/questions.json", JSON.stringify(db));
  return db[newQuestionID];
}
function Random(min, max, round) {
  if (round == false || round == undefined)
    return Number((Math.random() * (max - min) + min).toFixed(3));
  if (round == true) return Math.round(Math.random() * (max - min) + min);
}
function getRandId() {
  return Random(1, getQuestionAmount(), true);
}

function getRanHex(size) {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join("");
}

function getAnswers(questionID) {
  const db = JSON.parse(fs.readFileSync("database/dbs/questions.json"));
  let answers = Object.values(db[questionID].answers);
  let left = answers.filter((x) => x == 0);
  let right = answers.filter((x) => x == 1);
  return { left: left.length, right: right.length };
}

module.exports = {
  getQuestion,
  createUser,
  setAnswer,
  addQuestion,
  getRandId,
  getAnswers,
  // addSuggetion,
  // getSuggetion,
  // deleteSuggestion,
};

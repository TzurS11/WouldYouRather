function Random(min, max, round) {
  if (round == false || round == undefined)
    return Number((Math.random() * (max - min) + min).toFixed(3));
  if (round == true) return Math.round(Math.random() * (max - min) + min);
}

document.getElementById("leftPeople").innerHTML =
  Random(0, 10000, true) + " people";

document.getElementById("rightPeople").innerHTML =
  Random(0, 10000, true) + " people";

let demoQuestions = [
  "Would you rather have telekinesis or telepathy?",
  "Would you rather go to a movie OR to dinner alone?",
  "Would you rather know how you will die OR when you will die?",
  "Would you rather always have the urge to pee OR have to always wear a diaper?",
  "Would you rather be always cold OR always hot?",
  "Would you rather have an extra toe OR extra finger?",
  "Would you rather have an odd-shaped nose OR odd-shaped ears?",
  "Would you rather have an odd-shaped nose OR odd-shaped ears?",
  "Would you rather have a physical meeting with other coworkers OR have an online meeting with other coworkers?",
  "Would you rather be smart but ugly OR dumb but beautiful?",
  "Would you rather have smelly armpits OR smelly hair?",
  "Would you rather be forced to sing along or dance to every single song you hear?",
];
let oldquestionid = Random(0, demoQuestions.length - 1, true);
let newquestionid = Random(0, demoQuestions.length - 1, true);
setInterval(function () {
  while (newquestionid == oldquestionid) {
    newquestionid = Random(0, demoQuestions.length - 1, true);
  }
  document.getElementById("question-title").innerHTML =
  demoQuestions[newquestionid];

  document.getElementById("leftPeople").innerHTML =
    Random(0, 10000, true) + " people";

  document.getElementById("rightPeople").innerHTML =
    Random(0, 10000, true) + " people";
  oldquestionid = newquestionid;
}, 500);

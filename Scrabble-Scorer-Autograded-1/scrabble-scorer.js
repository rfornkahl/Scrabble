// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
word = word.toUpperCase();
let letterPoints = "";
for (let i = 0; i < word.length; i++) {
 	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


//function initialPrompt created to ask the user to input a word and capture the word. includes regular expression to test if the user's input is a number or special character. do while loop, to continue to ask the user to input a word to score, when they have entered a number or special character. loop will end when the user has entered a string consisting of only letters
function initialPrompt() { 
const nonLetters = new RegExp (/[~`!@#$%\^()_&*+=\-\[\]\\';,/{}|\\":<>\?0-9]/); 
let scoredWord = '';
  console.log("Let's play some Scrabble! \n");
do {
  scoredWord = input.question("Enter a word to score: ");
   }
while (nonLetters.test(scoredWord))
   return scoredWord;
};

//simpleScore function that loops through a string counting all characters and returning a score of 1pt per character
let simpleScore= function(word){
let score = 0;
word = word.toLowerCase();
for (let i=0; i<word.length;i++){
  score += 1;
}
return score;
};


// vowelBonusScore function that constructs a varialbe for vowels, then loops through a string adding to score variable of 3pts per vowel and 1pt per consenent 
let vowelBonusScore= function(word){
  let score = 0;
  word = word.toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];
for (let i=0; i<word.length; i++){
  if (vowels.includes(word[i])){
  score+=3;
  } else {
  score+=1;
  }
} 
return score;
};

//scrabbleScore function that loops through a string adding up a score for the new point structure. 
let scrabbleScore= function(word){
word = word.toLowerCase();
let totalScore = 0;

for (let i = 0; i < word.length; i++) {
    totalScore+=newPointStructure[word[i]];
	}
return totalScore;
};

//scoringAlogrithms constructed to create a array of objects that holds the name of the scoring method, description of the method, and function that calls the scoring method
const scoringAlgorithms = [
  {name: "Simple Score", description: "Each letter is worth 1 point. ", scoringFunction: simpleScore  },
  {name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt. ", scoringFunction: vowelBonusScore   },
  {name: "Scrabble", description: "The traditional scoring algorithm. ", scoringFunction: scrabbleScore   }];



//scorerPrompt function prompts the user for the scoring method they want to use against their word. includes regular expression created to test to see if the user's input includes a special character, letter, or a number other than 0-2. includes do while loop that continues to ask the user to enter either 0,1,or2 when they have entered something besides 0,1,or2.
function scorerPrompt() {
let userScorerPrompt = '';
console.log("Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system");

const nonNumbers13 = new RegExp (/[~`!@#$%\^()_&*+=\-\[\]\\';,/{}|\\":<>\?a-zA-Z3-9]/);

do {
  userScorerPrompt = input.question("Enter 0, 1, or 2: ")
}
while (nonNumbers13.test(userScorerPrompt));

return scoringAlgorithms[userScorerPrompt];
}
  


//transform function tranforms the oldPointStructure into a new object with 26 keys representing each letter with the assigned point value.
function transform(oldPointStructure) {
let transformValue = {};
  for (const pointValue in oldPointStructure) {
    for (let i=0; i<oldPointStructure[pointValue].length; i++){
    transformValue[oldPointStructure[pointValue][i].toLowerCase()] = parseInt(pointValue); 
    }
    transformValue[' '] = 0;
    }
  return transformValue;
};


//creating variable for newPointStructure to call the transform function with the OldPointsStructure.
let newPointStructure = transform(oldPointStructure);




//runProgram function that prints out the user's score after they have entered their choosen word and selected a scoring method
function runProgram() {
let inputScrableScore = initialPrompt();
let scoringAlgorithm = scorerPrompt();
    console.log(`Score for '${inputScrableScore}': `+ scoringAlgorithm.scoringFunction(inputScrableScore) + '\n');
 return inputScrableScore 
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};


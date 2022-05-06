#!/usr/bin/env node

//  add a shebang #! to the top of the file to make it executable from the command line
//  to run the file, type node index.js

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

// console.log(chalk.green(figlet.textSync("CLI-APP", { horizontalLayout: "full" })));

let playerName: string;

/**
 * Wait for a specified amount of time, then resolve the promise.
 * @param [ms=2000] - The number of milliseconds to wait before resolving the promise.
 */
const helperSleep = (ms: number = 2000): Promise<unknown> =>
  new Promise((response): NodeJS.Timeout => setTimeout(response, ms));

/**
 * It creates a variable called titleWelcomeRainbow and assigns it the value of the
 * chalkAnimation.rainbow function
 */
async function welcome(): Promise<void> {
  /* Creating a variable called titleWelcomeRainbow and assigning it the value of the
    chalkAnimation.rainbow function. */
  const titleWelcome: chalkAnimation.Animation = chalkAnimation.rainbow(
    "Who wants to be a great developer? 🤓 \n",
    50
  );

  /* A function that is waiting for the user to input their name. */
  await helperSleep();
  /* It stops the animation. */
  titleWelcome.stop();
  await helperSleep(50);

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on the computer that you can control.
    Get any questions wrong and i'll be ${chalk.bgRed("terminated")}.
    Get all the questions right and you'll be ${chalk.green.bgGreen(
      "awarded"
    )}. 
    `);
}

/* enquirer prompt */
/**
 * The function asks the user to input their name, and then stores the name in the variable playerName
 * @returns The player's name.
 */
async function askUserName(): Promise<void> {
  /* validate the input */
  /* Asking the user to input their name. */
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    /* Asking the user to input their name. */
    message: "What is your name?",
    default(): string {
      return "Player";
    },
  });

  /* Storing the user's name in the variable playerName. */
  playerName = answers.player_name;
}

/**
 * It creates a spinner, waits for a second, and then displays a success or error message based on the
 * player's answer
 * @param isCorrect - A boolean value that indicates whether the player's answer is correct or not.
 * @returns A boolean value.
 */
async function handleAnswer(isCorrect: boolean): Promise<boolean> {
  const spinner = createSpinner("Checking answer...").start();
  /* Waiting for a second before displaying the message, Using nanospinner */
  await helperSleep();

  /* Checking if the player's answer is correct. If it is correct, it displays a success message. If it
  is not correct, it displays an error message. */
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}! Legit answer!` });
    return true;
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}!` });
    /* Exiting the process. 0 means everything is fine */
    process.exit(1);
  }
}

/**
 * The function `question1` is an `async` function that returns a `Promise` that resolves to a
 * `Boolean` value
 * @returns A boolean value
 */
async function question1(): Promise<boolean> {
  /* Asking the user to input their name. */
  const answers: { question_1: string } = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message:
      "What is the name of the programming language that is used to animate web pages?",
    choices: [
      "C",
      "C#",
      "Go",
      "Java",
      "JavaScript",
      "PHP",
      "Python",
      "TypeScript",
    ],
  });
  /* Calling the function `handleAnswer` and passing in a boolean value as its argument. */
  return handleAnswer(answers.question_1 == "JavaScript" ? true : false);
}

/**
 * It asks the user to select an answer from a list of choices
 * @returns the value of the variable "answer".
 */
async function question2() {
  /* Asking the user to select an answer from a list of choices. */
  const answers: { question_2: any } = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "What's the first index value of the array?",
    choices: ["0", "1", "null", "undefined", "NaN", "Infinity"],
  });
  /* Checking if the player's answer is correct. If it is correct, it displays a success message. If it
is not correct, it displays an error message. */
  return handleAnswer(answers.question_2 == "0" ? true : false);
}

/**
 * It clears the console, creates a variable called `message` and assigns it the value of a string, and
 * then logs the message on the console
 */
function winner(): void {
  /* It clears the console. */
  console.clear();
  /* Creating a variable called `message` and assigning it the value of a string. */
  const message: string = `Congrats, ${playerName}!\n $ 1 , 0 0 0 , 0 0 0`;

  /* A callback function that is checking for errors. */
  figlet(message, (err: Error | null, data: string | undefined): void => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    /* Logging the message on the console. */
    console.log(gradient.pastel.multiline(data));
  });
}

/* Calling the functions `welcome`, `askUserName`, `question1`, `question2`, and `winner` in order. */
await welcome();
/* Waiting for the user to input their name. */
await askUserName();
await helperSleep();

/* Waiting for the user to answer the questions. */
await question1();
await question2();
/* Calling the function `winner` and logging on the console. */
winner();

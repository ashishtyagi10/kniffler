const fs = require("fs");
const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var answers = {};
rl.question("Enter project name: ", (projectName) => {
  // Create project directory
  answers["project"] = projectName;
  fs.mkdirSync(projectName);

  // Change into project directory
  process.chdir(projectName);

  //   Generating Front End Project
  fs.mkdirSync("frontend");
  process.chdir("frontend");
  const frontEndTech = ["Angular", "React", "Vue", "Flutter"];
  rl.question("Please choose the front end:  ", (answer) => {
    answers["frontend"] = answer;
    if (answer === "0") {
      console.log("Creating Angular Front End");
      execSync("npm install -g @angular/cli");
      execSync(`ng new ${projectName} --directory ./`);
    } else if (answer === "1") {
      console.log("Creating React Front End");
      execSync("npm init react-app .");
    } else if (answer === "2") {
      console.log("Creating Vue Front End");
      execSync("npm create vite@latest . -- --template vue");
    } else {
      console.log("Creating Flutter Front End");
      execSync(`flutter create . --project-name ${projectName}`);
    }

    // Create backend directory
    process.chdir("..");
    console.log("Creating back end in Django: ");
    fs.mkdirSync("backend");

    // Change into backend directory
    process.chdir("backend");

    // Run Django startproject command to create a new Django project
    execSync(`django-admin startproject ${projectName} .`);

    console.log(
      `Created ${projectName} with Flutter frontend and Django backend`
    );

    rl.close();
  });

  console.log();
  frontEndTech.forEach((option, index) => {
    console.log(`${index}: ${option}`);
  });
});

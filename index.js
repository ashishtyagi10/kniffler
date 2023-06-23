import fs from "fs";
import * as readline from "readline";
import { execSync } from "child_process";
import { platform } from "os";


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

  // Generating Front End Project
  fs.mkdirSync("frontend");
  process.chdir("frontend");
  const frontEndTech = ["Angular", "React", "Vue", "Flutter"];
  console.log("Frontend technologies:  ")
  frontEndTech.forEach((option, index) => {
    console.log(`${index}: ${option}`);
  });
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
    fs.mkdirSync("backend");
    process.chdir("backend");

    const backendTech = ["Django", "Spring"];
    console.log("Backend technologies ...")
    backendTech.forEach((option, index) => {
      console.log(`${index}: ${option}`);
    });

    rl.question("Please choose the backend technology: ", (answer) => {
      answers["backend"] = answer;
      if (answer === "0") {
        // Run Django startproject command to create a new Django project
        console.log("Creating Django Project")
        execSync(`django-admin startproject ${projectName} .`);
      } else {
        console.log(`creating spring project on ${platform}`);
        execSync(`curl https://start.spring.io/starter.tgz -d dependencies=web,security,devtools -d name=backend -o backend.tgz`);
        execSync(`tar -xzvf ./backend.tgz -C .`)
      }
      console.log(
        `Created ${projectName} with ${frontEndTech[answers["frontend"]]} frontend and ${backendTech[answers["backend"]]} backend`
      );
      rl.close();
    });
  });
});

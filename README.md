# Seneca Take Home Test
A simple React application made with create-react-app which lets the user select from a list of answers to a prompted question. The project utilizes static typing with Typescript to make debugging easier (in my opinion it serves almost as a basic documentation for the codebase and makes it easier for new devs to understand the code as well) and styled components for styling to speed up development.

## How to Install and Run the project
In the project directory, first run:

### npm install
to install all the dependencies the project needs.
Then you can run:

### npm start
to run the app in the development mode.
Open http://localhost:3000 to view it in the browser.
In case you want to bundle React in production mode (optimized build, minified, compressed files) run:

### npm run build
which builds the app for production to the build folder.

## How to Use the project
It is very simple to use, the user tries to figure out and pick the right answers from the options below the quiz question. As it is just a small app to showcase a component and due to the limitations described below, currently the user can only answer to one question. The background gives a clue about how close the user is to selecting all the correct options. Once the correct answers are guessed, the screen locks and the app needs to be refreshed to unlock the screen.

## Limitations
This is not a fully fleshed out application by any means. It was mostly created to showcase a component and the logic needed to extract the selected values from said component and compare those with the actual answers. Right now the quiz data (answers, options, question) is just mock data, ideally this is something that we'd receive from a server and would need to handle it differently. Due to this we don't have any proper error handling in place. There are only 3 different background states defined currently, this wouldn't be helpful if we let's say had 10 answers (10X2 or 10X3 options) for a question. Additionally, the selected options on page load are randomized at the moment, as an extension to the current solution we should make sure that the correct answers are not picked randomly.

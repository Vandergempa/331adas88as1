import React from "react";
import QuizComponent from "../components/QuizComponent/QuizComponent";

/**
 * The main page holding our main component. As it is a very simple project with the focus being on the toggle component,
 * no routing, different layouts, etc. will be implemented.
 * @constructor
 */
function App() {
  return (
    <QuizComponent
      question="The animal cell contains"
      answers={[
        "ribosomes",
        "cytoplasm",
        "partially_permeable_membrane",
        "mitochondria",
      ]}
      options={[
        [
          {
            label: "Cell wall",
            value: "cell_wall",
          },
          {
            label: "Ribosomes",
            value: "ribosomes",
          },
          {
            label: "Option 3",
            value: "option_3",
          },
        ],
        [
          {
            label: "Cytoplasm",
            value: "cytoplasm",
          },
          {
            label: "Chloroplast",
            value: "chloroplast",
          },
          {
            label: "Option 3",
            value: "option_3",
          },
        ],
        [
          {
            label: "Partially permeable membrane",
            value: "partially_permeable_membrane",
          },
          {
            label: "Impermeable membrane",
            value: "impermeable_membrane",
          },
          {
            label: "Option 3",
            value: "option_3",
          },
        ],
        [
          {
            label: "Cellulose",
            value: "cellulose",
          },
          {
            label: "Mitochondria",
            value: "mitochondria",
          },
          {
            label: "Option 3",
            value: "option_3",
          },
        ],
      ]}
    />
  );
}

export default App;

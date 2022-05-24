import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import MultiSwitch, { OptionType } from "../MultiSwitch/MultiSwitch";
import { device } from "../../utils/breakpoints";

const componentColors = {
  stage_1: {
    background: "linear-gradient(180deg, #F1B496 0%, #EA806A 100%)",
    selectedFontColor: "#E47958",
  },
  stage_2: {
    background: "linear-gradient(180deg, #F6B868 0%, #EE6B2D 100%)",
    selectedFontColor: "#9F938B",
  },
  stage_3: {
    background: "linear-gradient(180deg, #76E0C2 0%, #59CADA 100%)",
    selectedFontColor: "#4CAD94",
  },
};

interface QuizComponentProps {
  question: string;
  options: OptionType[][];
  answers: string[];
}

/**
 * A component that renders the quiz question and a MultiSwitch component for every multi option row
 * @param props
 * @constructor
 */
const QuizComponent = (props: QuizComponentProps) => {
  const { question, options, answers } = props;

  /* Probably not the way to do it, however it is easy to demo the logic like this:
   *  Basically we just randomly pre-select options and validate them on component render - see useEffect where we
   *  set backgrounds */
  const randomIndexes = options.map(() =>
    Math.floor(Math.random() * options[0].length)
  );
  const randomValues = options.map((option, index) => {
    if (index > options[0].length) return "";
    return option[randomIndexes[index]].value;
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(randomValues);
  const [currentBackground, setCurrentBackground] = useState(
    componentColors.stage_1
  );

  // A few simple checks for edge cases
  // Normally this is something that I would check for on the server side
  useEffect(() => {
    let numberOfOptions = options[0].length;
    if (options.length !== answers.length) {
      throw Error("Every row needs to have a correct answer!");
    }

    // Checks if all the rows have the same amount of options
    const filteredOptions = options.filter(
      (option) => option.length !== numberOfOptions
    );

    if (filteredOptions.length) {
      throw Error("Every row must have the same amount of options!");
    }
  }, [options, answers]);

  useEffect(() => {
    // Check which selected options are correct answers
    const matches = answers.filter(
      (answer, index) => selectedValues[index] === answer
    );
    if (options.length === matches.length) {
      setCurrentBackground(componentColors.stage_3);
      // Lock answers once solution is found
      setIsDisabled(true);
    } else {
      matches.length / options.length >= 0.5
        ? setCurrentBackground(componentColors.stage_2)
        : setCurrentBackground(componentColors.stage_1);
    }
  }, [selectedValues, options, answers]);

  const handleOnChange = (selectedOptionValue: string, index: number): void => {
    const newState = selectedValues.slice();
    newState[index] = selectedOptionValue;
    setSelectedValues(newState);
  };

  return (
    <MainContainer background={currentBackground.background}>
      <Header>{question}</Header>
      <AnswerWrapper>
        {options.length &&
          options.map((option, index) => {
            return (
              <MultiSwitchWrapper key={option[0].value}>
                <MultiSwitch
                  options={option}
                  selectedFontColor={currentBackground.selectedFontColor}
                  name={option.map((o) => o.value).join("")}
                  onChange={(selectedValue) => {
                    handleOnChange(selectedValue, index);
                  }}
                  initialSelectedIndex={randomIndexes[index]}
                  disabled={isDisabled}
                />
              </MultiSwitchWrapper>
            );
          })}
      </AnswerWrapper>
      <Text>{`The answer is ${isDisabled ? "correct!" : "incorrect."}`}</Text>
    </MainContainer>
  );
};
export default QuizComponent;

interface MainContainerPropTypes {
  background: string;
}

const MainContainer = styled.div<MainContainerPropTypes>`
  height: 100%;
  width: 100%;
  padding: 50px 0 50px 0;
  background: ${(props) => props.background};
  overflow-y: auto;
`;

const MultiSwitchWrapper = styled("div")`
  height: 80px;
  width: 80%;
  margin: 10px;
`;

const AnswerWrapper = styled("div")`
  width: 100%;
  margin: 50px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled("h1")`
  font-weight: 700;
  font-size: 40px;
  line-height: 140%;
  color: white;
  text-align: center;

  @media ${device.mobileL} {
    font-size: 26px;
  }
`;

const Text = styled("h2")`
  font-weight: 700;
  font-size: 32px;
  line-height: 140%;
  color: white;
  text-align: center;

  @media ${device.mobileL} {
    font-size: 20px;
  }
`;

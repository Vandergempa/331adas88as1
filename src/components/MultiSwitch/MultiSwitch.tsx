import React, { FC, useState } from "react";
import styled from "styled-components/macro";
import { device } from "../../utils/breakpoints";

const CLASSNAME_PREFIX = "react-multi-switch";

export type OptionType = {
  label: string;
  value: string;
};

type StylingPropsTypes = {
  border: string | number;
  backgroundColor: string;
  selectedBackgroundColor: string;
  wrapperBorderRadius: number;
  optionBorderRadius: number;
  fontSize: number;
  fontColor: string;
  selectedFontColor: string;
  selectionIndicatorMargin: number;
};

export interface MultiSwitchProps extends Partial<StylingPropsTypes> {
  options: Array<OptionType>;
  onChange?: (selectedOptionValue: string) => void;
  initialSelectedIndex?: number;
  disabled?: boolean;
  name?: string;
}

/**
 * A component that allows multiple answer options to choose from
 * @param props
 * @constructor
 */
const MultiSwitch: FC<MultiSwitchProps> = (props) => {
  const {
    onChange = (): void => {},
    options = [],
    initialSelectedIndex = 0,
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(
    !!options[initialSelectedIndex] ? initialSelectedIndex : 0
  );

  const {
    border = "1px solid white",
    wrapperBorderRadius = 50,
    optionBorderRadius = 50,
    backgroundColor = defaultColors.backgroundColor,
    selectedBackgroundColor = defaultColors.selectedBackgroundColor,
    fontSize = 16,
    fontColor = defaultColors.fontColor,
    selectedFontColor = defaultColors.selectedFontColor,
    selectionIndicatorMargin = 2,
    disabled = false,
    name,
  } = props;

  const handleOnClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    e.preventDefault();
    if (!disabled && index !== selectedIndex) {
      setSelectedIndex(index);
      onChange(options[index].value);
    }
  };

  const renderOptions = (): React.ReactElement[] => {
    return options.map((option, index) => {
      const isSelected = selectedIndex === index;
      const optionId = `${name ?? "rms"}-option-${index}`;

      const labelRawTextProps = {
        fontSize,
        fontColor: fontColor,
        selectedFontColor: selectedFontColor,
      };

      return (
        <OptionItem
          key={optionId}
          optionsAmount={options.length}
          currentIndex={index}
          className={`${CLASSNAME_PREFIX}-option ${CLASSNAME_PREFIX}-option-${
            isSelected ? "selected" : "unselected"
          }`}
          optionBorderRadius={optionBorderRadius}
        >
          <OptionItemLabel
            className={`${CLASSNAME_PREFIX}-option-label`}
            selected={isSelected}
            disabled={disabled}
            aria-disabled={disabled}
            htmlFor={optionId}
            {...labelRawTextProps}
          >
            <>
              <OptionInput
                type="radio"
                id={optionId}
                name={name}
                onChange={(e): void => handleOnClick(e, index)}
                checked={isSelected}
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
              />
              {option.label}
            </>
          </OptionItemLabel>
        </OptionItem>
      );
    });
  };

  if (!options.length) return null;
  return (
    <MultiSwitchWrapper
      selectedIndex={selectedIndex}
      optionsAmount={options.length}
      className={`${CLASSNAME_PREFIX}-wrapper ${
        disabled ? `${CLASSNAME_PREFIX}-disabled` : ""
      }`}
      border={border}
      backgroundColor={backgroundColor}
      selectedBackgroundColor={selectedBackgroundColor}
      wrapperBorderRadius={wrapperBorderRadius}
      optionBorderRadius={optionBorderRadius}
      selectionIndicatorMargin={selectionIndicatorMargin}
      disabled={disabled}
      role={"radiogroup"}
      aria-labelledby={name}
    >
      {renderOptions()}
    </MultiSwitchWrapper>
  );
};

export default MultiSwitch;

const defaultColors = {
  backgroundColor: "transparent",
  selectedBackgroundColor: "white",
  fontColor: "#fff",
  selectedFontColor: "#fff",
};

interface MultiSwitchWrapperPropTypes
  extends Pick<
    StylingPropsTypes,
    | "border"
    | "backgroundColor"
    | "selectedBackgroundColor"
    | "wrapperBorderRadius"
    | "optionBorderRadius"
    | "selectionIndicatorMargin"
  > {
  selectedIndex: number;
  optionsAmount: number;
  disabled: boolean;
}

const MultiSwitchWrapper = styled("div")<MultiSwitchWrapperPropTypes>`
  display: flex;
  flex-direction: row;
  border-radius: ${({ wrapperBorderRadius }) => `${wrapperBorderRadius}px`};
  border: ${(props) => props.border};
  background: ${(props) => props.backgroundColor};
  width: 100%;
  height: 100%;
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  overflow: hidden;

  @media ${device.mobileL} {
    flex-direction: column;
    border-radius: 0px;
    border: none;
  }

  &::before {
    top: 50%;
    left: ${(props) => (props.selectedIndex / props.optionsAmount) * 100}%;
    content: "";
    position: absolute;
    padding: 2px;
    height: 100%;
    width: calc(
      ${(props) => (1 / props.optionsAmount) * 100}%${" - "}${(props) =>
  2 * props.selectionIndicatorMargin}px
    );
    border-radius: ${({ optionBorderRadius }) => `${optionBorderRadius}px`};
    border: ${(props) => props.border};
    background: ${(props) => props.selectedBackgroundColor};
    opacity: 0.3;
    transition: left 0.2s ease, top 0.2s ease, background 0.2s ease;
    transform: translateY(-50%);
    z-index: 1;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

    @media ${device.mobileL} {
      top: ${(props) => (props.selectedIndex / props.optionsAmount) * 100}%;
      left: auto;
      height: calc(
          ${(props) => (1 / props.optionsAmount) * 100}%${" - "}${(props) =>
  2 * props.selectionIndicatorMargin}px
      );
      width: 100%;
      border-radius: 0px;   
      border: 0px;
      transform: translateY(0%);
    }
`;

interface OptionItemPropsTypes
  extends Pick<StylingPropsTypes, "optionBorderRadius"> {
  optionsAmount: number;
  currentIndex: number;
}

const OptionItem = styled("div")<OptionItemPropsTypes>`
  display: flex;
  align-items: center;
  height: 100%;
  width: ${(props) => (1 / props.optionsAmount) * 100}%;

  @media ${device.mobileL} {
    width: 100%;
    border-radius: ${({ currentIndex, optionsAmount, optionBorderRadius }) =>
      currentIndex !== 0 && currentIndex !== optionsAmount - 1
        ? `0px`
        : `10px`};
    border-bottom-left-radius: ${({ currentIndex }) =>
      currentIndex === 0 && "0px"};
    border-bottom-right-radius: ${({ currentIndex }) =>
      currentIndex === 0 && "0px"};
    border-top-right-radius: ${({ currentIndex, optionsAmount }) =>
      currentIndex === optionsAmount - 1 && "0px"};
    border-top-left-radius: ${({ currentIndex, optionsAmount }) =>
      currentIndex === optionsAmount - 1 && "0px"};
    border: ${() => "white 1px solid"};
    border-top: ${({ currentIndex, optionsAmount }) =>
      currentIndex === optionsAmount - 1 && "none"};
    border-bottom: ${({ currentIndex }) => currentIndex === 0 && "none"};
  }
`;

interface OptionItemLabelPropsTypes
  extends Partial<
    Pick<StylingPropsTypes, "fontSize" | "fontColor" | "selectedFontColor">
  > {
  selected: boolean;
  disabled: boolean;
}

const OptionItemLabel = styled("label")<OptionItemLabelPropsTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  text-align: center;
  transition: color 0.2s ease;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: ${(props) => props.fontSize + "px"};
  font-weight: 700;
  color: ${(props) =>
    props.selected ? props.selectedFontColor : props.fontColor};

  @media ${device.mobileL} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
`;

const OptionInput = styled("input")`
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
  position: absolute;
  pointer-events: none;
`;

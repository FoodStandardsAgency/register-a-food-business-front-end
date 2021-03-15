import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  Input as StyledInput,
  LabelText,
  Label
} from "@slice-and-dice/govuk-react";
import multiInputInput from "multi-input-input";
import { withTranslation, i18n } from "../../i18n.js";

const StyledLabel = styled(Label)(
  {
    marginRight: "20px",
    marginBottom: 0
  },
  ({ year }) => ({
    width: year ? "70px" : "50px"
  })
);

const StyledList = styled("div")({
  display: "flex"
});

class Input extends React.Component {
  inputs = {};

  renderInput(label, name, key, defaultValue, error) {
    return (
      <StyledLabel year={key === "year"}>
        <LabelText> {label}</LabelText>
        <StyledInput
          name={name}
          error={error}
          type="number"
          defaultValue={defaultValue}
          value={this.props.value ? this.props.value[key] : undefined}
          onChange={(e) => this.props.onChange(e, key)}
          onBlur={(e) => this.props.onBlur(e, key)}
          onFocus={(e) => this.props.onFocus(e, key)}
          ref={(input) => {
            this.inputs[key] = input;
            this.props.refs(this.inputs);
          }}
        />
      </StyledLabel>
    );
  }
  renderInputWithSpacing(label, name, key, defaultValue, error) {
    return (
      <StyledLabel year={key === "year"}>
        <LabelText> &nbsp;&nbsp;{label}</LabelText>
        <StyledInput
          name={name}
          error={error}
          type="number"
          defaultValue={defaultValue}
          value={this.props.value ? this.props.value[key] : undefined}
          onChange={(e) => this.props.onChange(e, key)}
          onBlur={(e) => this.props.onBlur(e, key)}
          onFocus={(e) => this.props.onFocus(e, key)}
          ref={(input) => {
            this.inputs[key] = input;
            this.props.refs(this.inputs);
          }}
        />
      </StyledLabel>
    );
  }

  render() {
    const { labels, names, defaultValues, error } = this.props;
    return (
      <StyledList>
        {/* TODO: text should be configurable  */}
        {this.renderInput(
          this.props.t(labels.day),
          names.day,
          "day",
          defaultValues.day,
          error
        )}

        {i18n.language === "en"
          ? this.renderInput(
              labels.month,
              names.month,
              "month",
              defaultValues.month,
              error
            )
          : this.renderInputWithSpacing(
              this.props.t(labels.month),
              names.month,
              "month",
              defaultValues.month,
              error
            )}
        {this.renderInput(
          this.props.t(labels.year),
          names.year,
          "year",
          defaultValues.year,
          error
        )}
      </StyledList>
    );
  }
}

Input.propTypes = {
  names: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string
  }),
  defaultValues: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string
  }),
  value: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number
  }),
  labels: PropTypes.shape({
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string
  }),
  /**
   * This comes from the multiInputInput HOC and is needed to track all 3 inputs
   */
  refs: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  error: PropTypes.bool
};

Input.defaultProps = {
  value: undefined,
  names: {
    day: "DateFieldDay",
    month: "DateFieldMonth",
    year: "DateFieldYear"
  },
  defaultValues: {
    day: "",
    month: "",
    year: ""
  },
  labels: {
    day: "Day",
    month: "Month",
    year: "Year"
  },
  error: false
};

// This component is dependent on multiInputInput HOC so we always export with HOC
export default withTranslation("common")(multiInputInput(Input));

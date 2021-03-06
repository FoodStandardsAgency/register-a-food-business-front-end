import { HintText } from "@slice-and-dice/govuk-react";
import {
  FONT_SIZE,
  MEDIA_QUERIES
} from "@slice-and-dice/govuk-react-constants";
import styled from "@emotion/styled";

const HintTextSmall = styled(HintText)({
  fontSize: FONT_SIZE.SIZE_16,
  [MEDIA_QUERIES.LARGESCREEN]: {
    fontSize: FONT_SIZE.SIZE_16
  }
});

export default HintTextSmall;

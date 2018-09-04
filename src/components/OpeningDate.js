import { FsaLayout, ContentItem, BackButton, ContinueButton } from "./";
import {
  Header,
  HiddenText,
  Paragraph,
  DateInput,
  HintText
} from "govuk-react";
import moment from "moment";
import PropTypes from "prop-types";

const OpeningDate = props => {
  return (
    <FsaLayout {...props}>
      {props.cumulativeAnswers.establishment_opening_status ===
      "Establishment is not trading yet" ? (
        <BackButton
          editMode={props.editMode}
          originator="establishment-opening-date-proactive"
        />
      ) : (
        <BackButton
          editMode={props.editMode}
          originator="establishment-opening-date-retroactive"
        />
      )}
      <Header level={2}>Trading date</Header>

      <ContentItem.B_30_15>
        <HintText>
          Establishments begin trading when they first start serving or
          manufacturing food for customers.
        </HintText>
      </ContentItem.B_30_15>

      <HiddenText
        id="hiddenTextEstablishment"
        summaryText={"What is an establishment?"}
      >
        <Paragraph mb={0}>
          An establishment is the location of your food business, and the food
          activities taking place there. If it is a mobile food business, please
          use the location where it is normally stored overnight.
        </Paragraph>
      </HiddenText>
      {props.cumulativeAnswers.establishment_opening_status ===
      "Establishment is not trading yet" ? (
        <form
          action={`/continue/establishment-opening-date-proactive/${
            props.editMode
          }`}
          method="post"
        >
          <div>
            <DateInput
              inputNames={{ day: "day", month: "month", year: "year" }}
              hintText={`For example, ${moment()
                .add(40, "d")
                .format("DD MM YYYY")}`}
              errorText={props.validatorErrors.establishment_opening_date}
              id="establishment_opening_date"
            >
              <span className="bold">
                When is this establishment expected to begin trading?
              </span>
            </DateInput>
            <HiddenText
              id="hiddenTextTradingDate"
              summaryText={
                "I don't know when this establishment will begin trading"
              }
            >
              <Paragraph mb={0}>
                Food businesses are required to register at least 28 days before
                they begin trading. If you are not sure when this business will
                open, it may be too early to register. You can also use an
                estimated date.
              </Paragraph>
            </HiddenText>
          </div>

          <ContinueButton editMode={props.editMode} />
        </form>
      ) : (
        <form
          action={`/continue/establishment-opening-date-retroactive/${
            props.editMode
          }`}
          method="post"
        >
          <DateInput
            inputNames={{ day: "day", month: "month", year: "year" }}
            hintText="For example, 14 09 2017"
            errorText={props.validatorErrors.establishment_opening_date}
            id="establishment_opening_date"
          >
            <span className="bold">
              What date did this establishment begin trading?
            </span>
          </DateInput>
          <HiddenText
            summaryText={"I don't know when this establishment began trading"}
          >
            <Paragraph mb={0}>
              Trading begins the day your business started to serve or make food
              or the day you took over the business as an operator. If you do
              not remember the exact date, use an estimated date.
            </Paragraph>
          </HiddenText>
          <ContinueButton editMode={props.editMode} />
        </form>
      )}
    </FsaLayout>
  );
};
export default OpeningDate;

OpeningDate.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};

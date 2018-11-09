import { FsaLayout, ContentItem, BackButton, ContinueButton } from "./";
import {
  Header,
  HiddenText,
  Paragraph,
  DateField,
  HintText
} from "govuk-react";
import moment from "moment";
import PropTypes from "prop-types";

const OpeningDate = props => {
  return (
    <FsaLayout {...props}>
      <BackButton {...props} />

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
      {props.cumulativeFullAnswers.establishment_opening_status ===
      "Establishment is not trading yet" ? (
        <form action={props.formAction} method="post">
          <div>
            <DateField
              defaultValues={{
                day: props.cumulativeFullAnswers.day,
                month: props.cumulativeFullAnswers.month,
                year: props.cumulativeFullAnswers.year
              }}
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
            </DateField>

            <ContentItem.B_30_15>
              <HiddenText
                id="hiddenTextTradingDate"
                summaryText={
                  "I don't know when this establishment will begin trading"
                }
              >
                <Paragraph mb={0}>
                  Food businesses are required to register at least 28 days
                  before they begin trading. If you are not sure when this
                  business will open, it may be too early to register. You can
                  also use an estimated date.
                </Paragraph>
              </HiddenText>
            </ContentItem.B_30_15>
          </div>

          <ContinueButton {...props} />
        </form>
      ) : (
        <form action={props.formAction} method="post">
          <DateField
            defaultValues={{
              day: props.cumulativeFullAnswers.day,
              month: props.cumulativeFullAnswers.month,
              year: props.cumulativeFullAnswers.year
            }}
            inputNames={{ day: "day", month: "month", year: "year" }}
            hintText={`For example, ${moment()
              .subtract(40, "d")
              .format("DD MM YYYY")}`}
            errorText={props.validatorErrors.establishment_opening_date}
            id="establishment_opening_date"
          >
            <span className="bold">
              What date did this establishment begin trading?
            </span>
          </DateField>

          <ContentItem.B_30_15>
            <HiddenText
              summaryText={"I don't know when this establishment began trading"}
            >
              <Paragraph mb={0}>
                Trading begins the day your business started to serve or make
                food or the day you took over the business as an operator. If
                you do not remember the exact date, use an estimated date.
              </Paragraph>
            </HiddenText>
          </ContentItem.B_30_15>

          <ContinueButton {...props} />
        </form>
      )}
    </FsaLayout>
  );
};
export default OpeningDate;

OpeningDate.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};

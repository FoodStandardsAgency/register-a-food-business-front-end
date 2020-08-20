import {
  FsaLayout,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  FsaDateField,
  PostForm
} from "./index";
import { Heading, Paragraph, HintText } from "govuk-react";
import moment from "moment";
import PropTypes from "prop-types";

const OpeningDate = (props) => {
  return (
    <FsaLayout {...props}>
      <BackButton {...props} />
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        Trading date
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          Establishments begin trading when they first start serving or
          manufacturing food for customers.
        </HintText>
      </ContentItem.B_30_15>
      <HiddenTextAccessible
        hiddentextindex={1}
        id="hiddenTextEstablishment"
        summary={"What is an establishment?"}
      >
        <Paragraph mb={0}>
          An establishment is the location of your food business, and the food
          activities taking place there. If it is a mobile food business, please
          use the location where it is normally stored overnight.
        </Paragraph>
      </HiddenTextAccessible>
      {props.cumulativeFullAnswers.establishment_opening_status ===
      "Establishment is not trading yet" ? (
        <PostForm action={props.formAction} csrfToken={props.csrfToken}>
          <div>
            <FsaDateField
              defaultValues={{
                day: props.cumulativeFullAnswers.day,
                month: props.cumulativeFullAnswers.month,
                year: props.cumulativeFullAnswers.year
              }}
              inputNames={{
                day: "day",
                month: "month",
                year: "year"
              }}
              hintText={`For example, ${moment()
                .add(40, "d")
                .format("DD MM YYYY")}`}
              errorText={props.validatorErrors.establishment_opening_date}
              id="establishment_opening_date"
            >
              <span className="bold">
                When is this establishment expected to begin trading?
              </span>
            </FsaDateField>

            <ContentItem.B_30_15>
              <HiddenTextAccessible
                hiddentextindex={2}
                id="hiddenTextTradingDate"
                summary={
                  "I don't know when this establishment will begin trading"
                }
              >
                <Paragraph mb={0}>
                  Food businesses are required to register at least 28 days
                  before they begin trading. If you are not sure when this
                  business will open, it may be too early to register. You can
                  also use an estimated date.
                </Paragraph>
              </HiddenTextAccessible>
            </ContentItem.B_30_15>
          </div>

          <ContinueButton {...props} />
        </PostForm>
      ) : (
        <PostForm action={props.formAction} csrfToken={props.csrfToken}>
          <FsaDateField
            defaultValues={{
              day: props.cumulativeFullAnswers.day,
              month: props.cumulativeFullAnswers.month,
              year: props.cumulativeFullAnswers.year
            }}
            inputNames={{
              day: "day",
              month: "month",
              year: "year"
            }}
            hintText={`For example, ${moment()
              .subtract(40, "d")
              .format("DD MM YYYY")}`}
            errorText={props.validatorErrors.establishment_opening_date}
            id="establishment_opening_date"
          >
            <span className="bold">
              What date did this establishment begin trading?
            </span>
          </FsaDateField>

          <ContentItem.B_30_15>
            <HiddenTextAccessible
              hiddentextindex={3}
              summary={"I don't know when this establishment began trading"}
            >
              <Paragraph mb={0}>
                Trading begins the day your business started to serve or make
                food. Alternatively, it can be the day you took over the
                business as an operator. If you do not remember the exact date,
                use an estimated date.
              </Paragraph>
            </HiddenTextAccessible>
          </ContentItem.B_30_15>

          <ContinueButton {...props} />
        </PostForm>
      )}
    </FsaLayout>
  );
};
export default OpeningDate;

OpeningDate.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};

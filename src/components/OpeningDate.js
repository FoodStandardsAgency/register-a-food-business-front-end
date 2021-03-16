import {
  FsaLayout,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "./index";
import {
  Fieldset,
  Heading,
  Paragraph,
  HintText,
  DateField
} from "@slice-and-dice/govuk-react";
import moment from "moment";
import PropTypes from "prop-types";
import { withTranslation } from "../../i18n.js";

const OpeningDate = (props) => {
  return (
    <FsaLayout {...props}>
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        {props.cumulativeFullAnswers.establishment_opening_status ===
        "Establishment due to trade"
          ? props.t("Expected opening date")
          : props.t("Opening Date")}
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          {props.t(
            "Establishments begin trading when they first start serving or manufacturing food for customers."
          )}
        </HintText>
      </ContentItem.B_30_15>
      <HiddenTextAccessible
        hiddentextindex={1}
        id="hiddenTextEstablishment"
        summary={props.t("What is an establishment?")}
        {...props}
      >
        <Paragraph mb={0}>
          {props.t(
            "An establishment is the location of your food business, and the food activities taking place there. If it is a mobile food business, please use the location where it is normally stored overnight."
          )}
        </Paragraph>
      </HiddenTextAccessible>
      {props.cumulativeFullAnswers.establishment_opening_status ===
      "Establishment due to trade" ? (
        <PostForm action={props.formAction} csrfToken={props.csrfToken}>
          <Fieldset>
            <div>
              <DateField
                {...props}
                defaultValues={{
                  day: props.cumulativeFullAnswers.day,
                  month: props.cumulativeFullAnswers.month,
                  year: props.cumulativeFullAnswers.year
                }}
                labels={{
                  day: props.t("Day"),
                  month: props.t("Month"),
                  year: props.t("Year")
                }}
                inputNames={{
                  day: "day",
                  month: "month",
                  year: "year"
                }}
                hintText={`${props.t("For example")}, ${moment()
                  .add(40, "d")
                  .format("DD MM YYYY")}`}
                errorText={props.validatorErrors.establishment_opening_date}
                id="establishment_opening_date"
              >
                <Fieldset.Legend>
                  <span className="bold">
                    {props.t(
                      "When is this establishment expected to begin trading?"
                    )}
                  </span>
                </Fieldset.Legend>
              </DateField>

              <ContentItem.B_30_15>
                <HiddenTextAccessible
                  hiddentextindex={2}
                  id="hiddenTextTradingDate"
                  summary={props.t(
                    "I don't know when this establishment will begin trading"
                  )}
                >
                  <Paragraph mb={0}>
                    {props.t(
                      "Food businesses are required to register at least 28 days before they begin trading. If you are not sure when this business will open, it may be too early to register. You can also use an estimated date."
                    )}
                  </Paragraph>
                </HiddenTextAccessible>
              </ContentItem.B_30_15>
            </div>
          </Fieldset>

          <ContinueButton {...props} />
        </PostForm>
      ) : (
        <PostForm action={props.formAction} csrfToken={props.csrfToken}>
          <Fieldset>
            <DateField
              defaultValues={{
                day: props.cumulativeFullAnswers.day,
                month: props.cumulativeFullAnswers.month,
                year: props.cumulativeFullAnswers.year
              }}
              labels={{
                day: props.t("Day"),
                month: props.t("Month"),
                year: props.t("Year")
              }}
              inputNames={{
                day: "day",
                month: "month",
                year: "year"
              }}
              errorPrefix={`${props.t("Error")}: `}
              hintText={`${props.t("For example")}, ${moment()
                .subtract(40, "d")
                .format("DD MM YYYY")}`}
              errorText={props.t(
                props.validatorErrors.establishment_opening_date
              )}
              id="establishment_opening_date"
            >
              <Fieldset.Legend>
                <span className="bold">
                  {props.t("What date did this establishment begin trading?")}
                </span>
              </Fieldset.Legend>
            </DateField>

            <ContentItem.B_30_15>
              <HiddenTextAccessible
                hiddentextindex={3}
                summary={props.t(
                  "I don't know when this establishment began trading"
                )}
                {...props}
              >
                <Paragraph mb={0}>
                  {props.t(
                    "Trading begins the day your business started to serve or make food. Alternatively, it can be the day you took over the business as an operator. If you do not remember the exact date, use an estimated date."
                  )}
                </Paragraph>
              </HiddenTextAccessible>
            </ContentItem.B_30_15>
          </Fieldset>

          <ContinueButton {...props} />
        </PostForm>
      )}
    </FsaLayout>
  );
};
export default withTranslation("common")(OpeningDate);

OpeningDate.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};

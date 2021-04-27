import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { importExportEnum } from "@slice-and-dice/register-a-food-business-validation";
import {
  Heading,
  Checkbox,
  MultiChoice,
  Paragraph,
  HintText
} from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const ImportExportActivities = (props) => (
  <FsaLayout {...props}>
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ProcessedErrorSummary
        validatorErrors={props.validatorErrors}
        onHandleErrorClick={OnHandleErrorClick}
      />
      <Heading as="h1" size="LARGE">
        {props.t(
          "Will this food business import or export any food from outside the UK?"
        )}
      </Heading>
      <HintText mb={1}>
        {props.t(
          "This does not include any food imported or exported by other food businesses."
        )}
      </HintText>
      <Paragraph>{props.t("Select all that apply")}</Paragraph>

      <ContentItem.B_30_15>
        <MultiChoice
          label=""
          errorPrefix={`${props.t("Error")}: `}
          meta={{
            touched: true,
            error: props.t(props.validatorErrors.import_export_activities)
          }}
        >
          <Checkbox
            name="directly_import"
            id="import_export_activities_directly_import"
            value={importExportEnum.IMPORT.key}
            defaultChecked={props.cumulativeFullAnswers.directly_import}
          >
            {props.t("Directly import food")}
          </Checkbox>
          <Checkbox
            name="directly_export"
            id="import_export_activities_directly_export"
            value={importExportEnum.EXPORT.key}
            defaultChecked={props.cumulativeFullAnswers.directly_export}
          >
            {props.t("Directly export food")}
          </Checkbox>
          <Checkbox
            name="no_import_export"
            id="import_export_activities_none"
            value={importExportEnum.NONE.key}
            defaultChecked={props.cumulativeFullAnswers.no_import_export}
          >
            {props.t("No import or export activities")}
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <HiddenTextAccessible
          id="hiddenTextImportExportActivities"
          summary={props.t(
            "More information about import and export activities"
          )}
          {...props}
        >
          <span>
            {props.t(
              "If a food business is directly importing or exporting food outside of the UK, there are some extra requirements for the business to follow."
            )}
            <br />
            <br />
            {props.t("Find out more by visiting the")}{" "}
            <a
              href={props.t("import/export-link")}
              target="_blank"
              rel="noopener noreferrer"
              id="link-fsa-website"
            >
              {props.t("Food Standards Agency website (opens in new window)")}
            </a>
            .
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(ImportExportActivities)
);

ImportExportActivities.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};

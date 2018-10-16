import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import {
  Header,
  Checkbox,
  MultiChoice,
  Paragraph,
  HiddenText,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";

const ImportExportActivities = props => (
  <FsaLayout {...props}>
    <form
      action={props.formAction}
      method="post"
    >
      <BackButton
        editModePage={props.editModePage}
        originator="business-import-export"
      />
      <Header level={2}>
        Will this food business import or export any food from outside the UK?
      </Header>
      <HintText mb={1}>
        This does not include any food imported or exported by other food
        businesses.
      </HintText>
      <Paragraph>Select all that apply</Paragraph>

      <ContentItem.B_30_15>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.import_export_activities
          }}
        >
          <Checkbox
            name="directly_import"
            id="import_export_activities_directly_import"
            value="Directly import"
            defaultChecked={props.cumulativeAnswers.directly_import}
          >
            Directly import food
          </Checkbox>
          <Checkbox
            name="directly_export"
            id="import_export_activities_directly_export"
            value="Directly export"
            defaultChecked={props.cumulativeAnswers.directly_export}
          >
            Directly export food
          </Checkbox>
          <Checkbox
            name="no_import_export"
            id="import_export_activities_none"
            value="None"
            defaultChecked={props.cumulativeAnswers.no_import_export}
          >
            No import or export activities
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <HiddenText
          id="hiddenTextImportExportActivities"
          summaryText={"More information about import and export activities"}
        >
          <span>
            If a food business is directly importing or exporting food outside
            of the UK, there are some extra requirements for the business to
            follow.
            <br />
            <br />
            Find out more by visiting the{" "}
            <a
              href="https://www.food.gov.uk/business-guidance/imports-exports"
              target="_blank"
              rel="noopener noreferrer"
              id="link-fsa-website"
            >
              Food Standards Agency website
            </a>.
          </span>
        </HiddenText>
      </ContentItem.B_30_15>

      <ContinueButton editModePage={props.editModePage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(ImportExportActivities);

ImportExportActivities.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};

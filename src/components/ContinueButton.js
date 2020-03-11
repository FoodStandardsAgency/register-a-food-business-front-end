import { Button } from 'govuk-react'
import { ButtonArrow } from '@govuk-react/icons'

const ContinueButton = props => (
  <Button
    onClick={props.onClick}
    disabled={props.disabled}
    id="continue-button"
    type="submit"
    icon={props.type === 'begin' ? <ButtonArrow /> : null}
    start={props.type === 'begin'}>
    {props.type === 'begin'
      ? 'Begin registration'
      : props.type === 'submit'
        ? 'Submit'
        : props.editModeFirstPage
          ? 'Save and continue'
          : 'Continue'}
  </Button>
)

export default ContinueButton

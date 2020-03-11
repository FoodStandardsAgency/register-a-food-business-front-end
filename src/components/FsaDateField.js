import { DateField } from 'govuk-react'
import styled from 'react-emotion'

const FsaDateField = styled(DateField)`
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

export default FsaDateField

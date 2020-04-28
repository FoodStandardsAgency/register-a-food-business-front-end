import { SessionWrapper } from "../src/components";
import PropTypes from "prop-types";
import OpeningDate from "../src/components/OpeningDate";

const EstablishmentOpeningDate = (props) => <OpeningDate {...props} />;

export default SessionWrapper(EstablishmentOpeningDate);

EstablishmentOpeningDate.propTypes = {
    cumulativeFullAnswers: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    ),
    validatorErrors: PropTypes.objectOf(PropTypes.string),
    switches: PropTypes.objectOf(PropTypes.bool)
};

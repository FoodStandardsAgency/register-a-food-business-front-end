const OnHandleErrorClick = (targetName) => {
    if (targetName === "establishment_opening_status") {
        let targetTradingDate =
            document.getElementsByName(targetName)[0] ||
            document.getElementById(targetName) ||
            document.getElementById("establishment_opening_date");
        targetTradingDate.scrollIntoView();
    } else {
        let targetElement =
            document.getElementsByName(targetName)[0] ||
            document.getElementById(targetName);
        targetElement.scrollIntoView();
    }
};

export default OnHandleErrorClick;

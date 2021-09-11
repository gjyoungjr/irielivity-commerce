 // helper fxn check fields
 const checkEmail = (field, fieldData, setIsEmailSame) => {
    if (field === fieldData) {
      setIsEmailSame(true);
    } else {
      setIsEmailSame(false);
    }
  };
  const checkFirstName = (field, fieldData, setIsFirstNameSame) => {
    if (field === fieldData) {
      setIsFirstNameSame(true);
    } else {
      setIsFirstNameSame(false);
    }
  };
  const checkLastName = (field, fieldData, setIsLastNameSame) => {
    if (field === fieldData) {
      setIsLastNameSame(true);
    } else {
      setIsLastNameSame(false);
    }
  };


  export {checkEmail, checkLastName, checkFirstName}
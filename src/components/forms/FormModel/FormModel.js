const LoginFormModel = {
  formId: "LoginForm",
  formField: {
    email: {
      name: "email",
      label: "Email address",
      requiredErrorMsg: "E-mail is required",
      invalidErrorMsg: "Please Enter a valid email address",
    },
    password: {
      name: "password",
      label: "Password",
      requiredErrorMsg: "Password is required",
      invalidErrorMsg:
        "Password must have alteast eight characters, one uppercase letter and one number:",
    },
  },
};
const RegisterFormModel = {
  formId: "RegisterForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "First Name ",
      requiredErrorMsg: "First Name is required",
    },
    lastName: {
      name: "lastName",
      label: "Last Name ",
      requiredErrorMsg: "Last Name is required",
    },
    _email: {
      name: "_email",
      label: "E-mail address",
      requiredErrorMsg: "Email is required",
      invalidErrorMsg: "Please Enter a valid email address",
    },
    _password: {
      name: "_password",
      label: "Password",
      requiredErrorMsg: "Password is required",
      invalidErrorMsg:
        "Password must have alteast eight characters, one uppercase letter and one number:",
    },
  },
};

const ResetPasswordFormModel = {
  formId: "ForgotPasswordForm",
  formField: {
    recoveryEmail: {
      name: "recoveryEmail",
      label: "Email address",
      requiredErrorMsg: "Email is required",
      invalidErrorMsg: "Please Enter a valid email address",
    },
  },
};
//   const AccountDetailsFormModel = {
//     formId: "AccountDetailsFormModel",
//     formField: {
//       accountFirstName: {
//         name: "accountFirstName",
//         label: "First Name",
//         requiredErrorMsg: "First Name is required",
//       },
//       accountLastName: {
//         name: "accountLastName",
//         label: "Last Name",
//         requiredErrorMsg: "Last Name is required",
//       },
//       accountEmail: {
//         name: "accountEmail",
//         label: "Email address",
//         requiredErrorMsg: "Email is required",
//         invalidErrorMsg: "Please Enter a valid email address",
//       },
//     },
//   };

const AdminAccountDetailsFormModel = {
  formId: "AdminAccountDetailsFormModel",
  formField: {
    adminFirstName: {
      name: "adminFirstName",
      label: "First Name",
      requiredErrorMsg: "First Name is required",
    },
    adminLastName: {
      name: "adminLastName",
      label: "Last Name",
      requiredErrorMsg: "Last Name is required",
    },
    adminEmail: {
      name: "adminEmail",
      label: "Email address",
      requiredErrorMsg: "Email is required",
      invalidErrorMsg: "Please Enter a valid email address",
    },
  },
};

//   const ChangePasswordFormModel = {
//     formId: "ChangePasswordFormModel",
//     formField: {
//       newPassword: {
//         name: "newPassword",
//         label: "Password",
//         requiredErrorMsg: "Password is required",
//         invalidErrorMsg:
//           "Password must have alteast eight characters, one uppercase letter and one number:",
//       },
//     },
//   };

//   const ReauthFormModel = {
//     formId: "ReauthFormModel",
//     formField: {
//       reauthEmail: {
//         name: "reauthEmail",
//         label: "Email address",
//         requiredErrorMsg: "Email is required",
//         invalidErrorMsg: "Please Enter a valid email address",
//       },
//       reauthPassword: {
//         name: "reauthPassword",
//         label: "Password",
//         requiredErrorMsg: "Password is required",
//         invalidErrorMsg:
//           "Password must have alteast eight characters, one uppercase letter and one number:",
//       },
//     },
//   };

const AddProductFormModel = {
  formId: "AddProductFormModel",
  formField: {
    productName: {
      name: "productName",
      label: "Product Name",
      requiredErrorMsg: "Product name is required",
    },
    productPrice: {
      name: "productPrice",
      label: "Product Price",
      requiredErrorMsg: "Product price is required",
      invalidErrorMsg: "Invalid input",
    },
    productDiscount: {
      name: "productDiscount",
      label: "Percentage discount",
    },

    productDescription: {
      name: "productDescription",
      label: "Product Description",
      requiredErrorMsg: "Product description is required",
    },
    category: {
      name: "category",
      label: "Product main category",
      requiredErrorMsg: "Product category is required",
    },

    subCategory: {
      name: "subCategory",
      label: "Product sub category",
      requiredErrorMsg: "Product sub category is required",
    },

    mainImgUrl: {
      name: "mainImgUrl",
      requiredErrorMsg: "Adding an image is required",
    },
    subImages: {
      name: "subImages",
    },
    materials: {
      name: "materials",
      label: "Enter product materials",
      requiredErrorMsg: "Minimum of 1 material is required.",
    },
    fit: {
      name: "fit",
      label: "Select product fit",
    },
    sizes: {
      name: "sizes",
      label: "Enter product sizes",
    },
    dimensions: {
      name: "dimensions",
      label: "Enter product dimensions",
      requiredErrorMsg: "Dimensions is required",
    },
    quantity: {
      name: "quantity",
      label: "Enter product quantity",
      requiredErrorMsg: "Product quantity is required",
    },
    colors: {
      name: "colors",
      label: "Enter product color",
    },
  },
};

const CheckOutFormModel = {
  formId: "CheckOutFormModel",
  formField: {
    first_Name: {
      name: "first_Name",
      label: "First Name",
      requiredErrorMsg: "First name is required",
    },
    last_Name: {
      name: "last_Name",
      label: "Last Name",
      requiredErrorMsg: "Last name is required",
    },
    e_mail: {
      name: "e_mail",
      label: "E-mail",
      requiredErrorMsg: "E-mail is required",
      invalidErrorMsg: "Please Enter a valid e-mail address",
    },
    phoneNumber: {
      name: "phoneNumber",
      label: "Phone number (Optional)",
      // requiredErrorMsg: "E-mail is required",
      // invalidErrorMsg: "Please Enter a valid e-mail address",
    },
    address1: {
      name: "address1",
      label: "Address",
      requiredErrorMsg: "Address is required",
    },
    town_city: {
      name: "town_city",
      label: "City/Town",
      requiredErrorMsg: "City/Town is required.",
    },
    country: {
      name: "country",
      label: "Country",
      requiredErrorMsg: "Country is required.",
    },
    zip: {
      name: "zip",
      label: "Zip",
      requiredErrorMsg: "Zip is required.",
    },
    state: {
      name: "state",
      label: "State",
    },
    deliveryMethod: {
      name: "deliveryMethod",
      requiredErrorMsg: "Delivery method is required.",
    },
    paymentMethod: {
      name: "paymentMethod",
      requiredErrorMsg: "Payment method is required.",
    },
    paymentReceipt: {
      name: "paymentReceipt",
      requiredErrorMsg: "Payment upload of receipt is required.",
    },
    billingName: {
      name: "billingName",
      label: "Name on card",
      requiredErrorMsg: "This field is required",
    },
    billingAddress: {
      name: "billingAddress",
      label: "Address",
      requiredErrorMsg: "This field is required",
    },
    billingCity: {
      name: "billingCity",
      label: "City",
      requiredErrorMsg: "This field is required",
    },
    billingState: {
      name: "billingState",
      label: "State",
      requiredErrorMsg: "This field is required",
    },
    billingPostalCode: {
      name: "billingPostalCode",
      label: "State",
      requiredErrorMsg: "This field is required",
    },
  },
};

//   const ProductReviewFormModel = {
//     formId: "ProductReviewFormModel",
//     formField: {
//       subject: {
//         name: "subject",
//         label: "Subject",
//         requiredErrorMsg: "Subject is required",
//       },
//       message: {
//         name: "message",
//         label: "Message",
//         requiredErrorMsg: "Message is required",
//       },
//       rating: {
//         name: "rating",
//         requiredErrorMsg: "Rating is required",
//       },
//     },
//   };

export {
  LoginFormModel,
  RegisterFormModel,
  ResetPasswordFormModel,
  // AccountDetailsFormModel,
  // ChangePasswordFormModel,
  // ReauthFormModel,
  AddProductFormModel,
  CheckOutFormModel,
  // ProductReviewFormModel,
  AdminAccountDetailsFormModel,
};

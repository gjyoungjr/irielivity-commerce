import * as Yup from "yup";
import {
  LoginFormModel,
  RegisterFormModel,
  ResetPasswordFormModel,
  //   AccountDetailsFormModel,
  //   ChangePasswordFormModel,
  //   ReauthFormModel,
  AddProductFormModel,
  CheckOutFormModel,
  //   ProductReviewFormModel,
  AdminAccountDetailsFormModel,
} from "./FormModel";

// grabs form fields
const {
  formField: { email, password },
} = LoginFormModel;
const {
  formField: { _email, _password, firstName, lastName },
} = RegisterFormModel;
const {
  formField: { recoveryEmail },
} = ResetPasswordFormModel;
// const {
//   formField: { accountLastName, accountFirstName, accountEmail },
// } = AccountDetailsFormModel;
const {
  formField: { adminEmail, adminFirstName, adminLastName },
} = AdminAccountDetailsFormModel;

// const {
//   formField: { newPassword },
// } = ChangePasswordFormModel;
// const {
//   formField: { reauthEmail, reauthPassword },
// } = ReauthFormModel;
const {
  formField: {
    productDescription,
    productName,
    productPrice,
    category,
    subCategory,
    quantity,
    materials,
  },
} = AddProductFormModel;

const {
  formField: {
    first_Name,
    last_Name,
    e_mail,
    address1,
    town_city,
    country,
    zip,
  },
} = CheckOutFormModel;

// const {
//   formField: { subject, message, rating },
// } = ProductReviewFormModel;

// password regex validaiton
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// log in form validaiton schema
const LoginValidationSchema = Yup.object().shape({
  [email.name]: Yup.string()
    .required(`${email.requiredErrorMsg}`)
    .email(`${email.invalidErrorMsg}`),
  [password.name]: Yup.string()
    .required(`${password.requiredErrorMsg}`)
    .matches(passwordRegex, `${password.invalidErrorMsg}`),
});

// register form validaiton shcema
const registerValidationSchema = Yup.object().shape({
  [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
  [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
  [_email.name]: Yup.string()
    .required(`${_email.requiredErrorMsg}`)
    .email(`${_email.invalidErrorMsg}`),
  [_password.name]: Yup.string()
    .required(`${_password.requiredErrorMsg}`)
    .matches(passwordRegex, `${_password.invalidErrorMsg}`),
});

// forgot password form validaiton schema
const resetPasswordValidationSchema = Yup.object().shape({
  [recoveryEmail.name]: Yup.string()
    .required(`${recoveryEmail.requiredErrorMsg}`)
    .email(`${recoveryEmail.invalidErrorMsg}`),
});

// // account details form validaiton schema
// const accountDetailsValidationSchema = Yup.object().shape({
//   [accountEmail.name]: Yup.string()
//     .required(`${accountEmail.requiredErrorMsg}`)
//     .email(`${accountEmail.invalidErrorMsg}`),
//   [accountFirstName.name]: Yup.string().required(
//     `${accountFirstName.requiredErrorMsg}`
//   ),
//   [accountLastName.name]: Yup.string().required(
//     `${accountLastName.requiredErrorMsg}`
//   ),
// });

const AdminAccountDetailsValidationSchema = Yup.object().shape({
  [adminEmail.name]: Yup.string()
    .required(`${adminEmail.requiredErrorMsg}`)
    .email(`${adminEmail.invalidErrorMsg}`),
  [adminFirstName.name]: Yup.string().required(
    `${adminFirstName.requiredErrorMsg}`
  ),
  [adminLastName.name]: Yup.string().required(
    `${adminLastName.requiredErrorMsg}`
  ),
});

// // account details form validaiton schema
// const changePasswordValidationSchema = Yup.object().shape({
//   [newPassword.name]: Yup.string()
//     .required(`${newPassword.requiredErrorMsg}`)
//     .matches(passwordRegex, `${newPassword.invalidErrorMsg}`),
// });

// // account details form validaiton schema
// const reauthValidationSchema = Yup.object().shape({
//   [reauthEmail.name]: Yup.string()
//     .required(`${reauthEmail.requiredErrorMsg}`)
//     .email(`${reauthEmail.invalidErrorMsg}`),
//   [reauthPassword.name]: Yup.string()
//     .required(`${reauthPassword.requiredErrorMsg}`)
//     .matches(passwordRegex, `${reauthPassword.invalidErrorMsg}`),
// });

// add product form validation shcema
const AddProductValidationSchema = [
  Yup.object().shape({
    [productDescription.name]: Yup.string().required(
      `${productDescription.requiredErrorMsg}`
    ),
    [productName.name]: Yup.string().required(
      `${productName.requiredErrorMsg}`
    ),
    [productPrice.name]: Yup.string().required(
      `${productPrice.requiredErrorMsg}`
    ),
    [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
    [subCategory.name]: Yup.string().required(
      `${subCategory.requiredErrorMsg}`
    ),
  }),
  Yup.object().shape({
    [quantity.name]: Yup.string().required(`${quantity.requiredErrorMsg}`),
    [materials.name]: Yup.array().min(1, `${materials.requiredErrorMsg}`),
  }),
];

// // check out form validation schema
const CheckOutValidationSchema = [
  Yup.object().shape({
    [first_Name.name]: Yup.string().required(`${first_Name.requiredErrorMsg}`),
    [last_Name.name]: Yup.string().required(`${last_Name.requiredErrorMsg}`),
    [e_mail.name]: Yup.string()
      .required(`${e_mail.requiredErrorMsg}`)
      .email(`${e_mail.invalidErrorMsg}`),
    [country.name]: Yup.string().required(`${country.requiredErrorMsg}`),
    [zip.name]: Yup.string().required(`${zip.requiredErrorMsg}`),
    [town_city.name]: Yup.string().required(`${town_city.requiredErrorMsg}`),
    [address1.name]: Yup.string().required(`${address1.requiredErrorMsg}`),

    // [category.name]: Yup.string().required(`${category.requiredErrorMsg}`),
    // [subCategory.name]: Yup.string().required(
    //   `${subCategory.requiredErrorMsg}`
    // ),
  }),
  // Yup.object().shape({
  //   [quantity.name]: Yup.string().required(`${quantity.requiredErrorMsg}`),
  //   [dimensions.name]: Yup.string().required(`${dimensions.requiredErrorMsg}`),
  //   [materials.name]: Yup.array().min(1, `${materials.requiredErrorMsg}`),
  // }),
];

// // product review form validation schema
// const ProductReviewValidationSchema = Yup.object().shape({
//   [subject.name]: Yup.string().required(`${subject.requiredErrorMsg}`),
//   [message.name]: Yup.string().required(`${message.requiredErrorMsg}`),
//   [rating.name]: Yup.string().required(`${rating.requiredErrorMsg}`),
// });

export {
  LoginValidationSchema,
  registerValidationSchema,
  resetPasswordValidationSchema,
  //   accountDetailsValidationSchema,
  //   changePasswordValidationSchema,
  //   reauthValidationSchema,
  AddProductValidationSchema,
  CheckOutValidationSchema,
  //   ProductReviewValidationSchema,
  AdminAccountDetailsValidationSchema,
};

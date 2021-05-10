import {
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
} from "./FormModel";

// GRABS FORM FIELDS
const {
  formField: { email, password },
} = LoginFormModel;

const {
  formField: { _email, _password, firstName, lastName },
} = RegisterFormModel;

const {
  formField: { recoveryEmail },
} = ResetPasswordFormModel;

//   const {
//     formField: { accountEmail, accountFirstName, accountLastName },
//   } = AccountDetailsFormModel;

const {
  formField: { adminEmail, adminFirstName, adminLastName },
} = AdminAccountDetailsFormModel;

//   const {
//     formField: { newPassword },
//   } = ChangePasswordFormModel;

//   const {
//     formField: { reauthEmail, reauthPassword },
//   } = ReauthFormModel;

const {
  formField: {
    first_Name,
    last_Name,
    e_mail,
    phoneNumber,
    address1,
    town_city,
    country,
    zip,
    state,
    paymentMethod,
    deliveryMethod,
    paymentReceipt,
  },
} = CheckOutFormModel;

const {
  formField: {
    productDescription,
    productName,
    productPrice,
    category,
    mainImgUrl,
    subImages,
    fit,
    materials,
    sizes,
    dimensions,
    subCategory,
    quantity,
    productDiscount,
    colors,
  },
} = AddProductFormModel;

//   const {
//     formField: { subject, message, rating },
//   } = ProductReviewFormModel;

//  SET INITIAL VALUES
const LoginFormValues = {
  [email.name]: "",
  [password.name]: "",
};

const RegisterFormValues = {
  [firstName.name]: "",
  [lastName.name]: "",
  [_email.name]: "",
  [_password.name]: "",
};
const ResetPasswordFormValues = {
  [recoveryEmail.name]: "",
};

//   const AccountDetailsFormValues = {
//     [accountEmail.name]: "",
//     [accountFirstName.name]: "",
//     [accountLastName.name]: "",
//   };

const AdminAccountDetailsFormValues = {
  [adminEmail.name]: "",
  [adminFirstName.name]: "",
  [adminLastName.name]: "",
};

//   const ChangePasswordFormValues = {
//     [newPassword.name]: "",
//   };

//   const ReauthFormValues = {
//     [reauthEmail.name]: "",
//     [reauthPassword.name]: "",
//   };

const AddProductFormValues = {
  [productDescription.name]: "",
  [productName.name]: "",
  [mainImgUrl.name]: "",
  [productPrice.name]: 0,
  [category.name]: "",
  [subCategory.name]: "",
  [fit.name]: "",
  [materials.name]: ["Wool"],
  [sizes.name]: ["S"],
  [dimensions.name]: "",
  [subImages.name]: [],
  [quantity.name]: 0,
  [productDiscount.name]: 0,
  [colors.name]: "",
};

const CheckOutFormValues = {
  [first_Name.name]: "",
  [last_Name.name]: "",
  [e_mail.name]: "",
  [phoneNumber.name]: "",
  [address1.name]: "",
  [town_city.name]: "",
  [country.name]: "",
  [zip.name]: "",
  [state.name]: "",
  [paymentMethod.name]: "",
  [deliveryMethod.name]: "",
  [paymentReceipt.name]: "",
};

//   const ProductReviewFormValues = {
//     [subject.name]: "",
//     [message.name]: "",
//     [rating.name]: 0,
//   };

export {
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues,
  // AccountDetailsFormValues,
  // ChangePasswordFormValues,
  // ReauthFormValues,
  AddProductFormValues,
  CheckOutFormValues,
  // ProductReviewFormValues,
  AdminAccountDetailsFormValues,
};

import BaseUrl from "./_Domain";
import axios from "../helper/axios";

function userSignin(user) {
  return axios.post("/vendor/signin", {
      ...user,
    }).then((res) => res)
}
function activateVendor(model) {
  return axios.post("/activateVendor", {
      ...model,
    }).then((res) => res)
}
function createVendor(form) {
  // console.log(form)
  return axios({
    method: "post",
    url: "/vendor/signup",
    data: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  }).then((res) => res);
}

function userSignUp(model) {
  const url = `${BaseUrl}User/register`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: model.name,
      userEmail: model.email,
      UserPhone: model.phone,
      userpassword: model.password,
      role_id: model.roleid,
    }),
  }).then((res) => res.json());
}

function changePassword(token, model) {
  const url = `${BaseUrl}User/ChangeUserPassword`;
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword : model.oldpassword,
      newPassword : model.newpassword,
      ConfirmPassword: model.confirmpassword,
    }),

  }).then((res) => res.json());
}

function updateProfile(token, model) {
  const url = `${BaseUrl}User/updateProfile`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username : model.name,
      UserPhone : model.phone,
      userEmail: model.email,
      AcademicLevel:model.academiclevel ,
      UserImage : model.image,
    }),

  }).then((res) => res.json());
}


export { userSignin,activateVendor, userSignUp,changePassword,updateProfile,createVendor };

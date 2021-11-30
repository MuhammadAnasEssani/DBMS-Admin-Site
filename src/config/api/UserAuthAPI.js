import BaseUrl from "./_Domain";

function userSigIn(model) {
  const url = `${BaseUrl}User/login`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: model.email,
      userpassword: model.password,
    }),
  }).then((res) => res.json());
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


export { userSigIn, userSignUp,changePassword,updateProfile };

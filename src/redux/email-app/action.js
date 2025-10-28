import { GET_EMAIL_TYPES } from "../actionType";

import data from "../../data/email/email";

export const getEmailsType = (emailTypes) => {
  return {
    type: GET_EMAIL_TYPES,
    payload: emailTypes,
  };
};

export const getAllTypes = () => (dispatch) => {
  let emails = data;
  var result = groupBy(emails, function (item) {
    return [item.type];
  });

  dispatch(getEmailsType(result));
};

const groupBy = (array, f) => {
  var groups = {};
  array.forEach(function (o) {
    var group = f(o)[0];
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return groups;
};

export const updateEmailTypes = (emails, ids, typeName) => (dispatch) => {
  dispatch(getAllEmails());
  for (var i = 0; i < emails.length; i++) {
    if (ids.includes(emails[i].id)) {
      emails[i].type = typeName;
    }
  }
  dispatch(getAllTypes(emails));
};

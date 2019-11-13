import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ValidationMutation from "../../../../components/common/ValidationMutation/ValidationMutation";

import { UPDATE_BASIC_INFO } from "../../../../GraphQL";

const genderOptions = [
  "",
  "male",
  "female",
  "transgender female",
  "transgender male"
];

function changeDateFormat(dateString) {
  let date = new Date(dateString);
  let newDate = `${date.getMonth() + 1}/${date.getDate() +
    1}/${date.getFullYear()}`;
  return newDate;
}

export default function Basics({
  userData,
  handleUserDataChange,
  urlUsername
}) {
  const [edit, handleEdit] = useState(false);
  const [userBasics, setUserBasics] = useState({});
  const [errors, setErrors] = useState({
    full_name: "",
    phone_number: ""
  });

  useEffect(() => {
    let userBasicInfo = {
      full_name: userData.full_name,
      phone_number: userData.phone_number,
      birthday: changeDateFormat(userData.birthday),
      gender: userData.gender
    };
    setUserBasics(userBasicInfo);
  }, [userData]);

  function handleInput(e) {
    let userBasicInfo = userBasics;
    userBasicInfo[e.target.id] = e.target.value;
    setUserBasics(userBasicInfo);
  }
  function handleEditButton() {
    let editState = edit;
    handleEdit(!editState);
  }
  function handleDataSave() {
    let newUserData = userData;
    newUserData.full_name = userBasics.full_name;
    newUserData.phone_number = userBasics.phone_number;
    newUserData.gender = userBasics.gender;
    newUserData.birthday = changeDateFormat(userBasics.birthday);
    handleUserDataChange(newUserData);
  }

  function onInputError(err) {
    let { full_name, phone_number } = err;
    setErrors({ full_name, phone_number });
  }

  const { full_name, phone_number, gender, birthday } = userBasics;
  return (
    <div className="basics-container">
      <div className="input-container">
        <span className="input-header">Full Name</span>
        {!edit ? (
          <span className="placeholder">{full_name}</span>
        ) : (
          <>
            <input
              className="input"
              onChange={handleInput}
              defaultValue={full_name}
              type="text"
              id="full_name"
            />
            {errors.full_name && (
              <span className="error">{errors.full_name}</span>
            )}
          </>
        )}
      </div>

      {!edit && (phone_number === "" || phone_number === null) ? (
        <div className="input-container">
          <span className="input-header empty">
            Phone Number - Not Provided
          </span>
        </div>
      ) : !edit && phone_number !== "" ? (
        <div className="input-container">
          <span className="input-header">Phone Number</span>
          <span className="placeholder">{phone_number}</span>
        </div>
      ) : edit ? (
        <div className="input-container">
          <span className="input-header">Phone Number</span>
          <input
            type="tel"
            id="phone_number"
            className="input"
            defaultValue={phone_number}
            onChange={handleInput}
          />
          {errors.phone_number && (
            <span className="error">{errors.phone_number}</span>
          )}
        </div>
      ) : null}
      {!edit && (gender === "" || gender === null) ? (
        <div className="input-container">
          <span className="input-header empty">Gender - Not Provided</span>
        </div>
      ) : !edit && gender !== "" ? (
        <div className="input-container">
          <span className="input-header">Gender</span>
          <span className="placeholder">{gender}</span>
        </div>
      ) : edit ? (
        <div className="input-container">
          <span className="input-header">Gender</span>
          <select
            className="input"
            id="gender"
            defaultValue={userBasics.gender}
            onChange={handleInput}
          >
            {genderOptions.map(option => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
      {!edit && (birthday === "" || birthday === null) ? (
        <div className="input-container">
          <span className="input-header empty">Birthday - Not Provided</span>
        </div>
      ) : !edit && birthday !== "" ? (
        <div className="input-container">
          <span className="input-header">Birthday</span>
          <span className="placeholder">{birthday}</span>
        </div>
      ) : edit ? (
        <div className="input-container">
          <span className="input-header">Birthday</span>
          <input
            type="date"
            id="birthday"
            className="input"
            value={birthday}
            onChange={handleInput}
          />
        </div>
      ) : null}
      {urlUsername ? null : (
        <ValidationMutation
          mutation={UPDATE_BASIC_INFO}
          variables={{ userBasics }}
          onCompleted={handleDataSave}
          onInputError={onInputError}
        >
          {mutation =>
            edit ? (
              <span className="large confirm button" onClick={mutation}>
                Update
              </span>
            ) : (
              <span className="large button" onClick={handleEditButton}>
                Edit
              </span>
            )
          }
        </ValidationMutation>
      )}
    </div>
  );
}

Basics.propTypes = {
  history: PropTypes.object.isRequired,
  userData: PropTypes.object,
  handleUserDataChange: PropTypes.func,
  urlUsername: PropTypes.string
};

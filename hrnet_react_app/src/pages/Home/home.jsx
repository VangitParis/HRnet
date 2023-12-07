import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../styles/sass/pages/_home.scss";
import { saveEmployee } from "../../features/employeesSlice";
import states from "../../utils/states";
export default function Home() {
  const dispatch = useDispatch();

  //Définition des champs
  const fieldNames = [
    "firstName",
    "lastName",
    "dateOfBirth",
    "startDate",
    "department",
    "street",
    "city",
    "state",
    "zipCode",
  ];
  //initialState créé avec la méthode reduce pour créer un objet d'état initial 
  //avec chaque champ initialisé à une chaîne vide
  const initialState = fieldNames.reduce((state, fieldName) => {
    state[fieldName] = "";
    return state;
  }, {});

  //ÉTat global du formulaire avec useState
  const [formState, setFormState] = useState(initialState);

  //fonction pour mettre à jour un champ du formulaire sans modifier l'état 
  const handleChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };


  const handleSaveEmployee = async (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (fieldNames) {
     
      // Création de l'objet employeeData avec les valeurs des champs
      const newEmployeeData = {};
      fieldNames.forEach((fieldName) => {
        newEmployeeData[fieldName] = formState[fieldName];
      });

      // Réinitialisation des champs du formulaire après la soumission
      setFormState(initialState);

      // Affichage d'un message de confirmation !!!! à remplacer par la modal
      alert("Employee Created!");

      // Appel de l'action createEmployeeData avec les données du nouvel employé
      dispatch(saveEmployee(newEmployeeData));
      return 
    }
  };
  useEffect(() => {
    // Remplir le menu déroulant des états après le rendu initial
    const stateSelect = document.getElementById('state');
    states.forEach((state) => {
      const option = document.createElement('option');
      option.value = state.abbreviation;
      option.text = state.name;
      stateSelect.appendChild(option);
    });
  }, []);

  return (
    <main className="container-fluid gradient-background mt-0 vh-100 d-flex flex-column justify-content">
      <h1 className="text-center">Create Employee</h1>
      <div className="d-flex align-items-center mt-5 flex-lg-row flex-column">
        <form
          className="row g-1 mb-md-0 mb-3 mx-auto"
          id="create-employee"
          onSubmit={handleSaveEmployee}
        >
          <div className="col-md-6 p-1">
            <label htmlFor="first-name" className="form-label fw-bold">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              aria-label="First Name"
              className="form-control"
              // onChange={(e) => setFirstName(e.target.value)}
              // value={firstName}
              value={formState.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="last-name" className="form-label fw-bold">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              aria-label="Last Name"
              className="form-control"
              // onChange={(e) => setLastName(e.target.value)}
              // value={lastName}
              value={formState.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="date-of-birth" className="form-label fw-bold">
              Date of Birth
            </label>
            <input
              id="date-of-birth"
              type="text"
              className="form-control"
              // onChange={(e) => setDateOfBirth(e.target.value)}
              // value={dateOfBirth}
              value={formState.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 p-1">
            <label htmlFor="start-date" className="form-label fw-bold">
              Start Date
            </label>
            <input
              id="start-date"
              type="text"
              className="form-control"
              // onChange={(e) => setStartDate(e.target.value)}
              // value={startDate}
              value={formState.starDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              required
            />
          </div>

          <fieldset className="row gy-2 gx-0 align-items-center">
            <legend className="p-1 mb-0">Address</legend>
            <div className="col-md-6 col-lg-12 p-1">
              <label htmlFor="street" className="form-label fw-bold">
                Street
              </label>
              <input
                id="street"
                type="text"
                className="form-control"
                value={formState.street}
                onChange={(e) => handleChange("street", e.target.value)}
              />
            </div>
            <div className="row gx-0 gy-1">
              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="form-control"
                  // onChange={(e) => setStreet(e.target.value)}
                  // value={street}
                  value={formState.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </div>

              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="state">
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  className="form-select form-control"
                  value={formState.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                ></select>
              </div>

              <div className="col-md-8 col-lg-4 p-1">
                <label className="form-label fw-bold" htmlFor="zip-code">
                  Zip Code
                </label>
                <input
                  id="zip-code"
                  type="number"
                  // onChange={(e) => setZipCode(e.target.value)}
                  // value={zipCode}
                  value={formState.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </fieldset>

          <div className="col-auto col-md-12 col-lg-12 p-1 gx-0">
            <label htmlFor="department" className="form-label fw-bold">
              Department
            </label>
            <select
              name="department"
              id="department"
              className="form-select form-control"
              // onChange={(e) => setDepartment(e.target.value)}
              // value={department}
              value={formState.department}
              onChange={(e) => handleChange("department", e.target.value)}
            >
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
          </div>
          <div className="col-12">
            <div className="d-grid gap-2 mx-auto mb-5 mt-5 col-md-3">
              <button
                className="btn custom-btn fw-bold"
                onClick={handleSaveEmployee}
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      </div>
    </main>
  );
}

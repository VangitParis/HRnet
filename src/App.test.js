import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import Header from "./components/Layouts/Header/header";
import Home from "./pages/Home/home.jsx";
import Form from "./components/Form/form.jsx";

// Suite de tests pour le lien vers la page /employee-list dans le composant Header
describe("Link to Employee List Page in Header Component", () => {
  test("renders the link", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("employee-list-link");
    expect(linkElement).toBeInTheDocument();
  });
  test("navigates to /employee-list when link clicked on Home page", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const employeeListLink = screen.getByTestId("employee-list-link");

    fireEvent.click(employeeListLink);

    // Attente pour permettre à la navigation de se produire
    await waitFor(() => {
      console.log("Current URL:", window.location.pathname);
      expect(window.location.pathname).toBe("/employee-list");
    });
  });
});

describe("Home Component", () => {
  test("renders Create Employee text in Home Page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const title = screen.getByText(/Create Employee/i);
    expect(title).toBeInTheDocument();
  });
  // Suite de tests pour le fond d'écran
  // Test pour vérifier le rendu du fond d'écran avec chargement
  test("renders background image loaded", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const backgroundElement = screen.getByTestId("background-image");
    expect(backgroundElement).toBeInTheDocument();
  });
});

// Tests pour le formulaire
describe("Form in Home Component", () => {
  // Test pour vérifier la présence du formulaire
  test("renders the form", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const formElement = screen.getByTestId("create-employee-form");
    expect(formElement).toBeInTheDocument();
  });

  // Test pour vérifier la présence de champs spécifiques dans le formulaire
  test("renders specific form fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const dateOfBirthInput = screen.getByLabelText(/Date of Birth/i);
    const startDateInput = screen.getByLabelText(/Start Date/i);

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(dateOfBirthInput).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
  });
  test("it user to input values in form fields, submit and display modal", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const dateOfBirthInput = screen.getByLabelText(/Date of Birth/i);
    const startDateInput = screen.getByLabelText(/Start Date/i);
    const streetInput = screen.getByLabelText(/Street/i);
    const cityInput = screen.getByLabelText(/City/i);
    const zipCodeInput = screen.getByLabelText(/Zip Code/i);
    const stateInput = screen.getByLabelText(/State/i);
    const departmentInput = screen.getByLabelText(/Department/i);
    
    fireEvent.input(firstNameInput, { target: { value: 'John' } });
    fireEvent.input(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.input(dateOfBirthInput, { target: { value: '19/01/2000' } });
    fireEvent.input(startDateInput, { target: { value: '20/01/2024' } });
    fireEvent.input(streetInput, { target: { value: '123 MAIN STREET' } });
    fireEvent.input(cityInput, { target: { value: 'Denver' } });
    fireEvent.input(stateInput, { target: { value: 'Alabama' } });
    fireEvent.input(zipCodeInput, { target: { value: '12000' } });
    fireEvent.input(departmentInput, { target: { value: 'Human Ressources' } });

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');

    expect(dateOfBirthInput).toHaveValue('19/01/2000');
    console.log("date input value:", dateOfBirthInput.value);

    expect(startDateInput).toHaveValue('20/01/2024');
    console.log("date input value:", startDateInput.value);

    expect(streetInput).toHaveValue('123 MAIN STREET');
    expect(cityInput).toHaveValue('Denver');
    expect(zipCodeInput).toHaveValue('12000');
    expect(stateInput).toHaveValue('Alabama');
    expect(departmentInput).toHaveValue('Human Ressources');

    const submitButton = screen.getByText('Save'); 
    fireEvent.submit(submitButton);
    
    // TODO VERIFIER L OUVERTURE DE LA MODAL APRES LA SOUMISSION CORRECTE DU FORMULAIRE
    
    
  });

  test('displays error message for invalid First Name', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.input(firstNameInput, { target: { value: '123' } });  

    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
  });
});

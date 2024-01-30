# HRnet - Employee Management Application

HRnet is an internal employee management application developed by WealthHealth. The goal of this project is to migrate HRnet from jQuery to React, improving performance and stability.

## Getting Started

### Installation
### Prerequisites

Node.js v18 or higher
Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

### Check Node.js version
```bash
node --version
```
### Check npm version
```bash
npm --version
```

### To get started, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/VangitParis/HRnet.git
    ```

2. Navigate to the project directory:
    ```bash
    cd HRnet
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

### Available Scripts

In the project directory, you can run:

- Start the app in development mode:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes, and lint errors may appear in the console.

- Launch the test runner in interactive watch mode:
    ```bash
    npm test
    ```
    See the [running tests](#) section for more information.

- Build the app for production:
    ```bash
    npm run build
    ```
    The build is minified, and the filenames include the hashes. Your app is ready to be deployed. See the [deployment](#deployment) section for more information.

## Deployment

To deploy the application using Firebase, run the following command:

```bash
npm run deploy
```


## Components
This project includes the following components:

- Modal Component: Implemented using the library [react-modal](https://www.npmjs.com/package/react-modal).
- Table Component: Utilizes the [react-table](https://www.npmjs.com/package/react-table) library for easy table creation.
- Dropdown List Component: Implemented using the [react-select](https://www.npmjs.com/package/react-select) library for dropdown functionality.
- Date Picker Component: A custom React component created and implemented using the [plugin-datepicker](https://www.npmjs.com/package/plugin-datepicker) library for handling date selection.

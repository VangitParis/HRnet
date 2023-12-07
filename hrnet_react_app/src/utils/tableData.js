import {getAbbreviationFromState} from '../modelisation/modelisation';

export const tableColumns = [
  { Header: "First Name", accessor: "firstName" },
  { Header: "Last Name", accessor: "lastName" },
  { Header: "Start Date", accessor: "startDate" },
  { Header: "Department", accessor: "department" },
  { Header: "Date of Birth", accessor: "dateOfBirth" },
  { Header: "Street", accessor: "street" },
  { Header: "City", accessor: "city" },
  { Header: "State", accessor: "state" },
  { Header: "Zip Code", accessor: "zipCode" },
];

export const mockTableData = {
    "employees": [
        {
            firstName: "Jane",
            lastName: "Doe",
            startDate: "20/11/2023",
            department: "Sales",
            dateOfBirth: "08/08/2008",
            street: "89 av Bexley",
            city: "Beverly Hills",
            state: "California",
            zipCode: "00012",
        },
        {
            firstName: "John",
            lastName: "Does",
            startDate: "11/01/2023",
            department: "Marketing",
            dateOfBirth: "11/09/1990",
            street: "123 street Kennedy",
            city: "Beverly Hills",
            state: "California",
            zipCode: "00012",
        },
        {
            firstName: "Mark",
            lastName: "Lavonne",
            startDate: "10/10/2020",
            department: "Human Sources",
            dateOfBirth: "01/01/2001",
            street: "3 av Johnson",
            city: "Madison",
            state: "Wisconsin",
            zipCode: "10001",
        },
        {
            firstName: "Tony",
            lastName: "Stark",
            startDate: "08/11/2022",
            department: "Engineering",
            dateOfBirth: "13/12/1998",
            street: "90 street Thomson",
            city: "Broadway",
            state: "New York",
            zipCode: "53000",
        },
    ]
}

const employeeState = mockTableData.employees[0].state; // "Californie"
console.log(employeeState);

const stateAbbreviation = getAbbreviationFromState(employeeState);
console.log(stateAbbreviation);
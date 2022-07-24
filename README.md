# STACK - Node.js Express API with TypeScript 4

> Node.js Express API with TypeScript 4.

## Description
This app will generate payslip with given parameters

### Project Introduction
- suppot ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Features
- generate payslip
##### Integration testing
- mocha
- chai
- supertest

## Requirements

- node >= 14
- npm >= 6
- typescript >= 4.0

## Installation

To app directory and run these commands:

```bash
> npm install
> npm run build
> npm start
```
## App skeleton
```
.
├── README.md
├── package.json
├── src
│   ├── components
│   │   ├── Payslip
│   │   │   ├── index.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── service.ts
│   │   │   └── validation.ts
│   │   ├── index.ts
│   ├── config
│   │   ├── env
│   │   │   └── index.ts
│   │   ├── error
│   │   │   ├── index.ts
│   │   │   └── sendHttpError.ts
│   │   ├── middleware
│   │   │   ├── middleware.ts
│   │── routes
│   │   ├── PayslipRoutes.ts
│   │   └── index.ts
│   │── server
│   │    ├── index.ts
│   │    ├── server.ts
│   │    └── serverHandlers.ts
│   │── Helpers
│   │    ├── payslipGenerators.ts
│   │    ├── taxBracket.ts
│   └── utils
│       ├── calculationUtility.ts
├── tsconfig.json
└── .eslintrc.json
```
## Running the API
- URL - http://localhost:3000/v1/payslip
- Method - POST
- Body - {
    "firstName": "Andrew",
    "lastName": "Smith",
    "annualSalary": 60050,
    "superRate": "9%",
    "dateRange": "01 March - 31 March"
}

### Testing
To run integration and unit tests:
```bash
npm test
```

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)
# Payslip-generator
Screen shots are attached.

- Assumption1 - Taking input as a body of POST API - http://localhost:3000/v1/payslip
- Assumption2 - If year is not given then assuming current on going year and getting tax bracket from default.
- Assumption3 - If year is given then getting corresponding tax bracket for the same year.

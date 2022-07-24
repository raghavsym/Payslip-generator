const taxBracket ={
    "default": [{
        minSalary: 0,
        maxSalary: 18200,
        incomeTax: 0,
        taxPerDollar: 0
    },
    {
        minSalary: 18201,
        maxSalary: 37000,
        incomeTax: 0,
        taxPerDollar: 0.19
    },
    {
        minSalary: 37001,
        maxSalary: 87000,
        incomeTax: 3572,
        taxPerDollar: 0.325
    },
    {
        minSalary: 87001,
        maxSalary: 180000,
        incomeTax: 19822,
        taxPerDollar: 0.37
    },
    {
        minSalary: 180001,
        maxSalary: 0,
        incomeTax: 54232,
        taxPerDollar: 0.45
    }],
    "2017": [{
        minSalary: 0,
        maxSalary: 18200,
        incomeTax: 0,
        taxPerDollar: 0
    },
    {
        minSalary: 18201,
        maxSalary: 37000,
        incomeTax: 0,
        taxPerDollar: 0.19
    },
    {
        minSalary: 37001,
        maxSalary: 87000,
        incomeTax: 3572,
        taxPerDollar: 0.325
    },
    {
        minSalary: 87001,
        maxSalary: 180000,
        incomeTax: 19822,
        taxPerDollar: 0.37
    },
    {
        minSalary: 180001,
        maxSalary: 0,
        incomeTax: 54232,
        taxPerDollar: 0.45
    }]
}

export default taxBracket;
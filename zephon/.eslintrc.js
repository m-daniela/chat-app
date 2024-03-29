module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        'plugin:react/recommended'
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        
    },
    "rules": {
        // we only want single quotes
        // 'quotes': ['error', 'single'],
        // we want to force semicolons
        'semi': ['error', 'always'],
        // we use 4 spaces to indent our code
        'indent': ['error', 4],
        // we want to avoid useless spaces
        'no-multi-spaces': ['error'],
        "no-unused-vars": "off",
        "react/prop-types": "off"
        
    }
};

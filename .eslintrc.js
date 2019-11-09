module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "plugins": ["prettier"],
    "extends": ["plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "import/prefer-default-export": 0,
        "prettier/prettier": "error"
    }
};
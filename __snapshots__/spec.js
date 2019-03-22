exports['only runs tests in spec-2 1'] = [
  {
    "stats": {
      "suites": 1,
      "tests": 1,
      "passes": 1,
      "pending": 0,
      "skipped": 0,
      "failures": 0
    },
    "spec": {
      "name": "spec-2.js",
      "relative": "cypress/integration/spec-2.js"
    },
    "tests": [
      {
        "title": [
          "Second spec",
          "works"
        ],
        "state": "passed"
      }
    ]
  },
  {
    "stats": {
      "suites": 2,
      "tests": 4,
      "passes": 0,
      "pending": 4,
      "skipped": 0,
      "failures": 0
    },
    "spec": {
      "name": "spec.js",
      "relative": "cypress/integration/spec.js"
    },
    "tests": [
      {
        "title": [
          "Example tests",
          "works"
        ],
        "state": "pending"
      },
      {
        "title": [
          "Example tests",
          "nested",
          "does A"
        ],
        "state": "pending"
      },
      {
        "title": [
          "Example tests",
          "nested",
          "does B"
        ],
        "state": "pending"
      },
      {
        "title": [
          "Example tests",
          "nested",
          "does C"
        ],
        "state": "pending"
      }
    ]
  }
]

exports['runs no tests 1'] = {
  "main stats": {
    "suites": 2,
    "tests": 4,
    "passes": 0,
    "pending": 4,
    "skipped": 0,
    "failures": 0
  }
}

exports['runs no tests 2'] = {
  "test state": [
    {
      "title": [
        "Example tests",
        "works"
      ],
      "state": "pending"
    },
    {
      "title": [
        "Example tests",
        "nested",
        "does A"
      ],
      "state": "pending"
    },
    {
      "title": [
        "Example tests",
        "nested",
        "does B"
      ],
      "state": "pending"
    },
    {
      "title": [
        "Example tests",
        "nested",
        "does C"
      ],
      "state": "pending"
    }
  ]
}

exports['runs only tests with "does" in their name from spec.js 1'] = {
  "main stats": {
    "suites": 2,
    "tests": 4,
    "passes": 3,
    "pending": 1,
    "skipped": 0,
    "failures": 0
  }
}

exports['runs only tests with "does" in their name from spec.js 2'] = {
  "test state": [
    {
      "title": [
        "Example tests",
        "works"
      ],
      "state": "pending"
    },
    {
      "title": [
        "Example tests",
        "nested",
        "does A"
      ],
      "state": "passed"
    },
    {
      "title": [
        "Example tests",
        "nested",
        "does B"
      ],
      "state": "passed"
    },
    {
      "title": [
        "Example tests",
        "nested",
        "does C"
      ],
      "state": "passed"
    }
  ]
}

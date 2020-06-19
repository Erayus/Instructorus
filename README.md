# Instructorayus
## Set up development
`npm i`
`npm run start`

## Database structure
- questions
  - key
    - id: string
    - type: string
    - content: string
- answers
  - key
    - id: string;
    - type: string;
    - response: string;
    - questionId: string;
    - instructorId: string;
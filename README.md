# leetify

***leetify*** is a reverse-engineered REST API that allows you to query for Leet Code questions, lists, etc.

## Current Endpoints

Queries all Leet Code problems:
``/list``

Queries Leet Code problems based on difficulty:
`/list/:difficulty`

Queries a problem based on name, a random problem based on difficulty, or a random problem from the Easy list:
`/question?name=PROBLEM_NAME`

`/question?difficulty=PROBLEM_DIFFICULTY`

`/question`

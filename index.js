const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.json());

let leetcode = 'https://leetcode.com/graphql';

let listQuery = fs.readFileSync("./queries/lists.gql").toString();
let questionQuery = fs.readFileSync("./queries/question.gql").toString();

// GET all questions
app.get('/list', (req, res) => {
    axios({
        url: leetcode,
        method: 'POST',
        data: {
            query: listQuery,
            variables: {
                categorySlug: "",
                filters: {},
                limit: null,
                skip: 0
            }
        }
    }).then((result) => {
        res.json(result.data);
    });
});

// GET list by difficulty
app.get('/list/:difficulty', (req, res) => {
    let { difficulty } = req.params;
    let filters;

    difficulty = difficulty.toUpperCase();

    if (difficulty.toUpperCase() != "EASY" && difficulty != "MEDIUM" && difficulty != "HARD") filters = {};
    else filters = {"difficulty": difficulty.toUpperCase() }

    axios({
        url: leetcode,
        method: 'POST',
        data: {
            query: listQuery,
            variables: {
                categorySlug: "",
                filters: filters,
                limit: null,
                skip: 0
            }
        }
    }).then((result) => {
        res.json(result.data);
    });
});

// GET question by name
app.get('/question/:name', (req, res) => {
    let { name } = req.params

    axios({
        url: 'https://leetcode.com/graphql',
        method: 'POST',
        data: {
            query: questionQuery,
            variables: {
                titleSlug: name
            }
        }
    }).then((result) => {
        if (result.data['data']['question'] == null) res.json({"error": "question does not exist"});
        else res.json(result.data);
    });
});

// GET random question
app.get('/question', (req, res) => {
    axios({
        url: leetcode,
        method: 'POST',
        data: {
            query: listQuery,
            variables: {
                categorySlug: "",
                filters: {},
                limit: null,
                skip: 0
            }
        }
    }).then((result) => {
        let questions = result.data['data']['problemsetQuestionList']['questions'];
        const rdx = Math.floor(Math.random() * questions.length);
        
        res.json(questions[rdx]); 
    });
});

app.listen(port, () => console.log(`API listening on port ${port}`));
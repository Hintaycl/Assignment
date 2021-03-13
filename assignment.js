var url = 'http://api.stackexchange.com/2.2/questions?'
var page = 'page=1'
var numQuestions = '&pagesize=10'
var order = '&order=desc'
var sortByNewest = '&sort=creation'
var website = '&site=stackoverflow'
var filter = '&filter=!Lb0y*H*_i-AYsLs5tJWFNX'

var sortByWeek = '&sort=week'

function submitTag(id) {
    var value = document.getElementById(id).value;

    //clear the questions div first
    document.getElementById('QuestionsDiv').innerHTML = "";
    
    var sendDate = (new Date()).getTime();

    get10NewestQuestions(value);

    get10PopularQuestions(value);

    var receiveDate = (new Date()).getTime();

    //measure response time
    var responseTime = receiveDate - sendDate;
    createResponseTimeParagraph(responseTime);
}

function get10NewestQuestions(input) {

    var inputTag = '&tagged=' + input;
    const apiUrlNewQuestions = url + page + numQuestions + order + sortByNewest + inputTag + website + filter;

    const responseData = fetch(apiUrlNewQuestions).then(response => {
            return response.json();
    });

    console.log(responseData);

    responseData.then(data => { 
        for (jsonItem of data.items) {
            const listItem = document.createElement('button');
            listItem.setAttribute('class', 'collapsible');
            listItem.setAttribute('type', 'button');
            // listItem.className = 'collapsible';
            listItem.classList.add('collapsible');
            // document.getElementById('NewestQuestionsList').appendChild(listItem);
            document.getElementById("QuestionsDiv").appendChild(listItem);
            // document.getElementById("myDIV").className = "mystyle";

            var questionTitle = jsonItem.title;
            var ownerName = jsonItem.owner.display_name;
            var votesNum = jsonItem.score;
            var convertedDate = convertTime(jsonItem.creation_date);

            listItem.textContent = `${questionTitle} (by ${ownerName}) Votes: [${votesNum}] Creation date: ${convertedDate}`

            //store question body here
            var listItemBody = document.createElement('div');
            listItemBody.setAttribute('class', 'content');
            document.getElementById("QuestionsDiv").appendChild(listItemBody);

            //question body
            var questionBody = document.createElement('div');
            listItemBody.appendChild(questionBody);
            questionBody.innerHTML = jsonItem.body;

            //question body comments and its creation date and vote
            if(jsonItem.hasOwnProperty('comments')) {
                for(comment of jsonItem.comments) {
                    var questionComments = document.createElement('div');
                    questionComments.setAttribute('class', 'commentHeader');
                    listItemBody.appendChild(questionComments);    

                    //comment creation date and vote
                    var convertedCommentDate = convertTime(comment.creation_date);
                    questionComments.textContent = `Comment: Votes: [${comment.score}] Creation date: ${convertedCommentDate}`

                    //comment body
                    var commentBody = document.createElement('div');
                    commentBody.setAttribute('class', 'comments');
                    listItemBody.appendChild(commentBody);
                    commentBody.innerHTML = comment.body;
                }
            }


            //its answers
            if(jsonItem.hasOwnProperty('answers')) {

                for(answer of jsonItem.answers) {
                    var answersHeader = document.createElement('div');
                    answersHeader.setAttribute('class', 'answerHeader');
                    listItemBody.appendChild(answersHeader);    

                    //answers creation date and vote
                    var convertedAnswerDate = convertTime(answer.creation_date);
                    answersHeader.textContent = `Answer: Votes: [${answer.score}] Creation date: ${convertedAnswerDate}`

                    //answer body
                    var answersBody = document.createElement('div');
                    answersBody.setAttribute('class', 'answers');
                    listItemBody.appendChild(answersBody);
                    answersBody.innerHTML = answer.body;

                    // for(comment of answer.comments) {
                    //     //answers comments headers
                    //     var answersCommentsHeader = document.createElement('div');
                    //     answersCommentsHeader.setAttribute('class', 'answersCommentHeader');
                    //     listItemBody.appendChild(answersCommentsHeader);    

                    //     //answers comment creation date and vote
                    //     var convertedCommentAnswerDate = convertTime(comment.creation_date);
                    //     answersCommentsHeader.textContent = `Answer: Votes: [${comment.score}] Creation date: ${convertedconvertedCommentAnswerDateAnswerDate}`

                    //     //answers comments
                    //     var answersComments = document.createElement('div');
                    //     answersComments.setAttribute('class', 'answersComments');
                    //     listItemBody.appendChild(answersComments);
                    //     answersComments.innerHTML = comment.body;
                    // }
                    
                }
            }
        }
    });
}

function get10PopularQuestions(input) {

    var inputTag = '&tagged=' + input;
    const apiUrlNewQuestions = url + page + numQuestions + order + sortByWeek + inputTag + website + filter;

    const responseData = fetch(apiUrlNewQuestions).then(response => {
            return response.json();
    });

    console.log(responseData);

    responseData.then(data => { 
        for (jsonItem of data.items) {
            const listItem = document.createElement('button');
            listItem.setAttribute('name', 'collapsible');
            listItem.setAttribute('type', 'button');
            // listItem.className = 'collapsible';
            listItem.classList.add('collapsible');
            // document.getElementById('NewestQuestionsList').appendChild(listItem);
            document.getElementById("VotedQuestionsDiv").appendChild(listItem);
            // document.getElementById("myDIV").className = "mystyle";

            var questionTitle = jsonItem.title;
            var ownerName = jsonItem.owner.display_name;
            var votesNum = jsonItem.score;
            var convertedDate = convertTime(jsonItem.creation_date);

            listItem.textContent = `${questionTitle} (by ${ownerName}) Votes: [${votesNum}] Creation date: ${convertedDate}`

            //store question body here
            var listItemBody = document.createElement('div');
            listItemBody.setAttribute('class', 'content');
            document.getElementById("VotedQuestionsDiv").appendChild(listItemBody);

            //question body
            var questionBody = document.createElement('div');
            listItemBody.appendChild(questionBody);
            questionBody.innerHTML = jsonItem.body;

            //question body comments and its creation date and vote
            if(jsonItem.hasOwnProperty('comments')) {
                for(comment of jsonItem.comments) {
                    var questionComments = document.createElement('div');
                    questionComments.setAttribute('class', 'commentHeader');
                    listItemBody.appendChild(questionComments);    

                    //comment creation date and vote
                    var convertedCommentDate = convertTime(comment.creation_date);
                    questionComments.textContent = `Comment: Votes: [${comment.score}] Creation date: ${convertedCommentDate}`

                    //comment body
                    var commentBody = document.createElement('div');
                    commentBody.setAttribute('class', 'comments');
                    listItemBody.appendChild(commentBody);
                    commentBody.innerHTML = comment.body;
                }
            }


            //its answers
            if(jsonItem.hasOwnProperty('answers')) {

                for(answer of jsonItem.answers) {
                    var answersHeader = document.createElement('div');
                    answersHeader.setAttribute('class', 'answerHeader');
                    listItemBody.appendChild(answersHeader);    

                    //answers creation date and vote
                    var convertedAnswerDate = convertTime(answer.creation_date);
                    answersHeader.textContent = `Answer: Votes: [${answer.score}] Creation date: ${convertedAnswerDate}`

                    //answer body
                    var answersBody = document.createElement('div');
                    answersBody.setAttribute('class', 'answers');
                    listItemBody.appendChild(answersBody);
                    answersBody.innerHTML = answer.body;

                    // for(comment of answer.comments) {
                    //     //answers comments headers
                    //     var answersCommentsHeader = document.createElement('div');
                    //     answersCommentsHeader.setAttribute('class', 'answersCommentHeader');
                    //     listItemBody.appendChild(answersCommentsHeader);    

                    //     //answers comment creation date and vote
                    //     var convertedCommentAnswerDate = convertTime(comment.creation_date);
                    //     answersCommentsHeader.textContent = `Answer: Votes: [${comment.score}] Creation date: ${convertedconvertedCommentAnswerDateAnswerDate}`

                    //     //answers comments
                    //     var answersComments = document.createElement('div');
                    //     answersComments.setAttribute('class', 'answersComments');
                    //     listItemBody.appendChild(answersComments);
                    //     answersComments.innerHTML = comment.body;
                    // }
                    
                }
            }
        }
    });
}

function createResponseTimeParagraph(respTime) {
    var responseTimeParagraph = document.createElement('p');
    responseTimeParagraph.textContent = 'Response Time: ' + respTime + ' ms';
    document.body.appendChild(responseTimeParagraph);
}

function convertTime(UNIX_timestamp) {
    var milliseconds = new Date(UNIX_timestamp * 1000);
    var dateObject = new Date(milliseconds);

    return dateObject.toLocaleString();
}
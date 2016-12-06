//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBtCXb-6CcoGKkBFvuwhps33OdcayX4vA8",
    authDomain: "tasks-demo-8dfa4.firebaseapp.com",
    databaseURL: "https://tasks-demo-8dfa4.firebaseio.com",
    storageBucket: "tasks-demo-8dfa4.appspot.com",
    messagingSenderId: "655946070898"
};
firebase.initializeApp(config);

var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();
var purgeButton = document.querySelector(".btn-purge");

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");

// This is the name of the table
var tasksRef = firebase.database().ref("tasks");

taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    tasksRef.push(task);

    taskTitleInput.value = "";
    return false;
});

// Takes in datbase snapshot
function render(snapshot) {
    taskList.innerHTML = "";

    purgeButton.classList.add("hidden");

    // Goes through each object in database
    snapshot.forEach(renderTask);
}

// Takes in particular task object from
// snapshots.
function renderTask(singleSnap) {
    var task = singleSnap.val(); // JS obj with all the data in it
    var item = document.createElement("li");

    var spanTitle = document.createElement("span");
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");

    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow() + 
                            " by " + (task.createdBy.displayName || task.createdBy.email);
    spanCreation.classList.add("task-creation");

    item.appendChild(spanTitle);
    item.appendChild(spanCreation);

    // Important note about this code;
    // Items are re-rendered each time something changes. 
    // Which is actually great for our purposes.
    if(task.done) {
        item.classList.add("done");
        purgeButton.classList.remove("hidden");
    }

    item.addEventListener("click", function() {
        singleSnap.ref.update({
            done: !task.done
        });
    });

    taskList.appendChild(item);
}

purgeButton.addEventListener("click", function() {
    tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if(taskSnapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        })
    })
});

// Reference can raise multiple events.
// One of those is "value" which tells
// us that something has changed.
// To add event listen we use .on(event, func)
tasksRef.on("value", render);

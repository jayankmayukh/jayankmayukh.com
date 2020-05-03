---
title: "How to Write Javascript That Does not Block The UI"
date: "2020-05-03T17:14:58.866Z"
---

Some time ago at work I was given a task of fixing long UI freezes happening is our application.
While fixing the issue I learnt few things that I think a lot of javascript developers may find useful.
In this article I will try to explain them with some simple examples.

## Javascript is Single Threaded

While this is not something many people do not know about, it is easy to forget about the implications of this fact.
Let us try to understand what it means to be single threaded. For this conversation we may note the following two points:

1. A single thread can do one task at a time.
2. Javascript runs on the same thread that controls the UI.

Now imagine that you have a CPU intensive task in your code that is going to take some time, let's say 200 milliseconds.
When you run this code, since a single thread can do only one task at a time and your _CPU intensive task_ is running on
the same thread which controls the UI, the UI freezes for 200 milliseconds. 200 millisecond may not sound like a lot of
time, a delay of 200 millisecond in UI is noticeably annoying as a user, and things can get ugly pretty quickly if this 
_CPU intensive task_ is run frequently.

## Writing a UI Freezing code

Let us create a dummy problem which we will solve in this article. Create a directory and create two files called
`index.html` and `ui-blocking.js` in the directory. Paste the following code in `index.html`.
```HTML
<!DOCTYPE html>
<html>
<head>
	<title>UI Blocking</title>
	<script type="text/javascript" src="./ui-blocking.js"></script>
	<style>
		button{
			color: blue;
		}
		button:active{
			color: red;
		}
	</style>
</head>
<body>
	<button onclick="cpuIntensiveTask()">
		Button with cpuIntensiveTask
	</button>
	<button>
		Button without cpuIntensiveTask
	</button>
</body>
</html>
```
Paste this code in `ui-blocking.js`.
```javascript
// try not to exceed 10 billion
const CYCLES = 1000000000;

// dummy cpu intensive task
function cpuIntensiveTask() {
    console.time('cpuIntensiveTask');
    for (let i = 0; i < CYCLES; i++) {
        // some useful code
    }
    console.timeEnd('cpuIntensiveTask');
}
```
Now serve the directory on your localhost using your favourite server or you can just head over to this 
[JS Fiddle](https://jsfiddle.net/jayankmayukh/pyqjd4g9/).

Try clicking both the buttons multiple times. We can already see some difference in UI response.
You can try changing value of `CYCLES`. If you open your browser's console, you will see time it took to execute 
`cpuIntensiveTask`.

## Using Asynchronous Loops

Often the code blocking the UI is in form of a loop, where individual iterations do not take much time but collectively 
they take enough time to make things bad. Such kind of issues can be fixed using __Asynchronous Loops__. This is
how an async version of `cpuIntensiveTask` might look like:
> __Note:__ This code snippet uses async/await syntax which was introduced in ES7.
```javascript
const CYCLES = 1000000000;
async function cpuIntensiveTask() {
    console.time('cpuIntensiveTask');
    for (let i = 0; i < CYCLES; i++) {
        let callbackPromise = new Promise((resolve, _reject) => {
            setTimeout(() => {
                // some useful code
                resolve();
            }, 0);
        });
        await callbackPromise;
    }
    console.timeEnd('cpuIntensiveTask');
}
```


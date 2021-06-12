---
title: "How to write long loops in javascript that do not block the UI"
date: "2021-06-12T17:14:58.866Z"
description: ""
---

Some time ago at work, I was given the task of fixing long UI freezes happening in our application.
While fixing the issue I learned few things that I think a lot of javascript developers may find useful.
In this article, I will try to explain them with some simple examples.

## Javascript is Single Threaded

> __Note:__ Javascript can have limited multi-threaded functionality via workers.

While this is not something many people do not know about, it is easy to forget about the implications of this fact.
Let us try to understand what it means to be single-threaded. For this conversation we may note the following two points:

1. A single thread can do one task at a time.
2. Javascript runs on the same thread that controls the UI.

Now imagine that you have a CPU-intensive task in your code that is going to take some time, let's say 200 milliseconds.
When you run this code, since a single thread can do only one task at a time and your _CPU intensive task_ is running on
the same thread which controls the UI, the UI freezes for 200 milliseconds. 200 millisecond may not sound like a lot of
time, a delay of 200 milliseconds in UI is noticeably annoying as a user, and things can get ugly pretty quickly if this 
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
<a href="https://jsfiddle.net/jayankmayukh/pyqjd4g9/" rel="noopener noreferrer" target="_blank">JS Fiddle</a>.

Try clicking both the buttons multiple times. We can already see some difference in UI response.
You can try changing the value of `CYCLES`. If you open your browser's console, you will see the time it took to execute 
`cpuIntensiveTask`.

## Using `setTimeout` Based Asynchronous Loops
Often the code blocking the UI is in form of a loop, where individual iterations do not take much time but collectively they take enough time to make things worse. Such kinds of issues can be fixed using __Asynchronous Loops__. This is
how an async version of `cpuIntensiveTask` might look like:
> __Note:__ This code snippet uses async/await syntax which was introduced in ES7.
```javascript
const CYCLES = 1000000000;

async function asyncCpuIntensiveTask(iter = 0) {
    if (iter !== CYCLES){
        setTimeout(() => {
            // some useful code
            asyncCpuIntensiveTask(iter + 1);
        }, 0);
    }
}
```
Update your code to use `asyncCpuIntensiveTask` function instead of `cpuIntensiveTask` or open this
<a href="https://jsfiddle.net/jayankmayukh/59x471b0/" rel="noopener noreferrer" target="_blank">JS Fiddle</a>.
This time you will notice that both the buttons, one with a `asyncCpuIntensiveTask` as well as the one without any callback,
are equally fast in showing the ui updates.

## Explanation
`setTimeout` is a special function, it lets us schedule a callback function __at least__ after a certain amount of time has passed.
The 'at least' part is important, the browser does not just start executing the callback function as soon as the specified amount
of time has passed. There may be some other task running on the thread and the browser cannot just stop that task and run our callback.
So it waits for the call stack to become empty, that is, it waits for the currently running task to finish. Once the call stack
is empty, the callback that we passed to `setTimeout` is executed. Also, the browser does not just keep track of `setTimeout` callbacks,
there are callbacks to be executed from input events such as clicks, keydown, etc. too. These callbacks from the input event get
a higher priority than callbacks from `setTimeout`.

In `asyncCpuIntensiveTask` we break each iteration of our loop into its own `setTimeout`. Every time the call stack becomes empty,
the next iteration of our loop is executed. If the user makes some input during the execution of an iteration of our loop, the callback for
this input event is put into the queue of callbacks to be executed. When the call stack becomes empty, the callbacks from the input event
are executed first before our loop's next iteration, since callback from input has higher priority than a setTimeout. This way,
the maximum time user needs to wait for the response to their action is reduced to the time taken by an individual iteration of
our loop.

## Conclusion
Using `setTimeout` to break long loops can often fix problems of sluggish UI caused by long executing loops. A drawback of this
method is that it takes much longer to execute the loop completely since a lot of other code is executed between each iteration.
Another drawback is that sometimes it can complicate the implementation with confusing async loops. An alternative to this method
is to use web workers, I will write about it in a future post.

If you found this article interesting, you might want to read the following too:
- <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop" rel="noopener noreferrer" target="_blank">Concurrency model and the event loop</a>
- <a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/" rel="noopener noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a>

A lot of what I have written here was learned from these articles.

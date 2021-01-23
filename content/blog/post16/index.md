---
title: "Code Readability"
path: "/code-readability"
tags: ["code", "quality", "readability"]
description: On Readability
created: 2021-01-15
date: 2021-01-17
---

So we write code for a computer to "read" but we spend a lot of time _reading_ code.

"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." [Refactoring](https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599/ref=sr_1_1?crid=3156HZVMBA6BK&dchild=1&keywords=refactoring+martin+fowler&qid=1610942888&sprefix=refactoring%2Caps%2C223&sr=8-1)

Why is important for us to write code that is readable? Lets a look at an example which is written a not so readable format (IMO):

```javascript
function init(config) {
  //set member variables
  this.pageSize = config.pageSize ? config.pageSize : 10
  this.maxPages = config.maxPages ? config.maxPages : 1000
  // set up callbacks
  this.pageChange = config.pageChange
  this.lastPage = config.lastPage
  //find preview box limits
  this.leftPageAdvance = null
  this.rightPageAdvance = null

  this.calcPageLength = this.displayPort / config.lines + 1

  // use only config data points needed
  for (let i = 0; i < config.data.length; i++) {
    if (config.data[i].d1 === "abc") {
      this.dataPoints.push(config.data[i])
    }
  }
  const results = []
  //normalize data
  for (let i = 0; i < this.dataPoints.length; i++) {
    results.push(...this.dataPoints, { d2: this.dataPoints.d2 * 2 })
  }
  this.dataPoints = results
}
```

Now lets look at the same code refactored to a readable standpoint:

```javascript
function init(config) {
  setPageVariables(config)
  setCallbacks(config)
  findPreviewBoxLimits()
  filterDataPoints(config)
  normalizeData(config)
}
// helper functions omitted for simplicity
```

Keep in mind this is a simple example. I have seen functions that span many more lines in real life.

The 2nd example shows how easy it is reason about the code. Still why is that important? It works right? We get the code to production and it never fails.

Imagine this...one day your boss says you are the "owner" of this code...and you have to fix a bug or add a feature...which codebase do you want to work in? I would like to work in the 2nd one! So choose the code that is **easier to reason about**.

Readability is important because it helps not only you the author but folks who will be immersed in that code 6 months from now (or a year or 5 years).

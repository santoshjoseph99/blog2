---
title: "Preact & Mobx Part 3"
path: "/preact-mobx-part3"
tags: ["preact", "mobx"]
featuredImage: "./image14.jpg"
excerpt: Small tutorial for preact & mobx
created: 2018-05-22
updated: 2018-05-22
---

We'll look at a cool feature from MobX called computed values.
These are values which are calculated from either existing state or other computed values.  For our example lets show a message if the count is higher then 5.
So add the following to `store.js` under the `count: 0` statement:
```
      highCount: computed(() => {
        return this.count > 5;
      })
```
Also add the `computed` to the import (from the mobx lib).

To show and hide our message lets create a file called `style.css` and add the following:
```

.hide-msg {
  display: none;
}

.show-msg {
  display: block;
}
```
Don't forget to add `styles.css` to `index.html`.

Now we will add code to check the `highCount` condition and when its true then we will show the message:
```
    let message = div('.hide-msg', 'Message is > 5!');
    if(store.highCount) {
      message = div('.show-msg', 'Message is > 5!');
    }
```
and add `message` as the last element:
```
      input({ type: 'text', readonly: true, value: store.count }),
      message
```

Go ahead build & run the server.
When you click past 5, you'll see the message and then you can click down and not see the message.

So this is quick example, but hopefully you can see the power of computed values and use them to simplify your code.

You can find the code on [Github](https://github.com/santoshjoseph99/preact-mobx.git). Checkout the tag 'part3'.

You can view the live site [here](http://preact-mobx-counting.surge.sh/). Thanks to [surge](https://surge.sh/)

Next post, lets continue talking about mobx...

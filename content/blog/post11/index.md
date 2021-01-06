---
title: "Javascript Tidbit: Date Rollover"
path: "/javascript-date-rollover"
tags: ["javascript", "date"]
featuredImage: "./image11.jpg"
excerpt: Javascript and dates
created: 2018-03-22
updated: 2018-03-22
---

Constructing date objects are pretty simple and luckily `Ruby`, `Python` and `Javascript` all support them pretty easily, but I found an interesting thing with Javascript.  If you create an date object in Javascript with an invalid date, what do you think will happen?
```
let date = new Date(2017, 8, 35);
console.log(date);
```
Well, this is what happens in Ruby:
```
irb(main):001:0> require 'date'
=> true
irb(main):002:0> date = Date.new(2008, 12, 22)
=> #<Date: 2008-12-22 ((2454823j,0s,0n),+0s,2299161j)>
irb(main):003:0> date = Date.new(2017, 8, 35)
ArgumentError: invalid date
        from (irb):3:in `new'
        from (irb):3
        from /usr/bin/irb:12:in `<main>'
irb(main):004:0>
```
And in Python:
```
>>> import datetime
>>> datetime.date(2017, 8, 35)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: day is out of range for month
``` 

Anyways, this is in Javascript (node v6):
```
> let date = new Date(2017, 8, 35)
undefined
> console.log(date);
2017-10-05T07:00:00.000Z
undefined
```
So no exception or error from Javascript.  The date rolls over, which may or may not be what you would like to happen.  I actually think its kind of a cool feature.

It allows you to easily iterate through an entire year!

So lets say you want to see all the Friday the 13th's, this would be a way to do it:
```

for(let i = 1; i <= 365; i++){
    let date = new Date(2017, 1, i);
    if(date.getDay() === 5 && date.getDate() === 13){
        console.log('Friday 13th:', date);
    }
}
```
`
Friday 13th: 2017-10-13T07:00:00.000Z
`
Btw, this is not the most efficient way to check for that date!

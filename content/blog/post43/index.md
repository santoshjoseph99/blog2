---
title: "An outline of the Auction site"
date: "2023-07-23"
description: "outline auction project"
---

## Outline

This would be the design phase. Lets think about a MVP type of project.

1. Lets show a fixed amount of deals. One page only.
2. Do we need a database? Is durability for a concern? Possibly.
3. Scalability? How many users can log in the site at the same time? A few. How about less then 10. So we are NOT worrying about scalability.
4. Do users need to be logged in? If we aren't using a real DB, then we don't care, but lets make this a requirement. Its fairly easy with the amount of libraries about there.
5. Are we learning some new technologies? Or do we need to get something up and running quickly as possible. Lets stick with something we know! React, Typescript, NextJS, MongoDB, Clerk
6. What tools do we need to create the actual design? Miro, Figma, Google drawings...etc
7. Client access. Only from a website. Mobile apps are cool, but so slow to build and yes React Native is slower to build out then a website.
8. Testing. Need to run e2e tests!
9. How do we communicate when bidding? websockets.
10. Will this be hosted on the internet or locally? Lets host this somewhere and see we can play around with this.
11. How many screens? login, listing page, detail page, winner page
12. Logging? We should add some observability.

## Conclusion

The tough part of this or any project is the requirements and limiting scope,
especially since its just me who will be implementing this.

Up next: block diagrams, figmas, task items, etc

Interestingly I'm mentoring a co-worker on a side-project so in essence in this very similar.

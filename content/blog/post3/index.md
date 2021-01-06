---
title: "Git: commit in wrong branch"
path: "/git-wrong-branch"
tags: ["Git"]
featuredImage: "./image3.jpg"
excerpt: Fun stuff about git
created: 2017-08-22
updated: 2017-08-22
---

I'm still learning git after 2 years and sometimes I think I've got a handle on it and suddenly I feel like whats happened...

So I was on a branch lets call it `fixA` and I pushed a PR from that branch and got it merged.  Then I started working in branch `fixA` (when I should have been on `fixB`) on a new issue but didn't go back to master. I would normally do a `git pull upstream master` from master.  I started working and then made a commit and pushed it.  Then I realized it was the wrong branch...not seriously a big problem but I really wanted that commit in a new branch.  

So this is what I did.
I first did a `git log` and noted the latest commit and the previous commit...call them `commitLatest` and `commitPrevious`.
I did a `git reset --hard commitPrevious`.
Then I did a `git checkout -b fixB`.
Then: `git cherry-pick commitLatest`.

Even though with the reset hard, git didn't destroy `commitLatest`.  I think eventually git would have garbage collected that commit but I'm not sure when that would have happened.


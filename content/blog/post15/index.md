---
title: "MVVM"
path: "/mvvm"
tags: ["mvc", "mvp", "mvvm"]
excerpt: On MVVM
created: 2020-01-11
updated: 2020-01-11
---

MVVM, first introduced in a blog [post](https://docs.microsoft.com/en-us/archive/msdn-magazine/2009/february/patterns-wpf-apps-with-the-model-view-viewmodel-design-pattern) which described a better way for a complex UI application to handle events and send updates to the UI.

I like MVVM, but as I'm reading [Refactoring](https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599/ref=sr_1_1?dchild=1&hvadid=77790464257241&hvbmt=bb&hvdev=c&hvqmt=b&keywords=martin+fowler+refactoring&qid=1609950318&sr=8-1&tag=mh0b-20), by [Martin Flower](https://martinfowler.com) I notice a section in the book talking about naming. When you expand MVVM it is **M**odel-**V**iew-**V**iew**M**odel...what I don't really get is, what is a viewmodel.

How does that word help me understand what MVVM is? MVVM is all about data binding, notifing and observing. I think you can get a lot out of MVC and MVP (as far as the names are concerneed), but MVVM just seems redundant. So what would be a better name?

Thats a tough one! Maybe MVO (Model-View-Observer)? I Model-View-Connector but then thats just MVC! The ViewModel does deal with Actions...so MVA, but A needs to be a noun...how about [Actioner](https://www.merriam-webster.com/dictionary/actioner)? Didn't think that was an actual word. Maybe Actionable is better.

Anyways, just a thought. I think I'll give my vote to Connector, but then we just can't have the abbreviation.

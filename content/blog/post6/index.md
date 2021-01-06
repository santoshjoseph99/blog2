---
title: ".NET Command Line Options"
path: "/net-command-line-options"
tags: [".net"]
featuredImage: "./image6.jpg"
excerpt: Command line options
created: 2017-11-22
updated: 2017-11-22
---

When I’m writing a console app and I need some flexibility in “parsing” arguments…I want it done ASAP and without much extra work.  I tried a few command line option libraries and it always seem those libraries get in your way, so I wrote my own.  Its based on the simple premise “convention over configuration”.

Basically it can be used as follows:

```
var cmdLine = new CmdLineParser();
cmdLine.Setup<int>("option1");
cmdLine.Setup<string>("option2");
cmdLine.Parse(args);
```
then I can use the options...
```
Console.WriteLine(cmdLine.Opts.option1);
Console.WriteLine(cmdLine.Opts.option2);
```
Setup can take 3 arguments
1) option name
2) required (optional)
3) help message (optional)

Parse just takes a string array.
Parse will throw an exception (CmdLineParserException), if it encounters the following cases:
1) an required option that is missing
2) an option with a invalid type (an option which takes a number but has a string)
3) an option that is specified more then once
4) –help or -h is encounter (then use the HelpMessage property to print the message)
The following show exceptional cases…
```
var cmdLine = CmdLineParser();
cmdLine.Setup<int>("option",true,"help message");

cmdLine.Parse({});
cmdLine.Parse({"--option", "3", "--option","4"});
cmdLine.Parse({"--option", "abc"});
cmdLine.Parse({"--help"});
```
more information can be found at: https://bitbucket.org/sanjosep43/simplecmdline/wiki/Home

It can also be downloaded form NuGet (SimpleCmdLine).
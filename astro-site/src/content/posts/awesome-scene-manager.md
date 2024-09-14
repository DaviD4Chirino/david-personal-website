---
id: "1"
title: "Awesome Scene Manager"
description: "In any game with more than 1 level you want to make sure to go the next level when the current ends, there's a lot of ways to do that"
category: "Godot"
tags: "4.x, Addon"
date: "2024-08-05"
---

# Awesome Scene Manager

[Github Link](https://github.com/DaviD4Chirino/Awesome-Scene-Manager)

A simple Godot 4.x addon to make scene swapping a lot easier.

![Awesome Scene Manager Icon](https://raw.githubusercontent.com/DaviD4Chirino/Awesome-Scene-Manager/main/plugin_icon.png)

In any game with more than 1 level you want to make sure to go the next level when the current ends, there's a lot of ways to do that, an im sure you can also make a scene or class called Level and trigger an animation when the current one ends.

In fact thats exactly what I did, with the call of a single line of code you trigger a chain of events;

1. Play the transition-in animation
2. Change the level in the background
3. Play the out animation

I also made it so it loads the new level in the background, you can also monitor the progress if you want that loading screen.

I wanted to have custom animations so Godot's AnimationPlayer node came very handy. With it you can essentially make any transition screen, there's a fade transition by default.

And more than that, sometimes in your game structure it makes more sense to have a middle manager for stats and whatnot, so i made a second utility that takes a specific node and replaces it with the new scene.

Basically if you have a node that, lets say, tracks the performance of the player and adjust next level difficulty, you don't want to replace the manager node, you want to replace the level node that it is inside. This addon takes care of that too.

Overall, a very fun project that faster to make than i tough.
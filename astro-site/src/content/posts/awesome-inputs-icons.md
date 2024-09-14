---
id: "8ca067ab-ce3f-46c4-b864-b763c823c29a"
title: "Awesome Inputs Icons "
description: "Have you noticed that most games when they tell you to press X button they usually show an icon?"
category: "Godot"
tags: "4.x, Addon, Post-mortem"
date: "2024-08-25"
---

# Awesome Inputs Icons

[Github Link](https://github.com/DaviD4Chirino/Awesome-Input-Icons)

Have you noticed that most games when they tell you to press X button they usually show an icon?

Like if they say to press **SpaceBar** they rather show you an icon that looks like the real spacebar button.

Its so good in fact that usually games prefers to show an icon instead of text.

Now despite of how common this is, i could not find a consensus on how to implement it.

I did find other addons with the same objective, however they usually had their own icons and i needed to provide logic to handle the Inputs, i wanted to call a function, pass the InputName and get the icon, was it too hard to ask?

Kinda, as is with everything, programming is hard but i have it a try anyway. Turns out i didn't explode and died in the making.

![Awesome Inputs Icons plugin icon](https://raw.githubusercontent.com/DaviD4Chirino/Awesome-Input-Icons/main/addons/awesome_input_icons/plugin_icon.png)

So first things, i made a resource that hold information regarding what icon belongs to what input.

I used a schema to make the config, its basically an array of pairs of keycodes, types and Icons.

Now, i didn't wanted to click new resource for the 100+ keys so i had to populate them somehow. Lucky for me, Godot has all the keys in eazy acces in what it looks like an **enum** in the global class, Unlucky for me, the global enums are transformed into constants so i had to make an array with the values of the enums by hand.

This amazing because, now if for some reason thy change the value of the keycodes I would have the updated values, _as long as they dont rename the keys._

Another good thing is the **@tool** param that lets you change things inside the editor, so a click and i generate 100+ resources with default values. This doubles as a reset button.

Then i do some validation, make sure it does not break the game. I had to do a lot of class matching to make sure the type is the correct because a keyboard key is very diferent from a mouse button.

## In the end

I managed to make a System where you can config a schema (and swap them out, save the resource, etc), is mostly free of hassle and it works with keyboards, mouse, joysticks and even mouse motion _[(by FeniXb3)](https://github.com/FeniXb3), love you, stranger_
Its the most proud i been with myself in a while, and its also the first ever piece of code made to be use by others. It teached me a lot of about ease of use and what do I expect as a user while making the tool.

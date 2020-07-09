# Sysml
anetom-6
june-2020
Introduction
============

This will be where i document stuff to remember.

I will call the software I’m working on for simply the “software”.

Got the newest version of the “software” from Jesper 12/6, seems to be some tweaks from the previous version.

Eclipse and plantUML
====================

I will write about my experience with Eclipse and PlantUML. For some reason the type name must be the same as the name of the “object”. For example: part car : car[1] is ok but part car : Car[1] is not ok since they doesn’t share the same name. From the documentation i got from Jan the correct syntax is more like the latter since they want the type to start with a big letter or if you want your own defined type name. For example: part corolla : ’Toyota corolla’[1].

Another thing I noticed is that for every time you want to declare your own definition on a name/types/connections etc Eclipse will tell you “Couldn’t resolve reference to Type ”enter the name here””. If you know what you’re doing it’s fine but for user new to the system (me included) will probably be confused.

From here on when Eclipse gives me small error that types aren’t declared and similar stuff I will call them soft errors. When the software can’t run or crash I will call them errors.

**Update:** If you name a part with the name you want and then put it as block PlantUML will accept it. for example:

part apartment\_buildings : ’Apartment buildings’[1]; and then make a block with block ’Apartment buildings’. The block should be defined before the part.

Sometimes to get values right it’s \(<\)value name\(>\) \(:>\) \(<\)unit name\(>\) and sometimes it’s value \(<\)value name\(>\) : \(<\)unit name\(>\). The examples I have seen is ISQ that have standard unit such as length, force etc it’s the first of the examples. The second example when I just wanted string. As a side note I had to import ISQ and StringFunction for it to work.

Explanation of the diagrams of PlantUML
---------------------------------------

PlantUML
--------

The diagram is structured in a certain way and this subsection will explain what everything means. In the package there is squares with different names and a symbol the left of the name. So far I’ve seen “B”, “P”, “T”, “F” which says what type that square is. “B” is a block, “P” is part, “T” is value type and “F” I don’t know yet. You can have packages in packages but you can’t have two “outer” packages in a file. For example package x ( package y()) is ok but not package x () package y().

### B blocks

Is one of the most used block in the diagrams. It is used to describe an object. When going to another block it’s a line with a hollow arrowhead attached to the child block. When going to a part block it will be a line with a diamond attached to it.

Depending of the start node and end node the arrows will look different. When an arrow goes from a block to a part it will be a line with a diamond attached at the end at the parent. The same is applied when there is a connection between two parts. When going from a part to a block the arrow will be dotted with a hollow arrowhead at the child. The connection between two block will have a filled arrow with a hollow arrowhead.

### P blocks

Is also used often, describes that it’s a part of something. A block can be a part of another block. A part can also be a part of a part. When a part is connected to another part it’s a line with a diamond attached to the parent part. From what I’ve seen if a part introduce a new value there will be a dotted line with a hollow arrowhead. (This can be wrong, needs to check more of it)

### T blocks

The “T” square can be a value definition block but also be used to show some sort of action, in the example \("VehicleModel_evs_update.sysml"\), “provided power”, in-value is fuel and out comes torque. This describes what the action is. You can use the port command also and get different “T” square and then you can just define the in value.

### F blocks

What I have studied right now is “Wheel package” in sysml/src/examples/v1 Spec Examples/8.4.1 Wheel Hub Asssembly. There I noticed that the “P” and “B” in the blocks stands for “Parts” and “Blocks”. If a block is part of something it will have a dotted line and if a part is a part of something the it will have a line with a diamond from it’s parent. From this example when a block is a part, the block is defined first. When a connection between to blocks the connection is a line with a hollow arrowhead. “T” is value type, can’t say what’s different between it and just value. “F” is when something is redefined or if it’s a requirement.

### Home

Home works except the new defined names on both the “objects” and the name of the lengths.

Made a new files called home works. Had to remove value \<value\> because the system crash. Can’t enter values can’t be entered since both systems doesn’t accept the other program’s solution. Changed the type name so they have the same name. link have the same problem as before.

**Update 12/6:** Changed the value to “value local\_IP : IPAddress;” and made a block called IPAddress. No soft error but need to check if it shows correct paths.

### Wheel package

The package works with the “software” but when I don’t import ISQ I get soft errors on some of the values. New defined types still returns soft errors. When I import ISQ, the “software” crash when reading the file. Needs to check if a string can be a value without getting a soft error.

**Update 12/6:** Didn’t crash when I wrote “value inflationPreassure : ’Pressure’;”, still gives a soft error since that unit hasn’t been declared.

### Usecase\_\(6\)

PlantUML have problem showing special char as \("\&"\) and Swedish letter like “å,ä,ö”. When I have more than one package in the same file PlantUML says “missing EOF at ’package’” at the next package. When splitting it up the error goes away but then I have problem with the links in the file I named “Main”. The "software crash when I try to load that file but the other files works fine. Need to check if I can change the links so they work.

### dist\_heating

You can’t have two package in the same file before you get a soft error, sort of make sense. Put the package in different files and it worked wonders. It didn’t even give soft errors on the name for some reason. Still same soft error when assigning values.

“part single\_family\_houses : ’DH family house’::’Single family houses’[1];” the part after “house :” seems to be the link from one package to another.

Features that needs implementing or updating
============================================

Assocblock
----------

Assocsblock needs to be implemented so they work because right now the code is written but it looks like some of the code isn’t executed and the software returns an error and crash. The problem seems to be where that “end” isn’t read and therefore the software doesn’t get the desired keyword. This is to remove the soft errors when defining a name to the link.

Update from 15/6, I got the assocblock to not crash. I save the name and value of the end points but I don’t do anything with them right now. It seems Jesper got the link to work without the assocblock. I need to figure out if handleLink should be rewritten or not.

Imports
-------

Imports should also be implemented so values can be fetched from other files. These files are predefines such as ISQ and SI. They give values that has been tested and is well known.

Special characters
------------------

Swedish letters can’t be used without leaving a soft error and at risk of losing letters after it. This probably wont be fixed since the small pool of swedish speaking people. What’s more problematic is the lack of special characters such as “&”, they seem to be handled as the swedish letters.

Simpler navigation
------------------

There should be a back-function so you don’t have choose the specific package if you want to go back after inspecting a block. The diagram should also auto-update when pushing back or a specific package so you don’t have to click draw every time.

Values
------

An easier way to add values without getting soft errors and so they display the correct value in both PlantUML and the “software”.

Parts restrictions
------------------

In the “software” it’s neither allowed for parts to have other parts or some sort of value nor part to be outside a block.

Port
----

Can’t have a value type at the start of the file. port def doesn’t work.

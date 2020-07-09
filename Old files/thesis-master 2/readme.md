# thesis

## How to use it
        Open the side menu to select the files to use, or open the editor for writing a smaller example
        When the side menu is closed all the files will be parsed. If no error alert show up, then the packages 
        should be visible in the top menu.

        In the top menu one can select which package to use, and which block to use as a starting point. 
        The depth and the size of the boxes can be selected using the sliders.
        Then there are three opinons for the diagram type. Two are BDDs and one IBD. 
        One of the BDD diagrams will use two depth values and only draw the blocks that are in the range. 
        
        The fourth option for drawing the diagram is to select 'ALL' when selecting the block. 
        This will draw all the blocks as a BDD. 
       
        
        It is possible to Zoom in on the diagram using the scroll wheel. It is also possible to move the diagram 
        by clicking and dragging. 
        Hovering over a block will show a information box of the block. 
        Clicking on a block will draw a new diagram, with the active settings in the top menu and with the clicked block 
        as the starting point.

## Texutal Syntax   
   ### package
   A frame containing blocks, value types and abstract blocks 
               
            package << name >> { <br>
                << package content here>> <br> 
            }
               

   ### block
   A block can be declared inside a package
   A block can contain parts, links, references, values or references to value types
       
        empty block:
            block << name >>; 
        block with content:
            block << name >> { 
                << block content here >> 
            }
       
   ### abstract block
   A block can be declared as abstract making it possible for other blocks to inherit the content.

        empty abstract block:
            abstract block << name >>; 
        
        abstract block with content:
            abstract block << name >> { 
                << block content here >> 
            }
    For a block to inherit an abstract block use the ":>"
   
            block << name >> :> << Name of block to inherit from >>; 

    The block can override inherited parts by assigning a new part and use the same part name. 
    
    Note that the abstract block has to be declared in the same package
    and before the block that should inherit
  
   ### value type
   A value type contains values (See value below) <br>
    
        value type << name >> { 
            << values here >> 
        }
   
   ### value
   A value can be content of a block or a value type. A value is not the same as a value type. <br>
   A value type can be referenced to using the value keyword. 
    
        For adding a value to a block
            << name >> :> << Type >>;
            
        For making a reference to a value type
            value << name >> : << value_type >> [<< amount >>];
        
   ### part
   A part can be content of a block. <br>

            part << name >> : << block >> [<< amount >>];

        
   It is possible to assign a part that references a block defined in another package. In that case the "::" should be used. 

        part << name >> : << package_name >>::<< block >> [<< amount >>];

        
   ### ref
   A block can reference another block

        ref << name >> : << block >> [<< amount >>];

        
   ### link
   The link is used for connecting parts. The link should be defined inside a block. 
   It is using the name of a part that is a part of the block.

        link : << relation_name >> connect << part_name_1 >> to << part_name_2 >>; 

    
   It is possible to assign the link to a part of the part using '::'.

        link : << rel_name >> connect << part_of_block_name >>::<< part_name >> to << part_name_2 >>; 

Note that the part must have been defined before they are referenced.

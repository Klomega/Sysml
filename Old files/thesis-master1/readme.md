# thesis

## How to use it?

Open the index.html file in a web browser. In the side bar, import .txt files with text that is following the syntax below.
Click Parse. \
Select which package to use and which block to draw in the top bar. Select the depth, box size, and diagram type and click on draw. 



## Syntax


### package
A frame containing blocks, value types and assoc blocks \

package \<name\> \
    << package content here>> \
}



### block
A block can be declared inside a package \
A block can contain values, parts, links and references \
empty block \
block \<name\> ; \
block with content \
block \<name\> { \
    << block content here >> \
}
#### abstract block
A block can be declared as abstract making it possible for other block to inherit.
If a block should inherit a abstract block it should user the syntax \
block \<name\> :> \<Name of block to inherit from\> 

The block can override inherited parts by assigning a new part and use the same part name.

#### value
A value can be content of a block \
For assigning a normal value use \
\<name\> :> \<Type\>; \
For referencing a value type use the value key word \
value \<name\> : \<value_type\>;

#### part
A part can be content of a block \
part \<name\> : \<block\> [\<amount\>];

#### ref
A Reference can be a part of a block \
ref \<name\> : \<block\> [\<amount\>];

#### link
The link is used for connecting parts. \
link : \<relation_name\> connect \<part_name_1\> to \<part_name_2\>; \
It is possible to "Dig deeper" using '::'. For example \<p_1\>::\<p_2\> .


### value type
A value type contains references to normal values \
value type \<name\> { \
     << values here >> \
}

### assoc block NOT IMPLEMENTED
An assoc block declares an association between two blocks. Uses the end keyword for content \
assoc block \<name\> { \
    << content here >> \
}

#### end
end is used inside the assoc block\
end \<name\> [\<amount\>];

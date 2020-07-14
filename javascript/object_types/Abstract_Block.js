
class Abstract_Block extends Block{

    constructor(name) {
        super(name);

    }

    add_part(part) {
        console.log(part);
        if(!this.get_part_by_name(part.name)) {
            this.parts.push(part);
            part.block.increase_is_part();
        }
    }
}
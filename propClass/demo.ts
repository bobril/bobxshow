import * as b from "bobril";
import { observable, observableProp } from "bobx";
import * as m from "bobril-m";
import { image } from "../common";

class Demo {
    @observable
    text = "";
}

const demo = new Demo();

export function run() {
    return m.Paper({ zDepth: 1, style: { padding: 8 } }, [
        m.TextField({ labelText: "Enter some text", value: observableProp(demo, "text") }),
        m.TextField({ labelText: "Clone", value: observableProp(demo, "text") }),
        b.styledDiv(["Length: ", demo.text.length], { padding: 8 }),
        m.Button({ type: m.ButtonType.Raised, action: () => (demo.text = "Hello") }, "Say hello"),
        image(b.asset("src.png"))
    ]);
}

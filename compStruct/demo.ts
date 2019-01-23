import * as b from "bobril";
import { observable, observableProp, computed } from "bobx";
import * as m from "bobril-m";
import { image } from "../common";

class Demo {
    @observable
    text = "";

    @computed.struct
    fancyText(): b.IBobrilNode {
        const text = this.text;
        let res = [] as b.IBobrilNode[];
        for (let i = 0; i < text.length; i++) {
            res.push(
                b.styledDiv(text.substr(i, 1), {
                    color: "hsl(" + ((i * 360) / text.length).toFixed(0) + ", 100%, 70%)",
                    fontSize: (20 + 5 * Math.sin((i * Math.PI * 2) / text.length)).toFixed(1) + "px",
                    display: "inline"
                })
            );
        }
        return b.styledDiv(res);
    }
}

const demo = new Demo();

export function run() {
    return m.Paper({ zDepth: 1, style: { padding: 8 } }, [
        m.TextField({ labelText: "Enter some text", value: observableProp(demo, "text") }),
        b.styledDiv(demo.fancyText(), { padding: 8, minHeight: 30 }),
        image(b.asset("src.png"))
    ]);
}

import * as b from "bobril";
import { observable, observableProp, computed, interrupted, gotPartialResults, debugRunWhenInvalidated } from "bobx";
import * as m from "bobril-m";

function simulateHardWork(time: number) {
    const start = +new Date();
    while (start + time >= +new Date());
}

class Demo {
    @observable
    text = "";

    @observable
    hueMove = 0;

    @computed
    fancyChar(idx: number): b.IBobrilNode | undefined {
        const text = this.text;
        if (interrupted()) return undefined;
        simulateHardWork(10);
        return b.styledDiv(text.substr(idx, 1), {
            color: "hsl(" + (((idx * 360) / text.length + this.hueMove) % 360).toFixed(0) + ", 100%, 70%)",
            fontSize: (20 + 5 * Math.sin((idx * Math.PI * 2) / text.length)).toFixed(1) + "px",
            display: "inline"
        });
    }

    @computed
    fancyText(): b.IBobrilNode {
        const text = this.text;
        let res = [] as b.IBobrilNode[];
        for (let i = 0; i < text.length; i++) {
            let n = this.fancyChar(i);
            if (gotPartialResults())
                n = b.styledDiv(text.substr(i, 1), {
                    color: "#888",
                    fontSize: (20 + 5 * Math.sin((i * Math.PI * 2) / text.length)).toFixed(1) + "px",
                    display: "inline"
                });
            res.push(n!);
        }
        return b.styledDiv(res);
    }
}

const demo = new Demo();

export function run() {
    return m.Paper({ zDepth: 1, style: { padding: 8 } }, [
        m.TextField({ labelText: "Enter some text", value: observableProp(demo, "text") }),
        m.Slider({ min: 0, max: 360, value: observableProp(demo, "hueMove") }),
        b.styledDiv(demo.fancyText(), { padding: 8, minHeight: 30 })
    ]);
}

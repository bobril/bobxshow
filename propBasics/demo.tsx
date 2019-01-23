import * as b from "bobril";
import * as bobx from "bobx";

const value = bobx.observable("");

export function run() {
    return (
        <div>
            <input value={value.prop()} />
            <hr />
            <div>Length of input: {value.get().length}</div>
            <div>Uppercase: {value.get().toUpperCase()}</div>
            <hr />
            <img src={b.asset("src.png")} style={{ width: "50%", height: "auto" }} />
        </div>
    );
}

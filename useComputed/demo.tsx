import * as b from "bobril";
import { useObservable, useComputed } from "bobx";

function Counter() {
    const count = useObservable(0);
    const resetButton = useComputed(() => <button onClick={() => count(0)}>Reset</button>);
    const changeButton = useComputed((delta: number, text: string) => (
        <button onClick={() => count(count() + delta)}>{text}</button>
    ));
    return (
        <>
            Count: {count()} {resetButton()}
            {changeButton(+1, "+")}
            {changeButton(-1, "-")}
        </>
    );
}

export function run() {
    return <Counter />;
}

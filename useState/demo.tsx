import * as b from "bobril";

interface ICounterData {
    initialCount: number;
}

const Counter = b.component(function Counter({ initialCount }: ICounterData) {
    const [count, setCount] = b.useState(initialCount);
    return (
        <>
            Count: {count} <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        </>
    );
});

export function run() {
    return <Counter initialCount={0} />;
}

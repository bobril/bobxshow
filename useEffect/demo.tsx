import * as b from "bobril";
import * as m from "bobril-m";

function DemoUseEffect(_data: {}) {
    const text = b.useState("");
    const [counter, setCounter] = b.useState(0);
    b.useEffect(() => {
        const titleBackup = document.title;
        document.title = text() || "Your text will be here";
        setCounter(counter + 1);
        return () => {
            document.title = titleBackup;
        };
    }, [text()]);
    return (
        <m.Paper>
            <m.TextField labelText="Text" hintText="Enter some text here to be shown in browser title" value={text} />
            <div>Bobril frame number: {b.frame()}</div>
            <div>UseEffect call count: {counter}</div>
        </m.Paper>
    );
}

export function run() {
    return <DemoUseEffect />;
}

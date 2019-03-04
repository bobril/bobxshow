import * as b from "bobril";
import { observable } from "bobx";
import * as m from "bobril-m";

interface ICounterData {
    name: string;
}

class CounterCtx extends b.Component<ICounterData> {
    @observable
    counter: number = 0;

    render(data: ICounterData): b.IBobrilChildren {
        return (
            <m.Badge badgeContent={this.counter} primary>
                {data.name}
            </m.Badge>
        );
    }

    onClick(): boolean {
        this.counter++;
        return true;
    }
}

const Counter = b.component(CounterCtx);

export function run() {
    return <Counter name="Bobril" />;
}


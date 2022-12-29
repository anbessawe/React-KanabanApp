import { arrayBuffer } from "stream/consumers";
import { isTemplateExpression } from "typescript";

type Item = {
    id: string
}



export const findItemIndexById = <Titem extends Item>(
    items: Titem[],
    id: string
) => {
    return items.findIndex((item: Titem) => item.id === id);
}

export const moveItem = <Titem extends Item>(
    array: Titem[],
    from: number,
    to: number
) => {
    const item = array[from]
    return insertItemaAtIndex(removeItemAtIndex(array, from), item, to)
}

function insertItemaAtIndex<Titem>(array: Titem[], item: Titem, to: number) {
    return [...array.slice(0, to), item, ...array.slice(to)]
}

function removeItemAtIndex<Titem>(array: Titem[], from: number): Titem[] {
    return [...array.slice(0, from), ...array.slice(from + 1)]
}

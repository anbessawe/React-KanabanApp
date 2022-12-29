import { useRef } from "react"
import { AddNewItem } from "./AddNewItem"
import { Card } from "./Card"
import { useAppState } from "./state/AppStateContext"
import { addTask, moveList, moveTask, setDraggedItem } from "./state/actions"
import { ColumnContainer, ColumnTitle } from "./styles"
import { useItemDrag } from "./useItemDrag"
import { useDrop } from "react-dnd"
import { isHidden } from "./utils/isHidden"
import { DragItem } from "./DragItem"

type ColumnProps = {
    text: string,
    id: string,
    isPreview?: boolean
}
export const Column = ({ text, id, isPreview }: ColumnProps) => {

    const { getTasksByListId, dispatch, draggedItem } = useAppState();
    const tasks = getTasksByListId(id);
    function dispatchToAddTask(text: string, listId: string) {
        dispatch(addTask(text, listId));
    }
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: "COLUMN", id, text })
    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover(item: DragItem) {

            if (!draggedItem) { return }
            if (item.type === "COLUMN") {
                if (draggedItem.type === "COLUMN") {
                    if (draggedItem.id === id) { return }
                    dispatch(moveList(draggedItem.id, id))
                }
            } else if (item.type === "CARD") {
                if (draggedItem.type === "CARD") {
                    if (draggedItem.columnId === id) {
                        return
                    }
                    if (tasks.length) {
                        return
                    }
                    dispatch(
                        moveTask(draggedItem.id, null, draggedItem.columnId, id)
                    )
                    dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
                }
            }
        }
    })

    drag(drop(ref))

    return (
        <ColumnContainer
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
            isPreview={isPreview}
        >
            <ColumnTitle>{text}</ColumnTitle>
            {
                tasks.map(task => (
                    <Card
                        text={task.text}
                        key={task.id}
                        id={task.id}
                        columnId={id}
                    />
                ))
            }
            <AddNewItem
                buttonText="+ Add another task"
                onAddFunction={(text) => { dispatchToAddTask(text, id) }}
                darkMode={true}
            />
        </ColumnContainer >
    )
}
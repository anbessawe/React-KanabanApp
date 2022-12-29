import { Dispatch, FC, createContext, useContext, useEffect } from "react"
import { Action } from "./actions"
import { useImmerReducer } from "use-immer"
import { appStateReducer } from "./appStateReducer"
import { DragItem } from "../DragItem"
import { save } from "../api"
import { withInitialState } from "../withInitialState"


export type AppState = {
    lists: List[]
    draggedItem: DragItem | null;
}

type List = {
    id: string
    text: string
    tasks: Task[]
}

type Task = {
    id: string
    text: string
}

type AppStateContextProps = {
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
    draggedItem: DragItem | null
}

type AppStateProviderProps = {
    children?: React.ReactNode
}

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
)

//Custom Provider Component
export const AppStateProvider: FC<AppStateProviderProps> = withInitialState<AppStateProviderProps>(
    ({ children, initialState }) => {
        const [state, dispatch] = useImmerReducer(appStateReducer, initialState)
        const { lists, draggedItem } = state
        const getTasksByListId = (id: string) => {
            return lists.find((list) => list.id === id)?.tasks || []
        }
        useEffect(() => { save(state) },
            [state]
        )

        return (
            <AppStateContext.Provider value={{
                lists,
                getTasksByListId,
                dispatch,
                draggedItem
            }}>
                {children}
            </AppStateContext.Provider>
        )


    })

//Custom Hook
export const useAppState = () => {
    return useContext(AppStateContext);
}
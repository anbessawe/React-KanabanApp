//Higher Order Component

import { ComponentType, useEffect, useState } from "react"
import { AppState } from "./state/AppStateContext"
import { load } from "./api"

type InjectedProps = {
    initialState: AppState
}

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

export function withInitialState<TProps>(WrappedComponent: ComponentType<TProps & InjectedProps>) {

    return (props: PropsWithoutInjected<TProps>) => {
        const [initalState, setInitialState] = useState<AppState>({ lists: [], draggedItem: null })
        const [isLoading, setIsLoading] = useState(true)
        const [error, setError] = useState<Error>()


        useEffect(
            () => {
                const fetchInitialState = async () => {
                    try {
                        const data = await load()
                        setInitialState(data)
                    } catch (e) {
                        setError(e as Error)
                    }
                    setIsLoading(false)
                }
                fetchInitialState()
            }, []
        )

        if (isLoading) {
            return <div>Loading</div>
        }
        if (error) {
            return (
                <div>{error.message}</div>
            )
        }

        return (
            <WrappedComponent
                {...props as TProps}
                initialState={initalState}
            />
        )

    }
}
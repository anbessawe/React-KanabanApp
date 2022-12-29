import { AppState } from "./state/AppStateContext";

export const save = (payLoad: AppState) => {
    return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "applicaiton/json"
        },
        body: JSON.stringify(payLoad)
    }).then(
        (response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Error while saving the state.")
            }
        }
    )
}

export const load = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`).then(
        (response) => {
            if (response.ok) {
                return response.json() as Promise<AppState>
            } else {
                throw new Error("Error while loading the state.")
            }
        }
    )
}
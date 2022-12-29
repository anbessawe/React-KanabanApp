import { useState } from "react"
import { AddItemButton } from "./styles"
import { NewItemForm } from "./NewItemForm"

type AddNewItemProps = {
    onAddFunction(text: string): void
    buttonText: string
    darkMode: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {

    const [showForm, setShowForm] = useState(false);
    const { onAddFunction, buttonText, darkMode } = props;

    if (showForm) {
        return (
            <NewItemForm
                onAdd={text => {
                    onAddFunction(text)
                    setShowForm(false)
                }} />
        )
    }

    return (
        <AddItemButton dark={darkMode} onClick={() => setShowForm(true)}>
            {buttonText}
        </AddItemButton>
    )
}
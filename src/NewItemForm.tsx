import React, { useCallback, useState } from "react"
import { NewItemButton, NewItemFormContainer, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

type NewItemFormProps = {
    onAdd(text: string): void
}
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {

    const [text, setText] = useState("");

    const inputRef = useFocus();
    const handleKeyPress = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === "Enter") onAdd(text) },
        [onAdd, text]
    );
    const onClick = useCallback(() => onAdd(text), [onAdd, text])
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value), [])

    return (
        <NewItemFormContainer>
            <NewItemInput
                ref={inputRef}
                value={text}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <NewItemButton onClick={onClick}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )

}


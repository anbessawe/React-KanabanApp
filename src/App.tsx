import { FC } from "react";
import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { Column } from "./Column";
import { addList } from "./state/actions";
import { CustomDragLayer } from "./CustomDragLayer";

export const App: FC = () => {

  const { lists, dispatch } = useAppState()

  function dispatchToAddList(text: string) {
    dispatch(addList(text));
  }

  return (
    <AppContainer>
      <CustomDragLayer />
      {
        lists.map(
          (listItem) =>
          (<Column
            key={listItem.id}
            text={listItem.text}
            id={listItem.id}
          />)
        )
      }
      <AddNewItem darkMode={false} buttonText="+ Add another list" onAddFunction={(text) => dispatchToAddList(text)} />
    </AppContainer>
  )


}


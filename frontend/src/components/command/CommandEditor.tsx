import { BlockNoteEditor, filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  userInputItem,
  searchWebItem,
  scrapeURLItem,
  imageGenerationItem,
  textGenerationItem,
} from "./CommandOptions";

import { schema } from "./customschema/Schema";
import { useState } from "react";

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  userInputItem(editor),
  searchWebItem(editor),
  scrapeURLItem(editor),
  // @ts-ignore
  imageGenerationItem(editor),
  // @ts-ignore
  textGenerationItem(editor),
  // ...getDefaultReactSlashMenuItems(editor),
];

const Editor = () => {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({ schema });
  const [title, setTitle] = useState(""); // State for the title

  return (
    <div className="flex flex-1 items-center px-4 py-6 w-full">
      <div className="w-full max-w-4xl min-h-[500px] border border-gray-300 rounded-lg shadow-md p-6 bg-white relative">
        {/* Card Title (Notion-style) */}
        <input
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-bold focus:outline-none w-full placeholder-gray-400 mb-4"
        />
        <BlockNoteView editor={editor} slashMenu={false} theme={"light"}>
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={async (query) =>
              //@ts-ignore
              filterSuggestionItems([...getCustomSlashMenuItems(editor)], query)
            }
          />
        </BlockNoteView>
      </div>
    </div>
  );
};

export default Editor;
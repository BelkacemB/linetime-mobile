import React, { useMemo } from "react";
import Habit from "../model/Habit";
import { extractTagsFromHabits } from "../model/Util";

export default function useHabitTags(habits: Habit[]) {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState<string>("");

  const tags = useMemo(() => extractTagsFromHabits(habits), [habits]);

  const toggleTagSelection = (tag: string) => {
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onAddTag = () => {
    if (newTag.length > 0) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag("");
    }
  };

  return {
    tags,
    selectedTags,
    setSelectedTags,
    newTag,
    setNewTag,
    onAddTag,
    toggleTagSelection,
  };
}

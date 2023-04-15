import React, { useEffect } from "react";
import Habit from "../model/Habit";
import { extractTagsFromHabits } from "../model/Util";

export default function useHabitTags(habits: Habit[]) {
  const [tags, setTags] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState<string>("");

  useEffect(() => {
    setTags(extractTagsFromHabits(habits));
  }, [habits]);

  const toggleTagSelection = (tag: string) => {
    const startTime = new Date().getTime();
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    console.log("toggleTagSelection took: ", new Date().getTime() - startTime);
  };

  const onAddTag = () => {
    if (newTag.length > 0) {
      setTags([...tags, newTag]);
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

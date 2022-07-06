import React, { useEffect } from "react";
import { extractTagsFromHabits } from "../model/Util";
import useUserHabitList from "./useUserHabitList";

// TODO Split in two hooks: one for selection and one for reading the list
export default function useHabitTags() {
  const { habits } = useUserHabitList();
  const [tags, setTags] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState<string>("");

  useEffect(() => {
    setTags(extractTagsFromHabits(habits));
  }, [habits]);

  const toggleTagSelection = (tag: string) => {
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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

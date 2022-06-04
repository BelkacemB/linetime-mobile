import React, { useState, useEffect } from "react";
import { extractTagsFromHabits } from "../model/Util";
import useUserHabitList from "./useUserHabitList";

export default function useHabitTags() {
  const [habits] = useUserHabitList();
  const [tags, setTags] = React.useState<string[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState<string>("");

  useEffect(() => {
    setTags(extractTagsFromHabits(habits));
  }, [habits]);

  const toggleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
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
    newTag,
    setNewTag,
    onAddTag,
    toggleTagSelection,
  };
}

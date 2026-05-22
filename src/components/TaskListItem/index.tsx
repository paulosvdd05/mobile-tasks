import { Feather } from '@expo/vector-icons';
import { FC, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { useAppTheme } from '../../hooks';
import { TaskItem as TaskItemModel } from '../../types/tasks';
import { useTaskListItemStyles } from './styles';

interface TaskListItemProps {
  onRequestDelete: (task: TaskItemModel) => void;
  onToggle: (task: TaskItemModel) => void;
  task: TaskItemModel;
}

export const TaskListItem: FC<TaskListItemProps> = ({ onRequestDelete, onToggle, task }) => {
  const theme = useAppTheme();
  const styles = useTaskListItemStyles(theme);
  const swipeableRef = useRef<Swipeable | null>(null);

  return (
    <Swipeable
      friction={2}
      overshootRight={false}
      ref={swipeableRef}
      renderRightActions={() => (
        <View style={styles.rightActionContainer}>
          <Pressable
            onPress={() => {
              swipeableRef.current?.close();
              onRequestDelete(task);
            }}
            style={styles.deleteAction}
          >
            <Feather color={theme.colors.white} name='trash-2' size={18} />
          </Pressable>
        </View>
      )}
      rightThreshold={32}
    >
      <Pressable onPress={() => onToggle(task)} style={styles.row}>
        <View style={[styles.checkbox, task.checked && styles.checkboxChecked]}>
          {task.checked ? <Feather color={theme.colors.white} name='check' size={12} /> : null}
        </View>

        <Text numberOfLines={1} style={[styles.label, task.checked && styles.labelChecked]}>
          {task.name}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

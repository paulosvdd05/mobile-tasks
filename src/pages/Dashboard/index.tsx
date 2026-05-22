import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

import { AppBottomSheet, AppButton, AppTextInput, AvatarBadge, ScreenContainer, TaskListItem } from '../../components';
import { routes } from '../../constants';
import { useAppTheme, useTasks } from '../../hooks';
import { useAppSelector } from '../../store';
import { RootStackParamList } from '../../types/navigation';
import { TaskItem } from '../../types/tasks';
import { capitalizeFirstLetter, getInitials } from '../../utils';
import { useDashboardStyles } from './styles';

type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export const Dashboard = ({ navigation }: DashboardScreenProps) => {
  const theme = useAppTheme();
  const styles = useDashboardStyles(theme);
  const user = useAppSelector(state => state.session.user);
  const {
    createTask,
    deleteTask,
    doneTasks,
    hasPendingChanges,
    isLoading,
    isOffline,
    isSyncing,
    lastError,
    pendingCount,
    synchronizeTasks,
    toDoTasks,
    toggleTask,
  } = useTasks();

  const [draftName, setDraftName] = useState('');
  const [draftError, setDraftError] = useState('');
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskItem | null>(null);

  const initials = useMemo(() => getInitials(user?.name ?? 'Usuario'), [user?.name]);
  const isEmpty = toDoTasks.length === 0 && doneTasks.length === 0;
  const showLoadingOverlay = isLoading || isSyncing;
  const showRefreshAction = Boolean(lastError || hasPendingChanges);

  const handleOpenCreate = () => {
    setDraftError('');
    setDraftName('');
    setIsCreateVisible(true);
  };

  const handleCloseCreate = () => {
    setDraftError('');
    setDraftName('');
    setIsCreateVisible(false);
  };

  const handleCreateTask = async () => {
    try {
      await createTask(draftName);
      handleCloseCreate();
    } catch (error) {
      setDraftError(error instanceof Error ? error.message : 'Nao foi possivel adicionar a tarefa.');
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) {
      return;
    }

    await deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };

  const handleRefreshSync = async () => {
    await synchronizeTasks();
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={styles.greeting}>{`Ola, ${user?.name ?? 'Usuario'} 👋`}</Text>

              {isOffline ? <Text style={styles.helperText}>Modo offline. Suas alteracoes serao sincronizadas quando a internet voltar.</Text> : null}

              {showRefreshAction ? (
                <View style={[styles.syncNotice, lastError && styles.syncNoticeError]}>
                  <View style={styles.syncNoticeCopy}>
                    <Text style={[styles.syncNoticeText, lastError && styles.syncNoticeTextError]}>
                      {lastError ?? `${pendingCount} alteracao(oes) aguardando sincronizacao.`}
                    </Text>
                  </View>

                  <Pressable
                    disabled={isOffline || showLoadingOverlay}
                    onPress={handleRefreshSync}
                    style={({ pressed }) => [
                      styles.refreshButton,
                      lastError && styles.refreshButtonError,
                      (isOffline || showLoadingOverlay) && styles.refreshButtonDisabled,
                      pressed && !(isOffline || showLoadingOverlay) && styles.refreshButtonPressed,
                    ]}
                  >
                    <Feather color={lastError ? theme.colors.danger : theme.colors.primary} name='refresh-cw' size={14} />
                    <Text style={[styles.refreshButtonText, lastError && styles.refreshButtonTextError]}>Atualizar</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>

            <Pressable onPress={() => navigation.navigate(routes.profile.name)} style={styles.avatarButton}>
              <AvatarBadge initials={initials || 'U'} />
            </Pressable>
          </View>

          {isEmpty ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Nenhuma tarefa por aqui ainda.</Text>
            </View>
          ) : (
            <View style={styles.sections}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>A fazer</Text>

                <View style={styles.taskGroup}>
                  {toDoTasks.map(task => (
                    <TaskListItem key={task.id} onRequestDelete={setTaskToDelete} onToggle={nextTask => toggleTask(nextTask.id, !nextTask.checked)} task={task} />
                  ))}
                  {toDoTasks.length === 0 ? <Text style={styles.sectionEmptyText}>Sem tarefas.</Text> : null}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Feito</Text>

                <View style={styles.taskGroup}>
                  {doneTasks.map(task => (
                    <TaskListItem key={task.id} onRequestDelete={setTaskToDelete} onToggle={nextTask => toggleTask(nextTask.id, !nextTask.checked)} task={task} />
                  ))}
                  {doneTasks.length === 0 ? <Text style={styles.sectionEmptyText}>Sem tarefas.</Text> : null}
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable onPress={handleOpenCreate} style={styles.addButton}>
            <LinearGradient colors={[theme.colors.primary, theme.colors.primaryGradientEnd]} end={{ x: 1, y: 0.5 }} start={{ x: 0, y: 0.5 }} style={styles.addButtonGradient}>
              <Feather color={theme.colors.white} name='plus' size={16} />
            </LinearGradient>
          </Pressable>
        </View>

        {showLoadingOverlay ? (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingSpinner}>
              <ActivityIndicator color={theme.colors.white} size='small' />
            </View>
          </View>
        ) : null}
      </View>

      <AppBottomSheet onClose={handleCloseCreate} visible={isCreateVisible}>
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Qual e a sua tarefa?</Text>

          <AppTextInput
            autoCapitalize='sentences'
            autoFocus
            errorMessage={draftError}
            label=''
            onChangeText={text => {
              setDraftError('');
              setDraftName(capitalizeFirstLetter(text));
            }}
            onSubmitEditing={handleCreateTask}
            placeholder='Comprar pao'
            returnKeyType='done'
            value={draftName}
            variant='minimal'
          />

          <AppButton onPress={handleCreateTask} title='Adicionar tarefa' />
        </View>
      </AppBottomSheet>

      <AppBottomSheet onClose={() => setTaskToDelete(null)} visible={Boolean(taskToDelete)}>
        <View style={[styles.sheetContent, styles.sheetCentered]}>
          <Text style={[styles.sheetTitle, styles.sheetTitleCentered]}>Tem certeza que deseja excluir essa tarefa?</Text>
          <Text style={styles.sheetSubtitle}>Essa acao nao pode ser revertida</Text>

          <AppButton onPress={handleDeleteTask} title='Excluir tarefa' variant='danger' />
        </View>
      </AppBottomSheet>
    </ScreenContainer>
  );
};

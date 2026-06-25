import Board from "../../components/Board/Board";
import TaskModal from "../../components/TaskModal/TaskModal";
import TaskModalContextProvider from "../../context/taskModal/TaskModalContextProvider";
import { useTaskModalContext } from "../../hooks/useTaskModalContext";
import AppLayout from "../../layouts/AppLayout/AppLayout";

function GlobalModal() {
  const { state, close } = useTaskModalContext();

  return (
    <TaskModal
      isOpen={state.isOpen}
      initialData={state.data ?? undefined}
      onClose={close}
    />
  );
}

const Home = () => {
  return (
    <TaskModalContextProvider>
      <AppLayout>
        <Board />
      </AppLayout>
      <GlobalModal />
    </TaskModalContextProvider>
  );
};

export default Home;

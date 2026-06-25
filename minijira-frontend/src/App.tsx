import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routers/AppRoute";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import { useConfirmDialog } from "./hooks/useConfirmDialog";
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog";
import { ConfirmDialogProvider } from "./context/confirmDialog/ConfirmDialogProvider";

const GlobalConfirmDialog = () => {
  const { dialogState, handleConfirm, handleCancel } = useConfirmDialog();
  const { isOpen, options } = dialogState;

  return (
    <ConfirmDialog
      isOpen={isOpen}
      title={options?.title}
      message={options?.message ?? ""}
      confirmLabel={options?.confirmLabel}
      cancelLabel={options?.cancelLabel}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      variant={options?.variant}
    />
  );
};

function App() {
  const { loadProfile } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadProfile(); // lấy user info từ server
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ConfirmDialogProvider>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
        <ToastContainer />
        <GlobalConfirmDialog />
      </ConfirmDialogProvider>
    </>
  );
}

export default App;

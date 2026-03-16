import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation.js";
import { useRegisterMutation } from "../hooks/useRegisterMutation.js";
import { AuthContext } from "../context/AuthContext.js";

export const AuthDialog = () => {
    const { isDialogOpen, dialogMode, closeAuthDialog } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const { mutate: loginUser, error: loginError, reset: loginReset, isPending: isLoginPending } = useLoginMutation();
    const { mutate: registerUser, error: signupError, reset: signupReset, isPending: isSignupPending } = useRegisterMutation();
    const error = dialogMode === "login" ? loginError : signupError;
    const isPending = dialogMode === "login" ? isLoginPending : isSignupPending;

    const resetFields = () => {
        setEmail("");
        setPassword("");
        setUserName("");
        loginReset();
        signupReset();
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (dialogMode === "login") {
            loginUser({ email, password }, { onSuccess: () => { resetFields(); closeAuthDialog(); } });
        }
        else {
            registerUser({ name: userName, email, password }, { onSuccess: () => { resetFields(); closeAuthDialog(); } })
        }
    }

    return (
        <Dialog className="dialog-auth" open={isDialogOpen} onClose={() => { resetFields(); closeAuthDialog(); }}>
            <DialogTitle>{dialogMode === "login" ? "התחברות" : "הרשמה"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="auth-form">
                    {dialogMode === "signup" && <TextField
                        required
                        label="שם מתשתמש"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />}
                    <TextField
                        required
                        label="אמייל"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        label="סיסמה"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </form>
                {error && <Alert severity="error">{error.message}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button type="submit" form="auth-form" disabled={isPending}>{isPending
                    ? dialogMode === "login"
                        ? "מתחבר..."
                        : "נרשם..."
                    : dialogMode === "login"
                        ? "כניסה לאתר"
                        : "הרשמה לאתר"}</Button>
            </DialogActions>
        </Dialog>
    )
}
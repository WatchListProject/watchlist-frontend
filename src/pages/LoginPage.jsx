import useLogin from '../hooks/useLogin';
import './LoginPage.css';
export const LoginPage = () => {

  const { handleLogin, email, setEmail, password, setPassword, error, loading } = useLogin();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Sign In</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Muestra errores */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="login-footer">
          <p>Dont have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

const Header = () => {
    const navigate = useNavigate();

    const { currentUser, logout } = useContext(AuthContext);
    return (
        <header className="p-3 text-bg-dark" >
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            <use xlinkHref="#bootstrap">
                            </use>
                        </svg>
                    </a>
                    {/* Removed extra header options (Features, FAQs, About, etc.) */}
                    <div className="text-end header-buttons">
                        {currentUser ? (
                            <>
                                <button type="button" className="btn btn-danger sign-out button" onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                                <button type="button" className="btn btn-warning" onClick={() => navigate('/signup')}>Sign-up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;
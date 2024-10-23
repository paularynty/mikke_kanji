import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const createUser = (user) => {
	return async (dispatch, getState) => {
		try {
			const users = getState().user.users;
			const userExist = users.find(u => u.username === user.username);
			if (userExist) {
				dispatch(notif('This username is already taken. Please choose a different one.', 60, 'light'));
			} else {
				const data = await userService.create(user);
				dispatch(appendUser(data));
				dispatch(notif('Successfully created user', 5, 'success'));
				return true;
			}
		} catch (err) {
			dispatch(notif('Failed to create user.', 60, 'danger'));
			console.error('Error creating user:', err);
			return false;
		}
	};
};

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addUser = async (data) => {
		const success = await dispatch(createUser(data));
		if (success) {
			navigate('/login');
		}
	};

	return (
		<div style={{ height: '100vh' }} className="d-flex align-items-center justify-content-center">
			<div style={{ width: '100%', maxWidth: '400px' }} className="mx-auto">
				<h3 className="text-center text-white">Register</h3>
				<form onSubmit={handleSubmit(addUser)}>
					<div className="form-group">
						<label htmlFor="formEmail" className="text-white">Email</label>
						<input
							type="email"
							id="formEmail"
							className={`form-control ${errors.email ? 'is-invalid' : ''}`}
							placeholder="Enter your email"
							{...register('email', {
								required: true,
								pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
							})}
						/>
						{errors.email && (
							<div className="invalid-feedback">
								Enter a valid email address.
							</div>
						)}
					</div>
					<div className="form-group">
						<label htmlFor="formUsername" className="my-2 text-white">Username</label>
						<input
							type="text"
							id="formUsername"
							className={`form-control ${errors.username ? 'is-invalid' : ''}`}
							placeholder="Choose a username"
							{...register('username', {
								required: true,
								pattern: /^\w{1,30}$/,
							})}
						/>
						{errors.username && (
							<div className="invalid-feedback">
								Username must be between one to 30 characters long.
							</div>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="formPassword" className="my-2 text-white">Password</label>
						<input
							type="password"
							id="formPassword"
							className={`form-control ${errors.password ? 'is-invalid' : ''}`}
							placeholder="Create a password"
							{...register('password', {
								required: true,
								pattern: /^\w{6,30}$/,
							})}
						/>
						{errors.password && (
							<div className="invalid-feedback">
								Create a password that is at least 6 characters in length.
							</div>
						)}
					</div>
					<div className="text-center mt-3">
						<button type="submit" className="btn btn-light mt-3">
							Sign Up
						</button>
					</div>
				</form>
				<div className="mt-3 text-center text-white">
					Already have an account? <Link to="/login" className="text-primary text-black">Log In</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
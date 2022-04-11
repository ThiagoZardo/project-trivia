import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import { getToken, getUserInfo } from '../redux/actions';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.validateButton,
    );
  };

  validateButton = () => {
    const { email, name } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    if (name !== '' && emailRegex.test(email)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleButton = async () => {
    const { fetchToken, userInfo } = this.props;
    const { name, email } = this.state;
    await fetchToken();
    userInfo(name, email);

    this.setState({
      redirect: true,
    });
  };

  render() {
    const { isDisabled, name, email, redirect } = this.state;
    return (
      <section className="formLogin">
        <form>
          <label htmlFor="name" id="labelName">
            Nome:
            <br />
            <input
              className="name"
              type="text"
              name="name"
              placeholder="Insira seu nome aqui."
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="name">
            Email:
            <br />
            <input
              className="email"
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              placeholder="Insira seu e-mail aqui."
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            id="botao"
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleButton }
          >
            Play
          </button>
        </form>
        <Button />
        {redirect && <Redirect to="/play" />}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  myToken: state.token,
});
const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(getToken()),
  userInfo: (name, email) => dispatch(getUserInfo(name, email)),
});

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  userInfo: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

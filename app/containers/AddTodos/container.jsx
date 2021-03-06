import React from 'react';
import { func } from 'prop-types';
import Input from '../../components/Input';

/**
 * The component below is a copy and paste from the components folder. You're tasked with the job
 * to convert this component into a stateless functional component with redux. YOU WILL NOT NEED
 * TO ADJUST THE FILES IN THE COMPONENTS FOLDER TO DO ANYTHING.
 *
 * You will be designing the container here, so your mapStateToProps and mapDispatchToProps
 * will be used here.
 *
 * HINTS:
 * - Read the documentation
 * - Follow the tests (they're designed to guide you along the way)
 * - Take your time and reflect on your approach before you change anything.
 *
 * NOTES:
 * - There are a lot of different ways people organize their code, so don't assume this is the only
 *   way to write redux code
 * - Remember to evaluate the differences between the component and the container once you have
 *   completed the tests and made everything render properly
 */

export const getDate = () => {
  const date = [];
  const today = new Date();
  date.push(today.getMonth() + 1);
  date.push(today.getDate());
  date.push(today.getFullYear());
  return date.join('/');
};

export class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ['text', 'difficulty', 'notes'],
      text: '',
      difficulty: '',
      notes: '',
    };
  }

  handleChange(e) {
    const { value } = e.target;
    const type = e.target.getAttribute('data-type');
    const update = {
      [type]: value,
    };
    this.setState(state => Object.assign({}, state, update), () => console.log(this.state));
  }

  handleClick() {
    const { text, difficulty, notes } = this.state;
    const { add } = this.props;
    const date = getDate();
    const todo = {
      text,
      difficulty,
      notes,
      date,
    };
    const empty = {
      text: '',
      difficulty: '',
      notes: '',
    };
    this.setState(state => Object.assign({}, state, empty), () => add(todo));
  }

  render() {
    const { types } = this.state;

    return (
      <div className="add-todo-container">
        {
          types.map(type => (
            <Input
              key={type}
              type={type}
              change={e => this.handleChange(e)}
              val={this.state[type]} // eslint-disable-line
            />))
        }
        <button type="button" onClick={() => this.handleClick()}>
          ADD TODO
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  add: func.isRequired,
};

import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'


export default class TodoForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: props.todo ? props.todo.description : '',
            createdAt: props.todo ? moment(props.todo.createdAt) : moment(),
            calendarFocused: false,
            error: ''
    }
}
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }) ) 
    }
    
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }) )
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }) )
    }
    onSubmit = (e) => {
        e.preventDefault()
        if (!this.state.description) {
            this.setState(() => ({ error: 'Please provide a description' }) )
        } else {
            this.setState(() => ({ error: '' }) )
            this.props.onSubmit({
                description: this.state.description,
                createdAt: this.state.createdAt.valueOf()
            })
        }
        this.state.description = ''
    }

    render() {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                  {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Add Todo"
                        autoFocus
                        className="text-input"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false }
                    />
                   
                        <button className="button">{this.props.todo ? 'Save' : 'Add'} Todo</button>
                    
                </form>
        )
    }
}
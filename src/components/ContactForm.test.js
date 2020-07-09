import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from './ContactForm'

// test('render ContactForm without crashing', () => {
//     render(<ContactForm />);
//   })

test('ContactForm adds new contact to the list', () => {
    const container = render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    fireEvent.change(firstNameInput, { target: { value: 'Brad'} })
    fireEvent.change(lastNameInput, { target: { value: 'Pitt'} })
    fireEvent.change(emailInput, { target: { value: 'Brad@gmail.com'} })
    fireEvent.change(messageInput, { target: { value: 'Testing'} })

    // const submitButton = screen.queryByText(/submit/i)
    const submitButton = screen.getByRole('button', {type: 'submit'});
    fireEvent.click(submitButton);

    const newContact = Document.querySelector('pre')
    expect(newContact).toBeInTheDocument();

})


test('Can not submit without required fields', () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', {type: 'submit'});
    expect(submitButton).toBeEnabled();
})


test('Error messages appear', () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);

    fireEvent.change(firstNameInput, {target: {value: 'ab'} })

    const submitButton = screen.getByRole('button', {type: 'submit'});
    fireEvent.click(submitButton);

    const error = screen.findByText(/looks like there was an error:/i)
    expect(error).toHaveTextContent(/looks like there was an error:/i);
})
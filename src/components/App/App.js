import React, { Component } from 'react';
import PhonebookCard from '../PhonebookCard/PhonebookCardStyled';
import Section from '../Section';
import Form from '../Form';
import ContactsList from '../ContactsList';
import Button from '../Button/ButtonStyled';
import Title from '../Title';
import { v4 as uuidv4 } from 'uuid';
import { load, save } from '../../utils/localStorage';

export default class App extends Component {
  state = {
    contacts: load('Contacts') || [],
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const duplicate = this.state.contacts.find(
      contact => contact.name === e.target.elements[0].value,
    );

    if (duplicate) return alert(`${duplicate.name} is already in contacts`);

    const name = e.target.elements[0].value;
    const number = e.target.elements[1].value;
    const id = uuidv4();

    this.setState(prevState => {
      const contacts = [...prevState.contacts, { name, number, id }];
      save('Contacts', contacts);
      return { contacts };
    });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleRemoveContact = e => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(
        contact => contact.id !== e.target.dataset.id,
      );
      save('Contacts', newContacts);
      return {
        contacts: newContacts,
      };
    });
  };

  render() {
    return (
      <>
        <Section
          title="My Phonebook App"
          fontSize={30}
          padding={20}
          tagName="h1"
        />
        <PhonebookCard>
          <Section title="Phonebook">
            <Form handleSubmit={this.handleSubmit} />
          </Section>
          <Section title="Contacts">
            <Title
              as="h3"
              title="Find contacts by name"
              fontSize="16"
              textAlign="left"
            />
            <Button
              as="input"
              type="text"
              id="filter"
              onChange={this.handleChangeFilter}
              value={this.state.filter}
            />
            <ContactsList
              contactsList={this.state.contacts}
              filter={this.state.filter}
              handleRemoveContact={this.handleRemoveContact}
            />
          </Section>
        </PhonebookCard>
      </>
    );
  }
}

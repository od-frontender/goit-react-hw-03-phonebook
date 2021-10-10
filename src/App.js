import React from "react";
import Form from "./components/Form";
import ContactList from "components/ContactList";
import Filter from "components/Filter";
import Container from "components/Container";

class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };

  formSubmitHandler = (data) => {
    this.setState((prevState) => {
      if (
        prevState.contacts.some((contact) => contact.name.includes(data.name))
      ) {
        return alert(`${data.name} is already in contacts!`);
      }
      return { contacts: [...prevState.contacts, data] };
    });
  };
  deleteContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));
  };
  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value.toLocaleLowerCase() });
  };
  onFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(filter)
    );
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {this.state.contacts.length !== 0 && (
          <Filter
            filter={this.state.filter}
            onChangeFilter={this.changeFilter}
          />
        )}
        {this.state.filter === "" ? (
          <ContactList
            contacts={this.state.contacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <ContactList
            contacts={this.onFilter()}
            deleteContact={this.deleteContact}
          />
        )}
      </Container>
    );
  }
}

export default App;

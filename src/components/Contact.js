import React, { Component } from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: "",
      contactData: [
        {
          name: "DK",
          phone: "714-600-4308"
        },
        {
          name: "Danial",
          phone: "562-404-7707"
        },
        {
          name: "Steve",
          phone: "714-433-2323"
        },
        {
          name: "Jim",
          phone: "949-254-9091"
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ keyword: e.target.value });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });
    console.log(key, "is seleted");
  }

  render() {
    const mapToComponents = data => {
      data.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      data = data.filter(contact => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
      });
      return data.map((contact, i) => {
        return (
          <ContactInfo
            contact={contact}
            key={i}
            onClick={() => {
              this.handleClick(i);
            }}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey !== -1}
          contact={this.state.contactData[this.state.selectedKey]}
        />
      </div>
    );
  }
}

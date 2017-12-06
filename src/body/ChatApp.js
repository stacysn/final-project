import React, { Component } from 'react';
import { SocketProvider, socketConnect } from 'socket.io-react';
import UsersList from './UsersList';
import Message from './Message';
import MessageForm from './MessageForm';
import MessageList from './MessageList'
import io from 'socket.io-client';
const socket = io.connect(process.env.SOCKET_URL);

class ChatApp extends Component{
  constructor(props){
    super(props);
      this.state = {
        users: [],
        messages: [],
        text: ''
      }
  }

  componentDidMount = () => {
      socket.on('init', this._initialize);
      socket.on('send:message', this._messageRecieve);
      socket.on('user:join', this._userJoined);
      socket.on('user:left', this._userLeft);
      socket.on('change:name', this._userChangedName);
  }

  _initialize = (data) => {
      var {users, name} = data;
      this.setState({users, user: name});
  }

  _messageRecieve = (message) => {
      var {messages} = this.state;
      messages.push(message);
      this.setState({messages});
  }

  _userJoined = (data) => {
      var {users, messages} = this.state;
      var {name} = data;
      users.push(name);
      messages.push({
          user: 'APPLICATION BOT',
          text : name +' Joined'
      });
      this.setState({users, messages});
  }

  _userLeft = (data) => {
      var {users, messages} = this.state;
      var {name} = data;
      var index = users.indexOf(name);
      users.splice(index, 1);
      messages.push({
          user: 'APPLICATION BOT',
          text : name +' Left'
      });
      this.setState({users, messages});
  }

  _userChangedName = (data) => {
      var {oldName, newName} = data;
      var {users, messages} = this.state;
      var index = users.indexOf(oldName);
      users.splice(index, 1, newName);
      messages.push({
          user: 'APPLICATION BOT',
          text : 'Change Name : ' + oldName + ' ==> '+ newName
      });
      this.setState({users, messages});
  }

  handleMessageSubmit = (message) => {
      var {messages} = this.state;
      messages.push(message);
      this.setState({messages});
      socket.emit('send:message', message);
  }

  render() {
      return (
          <div>
              <UsersList
                  users={this.state.users}
              />
              <MessageList
                  messages={this.state.messages}
                  userName={this.props.userName}

              />
              <MessageForm
                  onMessageSubmit={this.handleMessageSubmit}
                  userName={this.props.userName}
              />
          </div>
      );
  }
};

export default ChatApp;

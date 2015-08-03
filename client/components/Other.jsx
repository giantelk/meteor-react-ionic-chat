Other = React.createClass({
  render() {
    return <h1>other</h1>
  }
});

ConversationSubheader = React.createClass({
  render() {
    return (
      <div className="bar bar-subheader">
        <button className="button button-clear button-positive">Edit</button>
        <h2 className="title"></h2>
        <button className="button button-icon icon ion-compose" onClick={this.props.ionModal.bind(null, "Find friends", <NewConversationModal />)}></button>
      </div>
    )
  }
})

NewConversationModal = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handle = Meteor.subscribe("usernames");
    return {
      usernamesLoading: !handle.ready(),
      usernames: Meteor.users.find().fetch(),
      user: Meteor.user(),
      userLoading: Meteor.loggingIn()
    }
  },
  render() {
    console.log(this.data.usernamesLoading);
    console.log(this.data.usernames);
    if (this.data.usernamesLoading) {
      return <AppLoading />
    }
    return (
      <div className="list">
        this.data.usernames.map((user) => {
          <div className="item item-avatar">
            <img src={user.profile.image} />
            <h2>{user.username}</h2>
          </div>
        })
      </div>
    )
  }
})
